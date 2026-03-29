"""Comprehensive tests for the SymPy verification service."""

import pytest

from app.services.sympy_verifier import verify_equivalence, VerificationResult


# ── Numeric tests ────────────────────────────────────────────────────────

class TestNumeric:
    def test_integers_equal(self):
        r = verify_equivalence("12", "12", "numeric")
        assert r.equivalent is True

    def test_integers_not_equal(self):
        r = verify_equivalence("13", "12", "numeric")
        assert r.equivalent is False

    def test_float_approx_equal(self):
        r = verify_equivalence("3.14", "3.14", "numeric")
        assert r.equivalent is True

    def test_float_close(self):
        r = verify_equivalence("3.1400000001", "3.14", "numeric")
        assert r.equivalent is True

    def test_expression_evaluated(self):
        # 2**2 * 3 == 12
        r = verify_equivalence("2**2 * 3", "12", "numeric")
        assert r.equivalent is True

    def test_fraction_equal(self):
        r = verify_equivalence("1/3", "0.3333333333333333", "numeric")
        assert r.equivalent is True

    def test_negative(self):
        r = verify_equivalence("-5", "-5", "numeric")
        assert r.equivalent is True

    def test_zero(self):
        r = verify_equivalence("0", "0", "numeric")
        assert r.equivalent is True


# ── Expression tests ─────────────────────────────────────────────────────

class TestExpression:
    def test_expand_square(self):
        # (x+1)**2  ==  x**2 + 2*x + 1
        r = verify_equivalence("(x+1)**2", "x**2 + 2*x + 1", "expression")
        assert r.equivalent is True

    def test_distribute(self):
        # 2*(x+3)  ==  2*x + 6
        r = verify_equivalence("2*(x+3)", "2*x + 6", "expression")
        assert r.equivalent is True

    def test_not_equivalent(self):
        r = verify_equivalence("x + 1", "x + 2", "expression")
        assert r.equivalent is False

    def test_commutative(self):
        r = verify_equivalence("a + b", "b + a", "expression")
        assert r.equivalent is True

    def test_simplify_fraction(self):
        r = verify_equivalence("(x**2 - 1)/(x - 1)", "x + 1", "expression")
        assert r.equivalent is True

    def test_trig_identity(self):
        # sin(x)**2 + cos(x)**2 == 1  (difference should be 0)
        r = verify_equivalence("sin(x)**2 + cos(x)**2", "1", "expression")
        assert r.equivalent is True


# ── Equation tests ───────────────────────────────────────────────────────

class TestEquation:
    def test_linear_equation(self):
        # Solving 3x + 7 = 22 gives x = 5
        r = verify_equivalence("x = 5", "3*x + 7 = 22", "equation")
        assert r.equivalent is True

    def test_different_form_same_solution(self):
        # 2x = 10 and x = 5 have the same solution
        r = verify_equivalence("2*x = 10", "x = 5", "equation")
        assert r.equivalent is True

    def test_wrong_solution(self):
        r = verify_equivalence("x = 3", "x = 5", "equation")
        assert r.equivalent is False


# ── Set tests ────────────────────────────────────────────────────────────

class TestSet:
    def test_same_set(self):
        r = verify_equivalence("{1, 2, 3}", "{1, 2, 3}", "set")
        assert r.equivalent is True

    def test_different_order(self):
        r = verify_equivalence("{3, 1, 2}", "{1, 2, 3}", "set")
        assert r.equivalent is True

    def test_different_set(self):
        r = verify_equivalence("{1, 2}", "{1, 2, 3}", "set")
        assert r.equivalent is False

    def test_singleton(self):
        r = verify_equivalence("{5}", "{5}", "set")
        assert r.equivalent is True


# ── Edge cases ───────────────────────────────────────────────────────────

class TestEdgeCases:
    def test_empty_student_answer(self):
        r = verify_equivalence("", "42", "numeric")
        assert r.equivalent is False
        assert r.error is not None

    def test_empty_correct_answer(self):
        r = verify_equivalence("42", "", "numeric")
        assert r.equivalent is False
        assert r.error is not None

    def test_whitespace_only(self):
        r = verify_equivalence("   ", "42", "numeric")
        assert r.equivalent is False

    def test_malformed_latex(self):
        r = verify_equivalence("\\frac{}{}", "1", "expression")
        # Should not crash — returns a result (possibly via string fallback)
        assert isinstance(r, VerificationResult)

    def test_unknown_answer_type(self):
        r = verify_equivalence("1", "1", "matrix")
        assert r.equivalent is False
        assert "Unknown answer_type" in (r.error or "")

    def test_division_by_zero_expression(self):
        r = verify_equivalence("1/0", "1", "numeric")
        # Should not crash
        assert isinstance(r, VerificationResult)
