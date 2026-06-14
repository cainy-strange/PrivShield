weights = {
    "EMAIL_ADDRESS": 5,
    "PHONE_NUMBER": 10,
    "PERSON": 5,
    "LOCATION": 5,
    "PAN_NUMBER": 25,
    "AADHAAR_NUMBER": 30
}

def calculate_score(results):

    score = 0

    for item in results:
        score += weights.get(item.entity_type, 0)

    return score


def calculate_custom_score(custom_entities):

    score = 0

    for entity, confidence in custom_entities:
        score += weights.get(entity, 0)

    return score


def get_risk_level(score):

    if score < 20:
        return "LOW"

    elif score < 40:
        return "MEDIUM"

    elif score < 70:
        return "HIGH"

    else:
        return "CRITICAL"