# PrivShield
# 🛡️ PrivShield

PrivShield is a cybersecurity-focused Privacy Risk Assessment Framework designed to help users identify and mitigate privacy risks before uploading documents to Generative AI platforms such as ChatGPT, Gemini, Claude, and Microsoft Copilot.

## Overview

Many users unknowingly upload sensitive information such as Aadhaar numbers, PAN numbers, email addresses, phone numbers, financial information, and confidential documents to AI systems. Such disclosures may result in privacy violations, identity theft, social engineering attacks, financial fraud, and unauthorized exposure of personal data.

PrivShield analyzes documents before upload, detects sensitive information, evaluates privacy risks, and generates a sanitized version of the content through automatic redaction.

## Features

* Sensitive Information Detection

  * Email Addresses
  * Phone Numbers
  * PAN Numbers
  * Aadhaar Numbers
  * Personal Information (PII)

* Privacy Risk Assessment

  * Risk Score Generation
  * Risk Classification (Low, Medium, High, Critical)

* Automatic Redaction

  * Masks sensitive information before AI submission
  * Generates a sanitized document version

* PDF Support

  * Upload and analyze PDF documents
  * Extract text and perform privacy analysis

* Security Recommendations

  * Provides warnings about potential privacy and cybersecurity risks
  * Suggests safe document sharing practices

## Architecture

User Uploads Document
↓
Text Extraction Layer
↓
PII Detection Engine
↓
Privacy Risk Assessment
↓
Risk Scoring Module
↓
Auto Redaction Module
↓
Sanitized Output Generation
↓
Safe AI Upload Recommendation

## Technologies Used

* Python
* Streamlit
* Microsoft Presidio
* Regex-Based Pattern Matching
* PDFPlumber

## Research Motivation

This project addresses a growing cybersecurity concern: the exposure of personal and sensitive information through Generative AI systems. Existing research focuses primarily on privacy attacks after data enters AI systems, whereas PrivShield introduces a pre-upload privacy assessment framework to help users identify and mitigate risks before disclosure occurs.

## Future Enhancements

* Bank Account Detection
* UPI ID Detection
* API Key Detection
* Source Code Secret Detection
* Downloadable Sanitized PDF Reports
* AI-Based Document Classification
* Enterprise Privacy Compliance Module

## Disclaimer

PrivShield is an educational and research-oriented prototype developed for cybersecurity and privacy risk assessment purposes. It should not be considered a replacement for enterprise-grade data loss prevention (DLP) solutions.

