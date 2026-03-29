"""SymPy-based mathematical answer verification service.

Compares student answers against correct answers using symbolic mathematics,
supporting numeric values, algebraic expressions, equations, and sets.
"""

from __future__ import annotations

import logging
import random
import re
import signal
from typing import Optional

from pydantic import BaseModel
from sympy import (
    Eq,
    Float,
    FiniteSet,
    N,
    Rational,
    S,
    Symbol,
    simplify,
    solve,
    symbols,
    sympify,
)
from sympy.core.sympify import SympifyError

logger = logging.getLogger(__name__)

VERIFICATION_TIMEOUT = 5  # seconds


# ---------------------------------------------------------------------------
# Pydantic result model
# ---------------------------------------------------------------------------

class VerificationResult(BaseModel):
    equivalent: bool
    student_simplified: str
    correct_simplified: str
    error: Optional[str] = None
    method: str


# ---------------------------------------------------------------------------
# Timeout helper (UNIX only — uses signal.SIGALRM)
# ---------------------------------------------------------------------------

class VerificationTimeout(Exception):
    pass


def _timeout_handler(signum, frame):
    raise VerificationTimeout("Verification timed out")


# ---------------------------------------------------------------------------
# Parsing helpers
# ---------------------------------------------------------------------------

def _parse_latex(raw: str):
    """Attempt to parse a LaTeX string into a SymPy expression.

    Falls back to sympify on plain text if latex2sympy2 fails.
    """
    try:
        from latex2sympy2 import latex2sympy

        return latex2sympy(raw)
    except Exception:
        pass

    # Strip common LaTeX wrappers that sympify cannot handle directly
    cleaned = raw.replace("\\", "")
    cleaned = re.sub(r"\^{([^}]+)}", r"**(\1)", cleaned)
    cleaned = re.sub(r"\^(\d)", r"**\1", cleaned)
    cleaned = re.sub(r"\{|\}", "", cleaned)
    cleaned = cleaned.replace(" ", "")

    return sympify(cleaned)


def _try_parse(raw: str):
    """Parse a string as a SymPy object, trying multiple strategies."""
    raw = raw.strip()
    if not raw:
        raise ValueError("Empty input")

    # 1. Plain number?
    try:
        return sympify(raw)
    except (SympifyError, TypeError):
        pass

    # 2. LaTeX parse
    return _parse_latex(raw)


def _numerical_spot_check(expr_a, expr_b, n_points: int = 5) -> bool:
    """Evaluate both expressions at random points as a backup check."""
    free = expr_a.free_symbols | expr_b.free_symbols
    if not free:
        # Constant expressions — just compare numerically
        try:
            return abs(complex(N(expr_a)) - complex(N(expr_b))) < 1e-9
        except Exception:
            return False

    for _ in range(n_points):
        subs = {s: random.uniform(-10, 10) for s in free}
        try:
            va = complex(N(expr_a.subs(subs)))
            vb = complex(N(expr_b.subs(subs)))
            if abs(va - vb) > 1e-6:
                return False
        except Exception:
            # If evaluation fails at a point, skip it
            continue
    return True


# ---------------------------------------------------------------------------
# Verification by answer type
# ---------------------------------------------------------------------------

def _verify_numeric(student: str, correct: str) -> VerificationResult:
    """Compare two numeric values, with tolerance for floats."""
    try:
        s_val = sympify(student)
        c_val = sympify(correct)
    except (SympifyError, TypeError) as exc:
        return VerificationResult(
            equivalent=False,
            student_simplified=student,
            correct_simplified=correct,
            error=f"Could not parse as number: {exc}",
            method="numeric",
        )

    try:
        s_float = float(s_val)
        c_float = float(c_val)
    except (TypeError, ValueError) as exc:
        return VerificationResult(
            equivalent=False,
            student_simplified=str(s_val),
            correct_simplified=str(c_val),
            error=f"Could not evaluate as float: {exc}",
            method="numeric",
        )

    # Tolerance: exact for integers, relative for floats
    if c_float == 0:
        eq = abs(s_float) < 1e-9
    else:
        eq = abs(s_float - c_float) / max(abs(c_float), 1e-15) < 1e-9

    return VerificationResult(
        equivalent=eq,
        student_simplified=str(s_float),
        correct_simplified=str(c_float),
        method="numeric",
    )


def _verify_expression(student: str, correct: str) -> VerificationResult:
    """Compare two algebraic expressions by simplifying their difference."""
    s_expr = _try_parse(student)
    c_expr = _try_parse(correct)

    diff = simplify(s_expr - c_expr)
    eq = diff == S.Zero

    # Backup: numerical spot-check
    if not eq:
        eq = _numerical_spot_check(s_expr, c_expr)

    return VerificationResult(
        equivalent=eq,
        student_simplified=str(simplify(s_expr)),
        correct_simplified=str(simplify(c_expr)),
        method="expression_simplify" if diff == S.Zero else "expression_numerical",
    )


