import streamlit as st
import pdfplumber

from detector import detect_pii
from scorer import calculate_score
from scorer import calculate_custom_score
from scorer import get_risk_level
from redactor import redact_text

st.set_page_config(
    page_title="PrivShield",
    page_icon="🛡️",
    layout="wide"
)

st.title("🛡️ PrivShield")

st.subheader(
    "Privacy Risk Assessment Framework for Generative AI Systems"
)

uploaded_file = st.file_uploader(
    "Upload PDF Document",
    type=["pdf"]
)

text = ""

# PDF Upload
if uploaded_file:

    with pdfplumber.open(uploaded_file) as pdf:

        for page in pdf.pages:

            page_text = page.extract_text()

            if page_text:
                text += page_text + "\n"

# Manual Input
manual_text = st.text_area(
    "Or Paste Document Text",
    height=200
)

if manual_text:
    text = manual_text

# Analysis Button
if st.button("Analyze"):

    if not text.strip():

        st.error(
            "Please upload a PDF or enter text."
        )

    else:

        # Detection
        results, custom_entities = detect_pii(text)

        # Risk Score
        score = (
            calculate_score(results)
            +
            calculate_custom_score(custom_entities)
        )

        risk = get_risk_level(score)

        # Risk Assessment
        st.subheader("📊 Risk Assessment")

        col1, col2 = st.columns(2)

        with col1:
            st.metric(
                "Risk Score",
                score
            )

        with col2:
            st.metric(
                "Risk Level",
                risk
            )

        # Presidio Detections
        st.subheader(
            "🔍 Detected Sensitive Data"
        )

        if len(results) == 0:

            st.info(
                "No Presidio entities detected."
            )

        else:

            for r in results:

                st.write(
                    f"• {r.entity_type} "
                    f"(Confidence: {round(r.score,2)})"
                )

        # Custom Detections
        st.subheader(
            "🔐 Custom Privacy Detections"
        )

        if len(custom_entities) == 0:

            st.info(
                "No PAN, Aadhaar or UPI detected."
            )

        else:

            for entity, confidence in custom_entities:

                st.write(
                    f"• {entity} "
                    f"(Confidence: {confidence})"
                )

        # Risk Explanation
        st.subheader(
            "⚠️ Privacy Risk Explanation"
        )

        detected_entities = []

        for r in results:
            detected_entities.append(
                r.entity_type
            )

        for entity, confidence in custom_entities:
            detected_entities.append(
                entity
            )

        if "AADHAAR_NUMBER" in detected_entities:

            st.warning(
                "Aadhaar exposure may lead to identity theft and unauthorized access to personal services."
            )

        if "PAN_NUMBER" in detected_entities:

            st.warning(
                "PAN exposure may facilitate financial fraud, tax-related misuse, and identity theft."
            )

        if "UPI_ID" in detected_entities:

            st.warning(
                "UPI exposure may increase phishing and payment fraud risks."
            )

        if "EMAIL_ADDRESS" in detected_entities:

            st.warning(
                "Email exposure can enable phishing attacks and account compromise."
            )

        if "PHONE_NUMBER" in detected_entities:

            st.warning(
                "Phone exposure can enable social engineering and SIM-swap attacks."
            )

        # Sanitized Output
        st.subheader(
            "🧹 Sanitized Version"
        )

        sanitized_text = redact_text(text)

        st.text_area(
            "Safe Text For AI Upload",
            sanitized_text,
            height=300
        )
        st.download_button(
            label="📥 Download Sanitized Document",
            data=sanitized_text,
            file_name="sanitized_document.txt",
            mime="text/plain"
        )

        # Recommendations
        st.subheader(
            "🛡️ Recommendation"
        )

        if risk == "LOW":

            st.success(
                "Document appears safe for AI upload."
            )

        elif risk == "MEDIUM":

            st.warning(
                "Review personal information before uploading."
            )

        elif risk == "HIGH":

            st.warning(
                "Sensitive information detected. Consider redacting before uploading."
            )

        else:

            st.error(
                "Critical privacy risk detected. Remove sensitive identifiers before uploading to ChatGPT, Gemini, Claude, Copilot, or other Generative AI systems."
            )
        st.subheader("Potential Privacy Harms")

        if "AADHAAR_NUMBER" in detected_entities:
            st.write("• Identity theft risk")

        if "PAN_NUMBER" in detected_entities:
            st.write("• Financial fraud risk")

        if "EMAIL_ADDRESS" in detected_entities:
            st.write("• Phishing attack risk")

        if "PHONE_NUMBER" in detected_entities:
            st.write("• Social engineering risk")
             
        st.subheader("Analysis Summary")

        st.write(f"Total Sensitive Items Found: {len(results)+len(custom_entities)}")