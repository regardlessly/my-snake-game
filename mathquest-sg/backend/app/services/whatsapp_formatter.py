"""Format AI responses for WhatsApp delivery.

Handles markdown-to-WhatsApp conversion, LaTeX unicode substitutions,
message chunking, and MCQ formatting.
"""

from __future__ import annotations

import re


# ── Unicode math substitution map ──────────────────────────────────────

_LATEX_SUBS: dict[str, str] = {
    r"\times": "\u00d7",
    r"\div": "\u00f7",
    r"\pm": "\u00b1",
    r"\leq": "\u2264",
    r"\geq": "\u2265",
    r"\neq": "\u2260",
    r"\approx": "\u2248",
    r"\infty": "\u221e",
    r"\sqrt": "\u221a",
    r"\pi": "\u03c0",
    r"\theta": "\u03b8",
    r"\alpha": "\u03b1",
    r"\beta": "\u03b2",
    r"\sum": "\u2211",
    r"\prod": "\u220f",
    r"\in": "\u2208",
    r"\notin": "\u2209",
    r"\rightarrow": "\u2192",
    r"\leftarrow": "\u2190",
    r"\Rightarrow": "\u21d2",
    r"\frac": "/",
}

_SUPERSCRIPT_MAP = str.maketrans("0123456789", "\u2070\u00b9\u00b2\u00b3\u2074\u2075\u2076\u2077\u2078\u2079")
_SUBSCRIPT_MAP = str.maketrans("0123456789", "\u2080\u2081\u2082\u2083\u2084\u2085\u2086\u2087\u2088\u2089")


def _latex_to_unicode(text: str) -> str:
    """Best-effort LaTeX to unicode conversion."""
    # Handle superscripts like ^{2} or ^2
    text = re.sub(r"\^{?(\d+)}?", lambda m: m.group(1).translate(_SUPERSCRIPT_MAP), text)
    # Handle subscripts like _{2} or _2
    text = re.sub(r"_{?(\d+)}?", lambda m: m.group(1).translate(_SUBSCRIPT_MAP), text)
    # Replace known LaTeX commands
    for latex, uni in _LATEX_SUBS.items():
        text = text.replace(latex, uni)
    # Strip remaining backslash commands
    text = re.sub(r"\\[a-zA-Z]+", "", text)
    # Strip leftover braces
    text = text.replace("{", "").replace("}", "")
    return text


def wa_format(text: str) -> str:
    """Convert markdown / HTML to WhatsApp-friendly formatting.

    - **bold** -> *bold* (WhatsApp bold)
    - $$...$$ and $...$ -> unicode math
    - Strip HTML tags
    - Collapse excessive newlines
    """
    # Convert **bold** to *bold*
    text = re.sub(r"\*\*(.+?)\*\*", r"*\1*", text)
    # Convert ### heading to *heading*
    text = re.sub(r"^#{1,4}\s+(.+)$", r"*\1*", text, flags=re.MULTILINE)

    # Convert LaTeX blocks
    text = re.sub(r"\$\$(.*?)\$\$", lambda m: _latex_to_unicode(m.group(1)), text, flags=re.DOTALL)
    text = re.sub(r"\$(.+?)\$", lambda m: _latex_to_unicode(m.group(1)), text)

    # Strip HTML tags
    text = re.sub(r"<[^>]+>", "", text)

    # Collapse 3+ newlines to 2
    text = re.sub(r"\n{3,}", "\n\n", text)

    return text.strip()


def split_message(text: str, max_len: int = 4000) -> list[str]:
    """Split a long message at newline boundaries to fit WhatsApp limits."""
    if len(text) <= max_len:
        return [text]

    chunks: list[str] = []
    current = ""

    for line in text.split("\n"):
        # If a single line exceeds max_len, hard-split it
        if len(line) > max_len:
            if current:
                chunks.append(current.rstrip())
                current = ""
            for i in range(0, len(line), max_len):
                chunks.append(line[i : i + max_len])
            continue

        if len(current) + len(line) + 1 > max_len:
            chunks.append(current.rstrip())
            current = line + "\n"
        else:
            current += line + "\n"

    if current.strip():
        chunks.append(current.rstrip())

    return chunks


def format_mcq(question: dict) -> str:
    """Format a question dict for WhatsApp display.

    Expects question to have keys: topicName, q, opts (list of 4), and
    optionally difficulty.
    """
    topic_name = question.get("topicName", "Practice")
    q_text = question.get("q", "")
    opts = question.get("opts", [])

    labels = ["A", "B", "C", "D"]
    options_text = "\n".join(
        f"{labels[i]}) {opt}" for i, opt in enumerate(opts[:4])
    )

    return (
        f"*Practice: {topic_name}*\n\n"
        f"{q_text}\n\n"
        f"{options_text}\n\n"
        f"_Reply with A, B, C, or D_"
    )