def _verify_equation(student: str, correct: str) -> VerificationResult:
    """Compare equations by solving both and comparing solution sets."""
    # Parse equations — expect forms like "x = 5" or "3x + 7 = 22"
    def _parse_equation(raw: str):
        raw = raw.strip()
        # Try latex2sympy first
        try:
            from latex2sympy2 import latex2sympy

            parsed = latex2sympy(raw)
            if isinstance(parsed, Eq):
                return parsed
        except Exception:
            pass

        # Manual split on '='
        if "=" in raw:
            parts = raw.split("=", 1)
            lhs = _try_parse(parts[0])
            rhs = _try_parse(parts[1])
            return Eq(lhs, rhs)

        # If no '=', assume expression equal to zero
        return Eq(_try_parse(raw), 0)

    s_eq = _parse_equation(student)
    c_eq = _parse_equation(correct)

    s_solutions = solve(s_eq, dict=True)
    c_solutions = solve(c_eq, dict=True)

    # Normalise solution dicts to frozensets of tuples for comparison
    def _norm(sol_list):
        result = set()
        for sol_dict in sol_list:
            result.add(frozenset((str(k), simplify(v)) for k, v in sol_dict.items()))
        return result

    s_set = _norm(s_solutions)
    c_set = _norm(c_solutions)

    eq = s_set == c_set

    return VerificationResult(
        equivalent=eq,
        student_simplified=str(s_solutions),
        correct_simplified=str(c_solutions),
        method="equation_solve",
    )


def _verify_set(student: str, correct: str) -> VerificationResult:
    """Compare two sets (unordered)."""
    def _parse_set(raw: str):
        raw = raw.strip().strip("{}")
        elements = [_try_parse(e.strip()) for e in raw.split(",") if e.strip()]
        return FiniteSet(*elements)

    s_set = _parse_set(student)
    c_set = _parse_set(correct)

    eq = s_set == c_set

    return VerificationResult(
        equivalent=eq,
        student_simplified=str(s_set),
        correct_simplified=str(c_set),
        method="set_compare",
    )


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

_VERIFIERS = {
    "numeric": _verify_numeric,
    "expression": _verify_expression,
    "equation": _verify_equation,
    "set": _verify_set,
}


def verify_equivalence(
    student_answer: str,
    correct_answer: str,
    answer_type: str,
) -> VerificationResult:
    """Verify whether a student answer is mathematically equivalent to the
    correct answer.

    Parameters
    ----------
    student_answer : str
        The student's answer (plain text or LaTeX).
    correct_answer : str
        The expected correct answer (plain text or LaTeX).
    answer_type : str
        One of "numeric", "expression", "equation", "set".

    Returns
    -------
    VerificationResult
    """
    if not student_answer or not student_answer.strip():
        return VerificationResult(
            equivalent=False,
            student_simplified="",
            correct_simplified=correct_answer,
            error="Student answer is empty",
            method="none",
        )

    if not correct_answer or not correct_answer.strip():
        return VerificationResult(
            equivalent=False,
            student_simplified=student_answer,
            correct_simplified="",
            error="Correct answer is empty",
            method="none",
        )

    verifier = _VERIFIERS.get(answer_type)
    if verifier is None:
        return VerificationResult(
            equivalent=False,
            student_simplified=student_answer,
            correct_simplified=correct_answer,
            error=f"Unknown answer_type: {answer_type}",
            method="none",
        )

    # Timeout protection (POSIX only)
    old_handler = signal.signal(signal.SIGALRM, _timeout_handler)
    signal.alarm(VERIFICATION_TIMEOUT)
    try:
        result = verifier(student_answer, correct_answer)
    except VerificationTimeout:
        result = VerificationResult(
            equivalent=False,
            student_simplified=student_answer,
            correct_simplified=correct_answer,
            error="Verification timed out after 5 seconds",
            method="timeout",
        )
    except Exception as exc:
        logger.exception("Verification failed")
        # Fall back to plain string comparison
        eq = student_answer.strip() == correct_answer.strip()
        result = VerificationResult(
            equivalent=eq,
            student_simplified=student_answer.strip(),
            correct_simplified=correct_answer.strip(),
            error=f"Symbolic verification failed ({exc}); fell back to string comparison",
            method="string_fallback",
        )
    finally:
        signal.alarm(0)
        signal.signal(signal.SIGALRM, old_handler)

    return result
