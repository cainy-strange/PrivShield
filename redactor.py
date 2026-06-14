import re

def redact_text(text):

    # PAN
    text = re.sub(
        r"[A-Z]{5}[0-9]{4}[A-Z]",
        "[REDACTED_PAN]",
        text
    )

    # Aadhaar
    text = re.sub(
        r"\b\d{4}\s?\d{4}\s?\d{4}\b",
        "[REDACTED_AADHAAR]",
        text
    )

    # Email
    text = re.sub(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        "[REDACTED_EMAIL]",
        text
    )

    # Phone
    text = re.sub(
        r"\b[6-9]\d{9}\b",
        "[REDACTED_PHONE]",
        text
    )

    return text