from presidio_analyzer import AnalyzerEngine
import re

analyzer = AnalyzerEngine()

def detect_pii(text):

    presidio_results = analyzer.analyze(
        text=text,
        language="en"
    )

    allowed_entities = [
        "PERSON",
        "EMAIL_ADDRESS",
        "PHONE_NUMBER",
        "LOCATION"
    ]

    filtered_results = []

    for r in presidio_results:

        if (
            r.score > 0.6 and
            r.entity_type in allowed_entities
        ):
            filtered_results.append(r)

    custom_entities = []

    # PAN
    pan_pattern = r"[A-Z]{5}[0-9]{4}[A-Z]"

    if re.search(pan_pattern, text):
        custom_entities.append(
            ("PAN_NUMBER", 1.0)
        )

    # Aadhaar
    aadhaar_pattern = r"\b\d{4}\s?\d{4}\s?\d{4}\b"

    if re.search(aadhaar_pattern, text):
        custom_entities.append(
            ("AADHAAR_NUMBER", 1.0)
        )

    # UPI
    upi_pattern = r"[a-zA-Z0-9.\-_]+@[a-zA-Z]+"

    if re.search(upi_pattern, text):
        custom_entities.append(
            ("UPI_ID", 1.0)
        )

    return filtered_results, custom_entities