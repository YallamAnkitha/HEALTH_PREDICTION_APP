import requests

AI_API_URL = "https://api.agify.io"

def get_health_prediction(full_name, glucose, haemoglobin, cholesterol):
    first_name = full_name.strip().split()[0] if full_name else "Patient"
    external_note = ""
    try:
        response = requests.get(AI_API_URL, params={"name": first_name}, timeout=5)
        response.raise_for_status()
        data = response.json()
        age_estimate = data.get("age")
        external_note = f"External API age estimate: {age_estimate}. " if age_estimate else "External API responded. "
    except Exception:
        external_note = "External API unavailable; using local risk assessment. "

    risk_level = "Low risk of health condition."
    if glucose >= 140 or cholesterol >= 240 or haemoglobin < 12 or haemoglobin > 18:
        risk_level = "High risk of possible cardiovascular or metabolic condition."
    elif glucose >= 110 or cholesterol >= 200 or haemoglobin < 13 or haemoglobin > 17:
        risk_level = "Moderate risk; follow up with a doctor recommended."

    return f"{external_note}{risk_level}"