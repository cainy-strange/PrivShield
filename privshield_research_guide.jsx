
import { useState } from "react";

const sections = [
  { id: "gap", label: "Research Gap" },
  { id: "contribution", label: "Novel Contribution" },
  { id: "architecture", label: "System Architecture" },
  { id: "methodology", label: "Methodology" },
  { id: "experiments", label: "Experiments & Datasets" },
  { id: "publish", label: "Path to Publication" },
  { id: "comparison", label: "Topic Comparison" },
  { id: "weaknesses", label: "Weaknesses" },
];

const gapData = [
  {
    color: "blue",
    label: "Gap A",
    title: "No pre-upload risk quantification",
    body: "All existing papers (Chen 2025, Miranda 2025, Yang 2026) address training-time attacks. Zero tools exist to assess privacy risk before a document leaves the user's device at inference time.",
    cite: "Chen et al. (2025); Miranda et al. (2025)"
  },
  {
    color: "amber",
    label: "Gap B",
    title: "No document-type threat profiling",
    body: "A medical record, resume, legal contract, and source code with API keys each carry categorically different threat surfaces. No taxonomy maps document type → specific downstream cybersecurity attack vector.",
    cite: "Gupta et al. (2023, ChatGPT→ThreatGPT)"
  },
  {
    color: "coral",
    label: "Gap C",
    title: "Inference-time cross-session leakage",
    body: "Modern AI memory features (ChatGPT Memory, Gemini Workspace) can retain uploaded context. Whether PII from a document in session A can be elicited in session B is entirely unstudied empirically.",
    cite: "Gap not addressed in any of your 5 references"
  },
  {
    color: "purple",
    label: "Gap D",
    title: "User decision-making unaddressed",
    body: "The ThreatGPT paper notes social engineering risk but no solution gives users real-time, actionable intelligence at the point of upload. Users remain the undefended last line of defence.",
    cite: "Yang (2026, JCEIM); GEN-SECHEALTH (Mehmood 2026)"
  },
];

const archComponents = [
  {
    id: "input",
    title: "Document ingestion",
    subtitle: "PDF, DOCX, image, code",
    icon: "ti-file-upload",
    color: "gray",
    desc: "Accepts any document type the user is about to upload. Runs entirely client-side — the document never leaves the browser during analysis."
  },
  {
    id: "classifier",
    title: "Document type classifier",
    subtitle: "Medical / financial / legal / code / personal",
    icon: "ti-tags",
    color: "blue",
    desc: "Fine-tuned DistilBERT classifier trained on labelled document corpora. Output is a document category that gates which threat models apply downstream."
  },
  {
    id: "ner",
    title: "PII entity recogniser",
    subtitle: "NER + regex + rule engine",
    icon: "ti-id",
    color: "teal",
    desc: "Microsoft Presidio + spaCy NER detects names, Aadhaar/PAN, SSN, bank accounts, medical IDs, IP addresses, API keys, email, phone. Regex layer catches structured secrets (JWT tokens, AWS keys)."
  },
  {
    id: "threat",
    title: "Threat mapper",
    subtitle: "PII × doc type → attack vectors",
    icon: "ti-alert-triangle",
    color: "amber",
    desc: "Maps detected entities + document category to the MITRE ATT&CK and LINDDUN threat frameworks. E.g. Resume + Full name + Employer = spear phishing vector; Code + API key = credential theft."
  },
  {
    id: "scorer",
    title: "Risk scoring engine",
    subtitle: "Weighted composite score 0–100",
    icon: "ti-chart-pie",
    color: "coral",
    desc: "Computes RiskScore = Σ(entity_weight × sensitivity_multiplier × context_factor). Weights are calibrated against real breach datasets (HIBP, HHS Breach Portal). Outputs per-category subscores."
  },
  {
    id: "redact",
    title: "Redaction / pseudonymisation",
    subtitle: "Mask, replace, or anonymise",
    icon: "ti-eye-off",
    color: "purple",
    desc: "Offers three modes: (1) Hard redact — replace with [REDACTED], (2) Pseudonymise — replace with consistent fake values preserving document utility, (3) Differential noise — add calibrated perturbation to numerical fields."
  },
  {
    id: "dashboard",
    title: "Privacy risk dashboard",
    subtitle: "User-facing risk report",
    icon: "ti-shield",
    color: "green",
    desc: "Visual breakdown of detected entities, risk score, threat vectors, and recommended action. Designed to be understood by a non-technical user in under 30 seconds."
  },
];

const methodPhases = [
  {
    phase: "Phase 1",
    title: "Threat modelling",
    duration: "Weeks 1–3",
    color: "blue",
    tasks: [
      "Build a STRIDE/LINDDUN threat model for inference-time document upload",
      "Classify document types by sensitivity tier (T1 medical, T2 financial, T3 legal, T4 personal, T5 code)",
      "Map each document type × entity type to a downstream attack vector from MITRE ATT&CK",
      "Output: Threat taxonomy table (publishable as Table 1 in your paper)"
    ]
  },
  {
    phase: "Phase 2",
    title: "Empirical attack study",
    duration: "Weeks 4–7",
    color: "amber",
    tasks: [
      "Upload synthetic documents (containing controlled PII) to ChatGPT, Gemini, Copilot",
      "Craft follow-up prompts attempting to extract PII from the context window",
      "Test cross-session leakage via the ChatGPT Memory feature",
      "Quantify: what percentage of uploaded PII can be elicited through prompt engineering?",
      "Output: Empirical extraction success rates (publishable as Table 2)"
    ]
  },
  {
    phase: "Phase 3",
    title: "PrivShield build",
    duration: "Weeks 8–14",
    color: "teal",
    tasks: [
      "Fine-tune DistilBERT document classifier on 5-class corpus",
      "Integrate Microsoft Presidio + custom regex for PII detection",
      "Implement threat mapper using LINDDUN threat trees",
      "Build weighted risk scoring function calibrated against breach datasets",
      "Implement three redaction modes",
      "Build browser extension / Python CLI interface"
    ]
  },
  {
    phase: "Phase 4",
    title: "Evaluation",
    duration: "Weeks 15–18",
    color: "coral",
    tasks: [
      "Precision/recall of PII detection on held-out test set",
      "Risk score calibration: do higher-scoring documents lead to more successful extraction attacks?",
      "Utility study: how much does redaction degrade LLM task performance?",
      "User study (optional but strengthens paper): do users make better upload decisions with PrivShield?",
      "Compare against baseline (no tool) and alternative (simple keyword filter)"
    ]
  },
];

const datasets = [
  { name: "i2b2 2014 De-identification Challenge", type: "Medical NER", use: "Train PII detector on clinical text", access: "MIT License via PhysioNet", color: "blue" },
  { name: "CoNLL-2003 NER", type: "General NER", use: "Baseline entity recognition", access: "Open access", color: "teal" },
  { name: "BigCode / The Stack", type: "Source code", use: "Detect secrets/API keys in code", access: "Open on HuggingFace", color: "purple" },
  { name: "HHS Breach Portal", type: "Real breach records", use: "Calibrate risk weights", access: "Public US Gov dataset", color: "coral" },
  { name: "MIMIC-III (synthetic subset)", type: "Medical records", use: "Test medical document classification", access: "PhysioNet (requires DUA)", color: "amber" },
  { name: "Enron Email Dataset", type: "Corporate email/docs", use: "Financial + PII extraction tests", access: "Open access", color: "green" },
  { name: "Synthetic PII Generator", type: "Controlled test set", use: "Ground-truth PII in documents", access: "Build with Faker library", color: "gray" },
];

const tools = [
  { name: "Microsoft Presidio", role: "PII detection engine", url: "github.com/microsoft/presidio" },
  { name: "spaCy + HuggingFace", role: "NER + document classification", url: "spacy.io / huggingface.co" },
  { name: "DistilBERT", role: "Document type classifier backbone", url: "HuggingFace Model Hub" },
  { name: "PyMuPDF + python-docx", role: "Document parsing (PDF/DOCX)", url: "PyPI" },
  { name: "LINDDUN Go", role: "Threat modelling framework", url: "linddun.org" },
  { name: "Faker (Python)", role: "Synthetic PII dataset generation", url: "PyPI" },
  { name: "Garak / LLM-Privacy-eval", role: "LLM privacy attack testing", url: "github.com/leondz/garak" },
];

const venues = [
  { name: "IEEE S&P (Oakland)", tier: "A*", notes: "Needs strong empirical evaluation and novel system", match: 65 },
  { name: "USENIX Security", tier: "A*", notes: "Strong on systems + user study combination", match: 70 },
  { name: "ACM CCS", tier: "A*", notes: "Excellent fit if threat taxonomy is rigorous", match: 72 },
  { name: "PETS Symposium", tier: "A", notes: "Best fit — privacy-focused, values user-centric work", match: 88 },
  { name: "IEEE Access", tier: "B", notes: "Open access, faster review, your ThreatGPT paper venue", match: 90 },
  { name: "ACM CCS Workshops (PPML)", tier: "Workshop", notes: "Good for getting early feedback on PrivShield", match: 95 },
];

const comparisons = [
  {
    topic: "Deepfake detection",
    maturity: "Saturated",
    novelty: "Low",
    practicality: "High",
    notes: "Thousands of papers. Marginal gains only. Hard to stand out unless you have a new dataset or architecture breakthrough.",
    verdict: "Avoid unless you have a truly novel angle"
  },
  {
    topic: "LLM jailbreak detection",
    maturity: "Active",
    novelty: "Medium",
    practicality: "High",
    notes: "Still active (2024–2026) but adversarial arms race makes evaluation unstable. Most papers are quickly outdated by new jailbreaks.",
    verdict: "Feasible but competitive"
  },
  {
    topic: "Your topic (PrivShield)",
    maturity: "Early",
    novelty: "High",
    practicality: "High",
    notes: "Directly actionable for end users. No competitive system exists. Inference-time focus is orthogonal to training-time literature.",
    verdict: "Recommended — clear gap, clear artefact"
  },
  {
    topic: "Federated learning privacy",
    maturity: "Maturing",
    novelty: "Medium-Low",
    practicality: "Medium",
    notes: "Core theory is established. Incremental gains. Requires significant ML infrastructure to evaluate properly.",
    verdict: "Challenging for a final-year project"
  },
  {
    topic: "LLM watermarking",
    maturity: "Emerging",
    novelty: "High",
    practicality: "Medium",
    notes: "Interesting open problem but requires deep ML theory. Evaluation is hard. Less practical than PrivShield for end users.",
    verdict: "Interesting future direction"
  },
];

const weaknesses = [
  {
    weakness: "Client-side processing limitations",
    severity: "High",
    mitigation: "For large documents (100+ pages), full NER is slow in-browser. Mitigate by running on a local Python server or WebAssembly-optimised model. Quantify in your evaluation section."
  },
  {
    weakness: "Context-dependent PII is hard to detect",
    severity: "High",
    mitigation: "\"My salary is 50,000\" is not PII without a name attached, but becomes so in context. Your NER will miss contextual PII. Acknowledge this as a limitation and propose co-reference resolution as future work."
  },
  {
    weakness: "Risk scoring is arbitrary without ground truth",
    severity: "High",
    mitigation: "This is the hardest technical challenge. Anchor your weights to breach statistics (HHS, HIPAA violation reports). Use expert elicitation (survey security researchers) to validate weight assignments. This becomes a research contribution itself."
  },
  {
    weakness: "Ethical issues in empirical attack study",
    severity: "Medium",
    mitigation: "You cannot upload real users' data to test extraction. Use only synthetic documents you generate yourself. Get IRB/ethics committee approval for any user study. The Garak library provides safe automated red-teaming."
  },
  {
    weakness: "Platform-specific — no API access for cross-session tests",
    severity: "Medium",
    mitigation: "ChatGPT Memory, Gemini Workspace are closed systems. You can only test empirically via the UI, which limits systematic evaluation. Be transparent about this in your methodology. This is actually a finding in itself — the opacity of these systems is part of the privacy problem."
  },
  {
    weakness: "Redaction degrades LLM utility",
    severity: "Medium",
    mitigation: "If you redact all names from a medical document, the LLM gives less useful clinical advice. Measure this trade-off explicitly. The pseudonymisation mode (replacing real PII with consistent fake values) partially mitigates this."
  },
  {
    weakness: "May be perceived as surveying more than contributing",
    severity: "Low",
    mitigation: "The threat taxonomy and risk scoring model are your novel contributions. The system is the artefact. Make sure your paper leads with the empirical attack study results in the abstract — that frames it as a measurement paper, not a survey."
  },
];

const colorMap = {
  blue: { bg: "background: #E6F1FB", text: "color: #0C447C", border: "border: 0.5px solid #85B7EB" },
  teal: { bg: "background: #E1F5EE", text: "color: #085041", border: "border: 0.5px solid #5DCAA5" },
  amber: { bg: "background: #FAEEDA", text: "color: #633806", border: "border: 0.5px solid #EF9F27" },
  coral: { bg: "background: #FAECE7", text: "color: #712B13", border: "border: 0.5px solid #F0997B" },
  purple: { bg: "background: #EEEDFE", text: "color: #3C3489", border: "border: 0.5px solid #AFA9EC" },
  green: { bg: "background: #EAF3DE", text: "color: #27500A", border: "border: 0.5px solid #97C459" },
  gray: { bg: "background: #F1EFE8", text: "color: #444441", border: "border: 0.5px solid #B4B2A9" },
  red: { bg: "background: #FCEBEB", text: "color: #791F1F", border: "border: 0.5px solid #F09595" },
};

function Badge({ color, label }) {
  const c = colorMap[color] || colorMap.gray;
  return (
    <span style={{
      display: "inline-block", fontSize: "11px", fontWeight: 500,
      padding: "2px 8px", borderRadius: "4px",
      ...Object.fromEntries([c.bg, c.text, c.border].map(s => s.split(": ").length === 2 ? [s.split(": ")[0], s.split(": ")[1]] : []).filter(x => x.length))
    }}>
      {label}
    </span>
  );
}

function ColBadge({ color, label }) {
  const c = colorMap[color] || colorMap.gray;
  const styles = {};
  [c.bg, c.text, c.border].forEach(s => {
    const [k, v] = s.split(": ");
    if (k && v) styles[k] = v;
  });
  return (
    <span style={{
      display: "inline-block", fontSize: "11px", fontWeight: 500,
      padding: "2px 8px", borderRadius: "4px", ...styles
    }}>
      {label}
    </span>
  );
}

function SeverityDot({ level }) {
  const colors = { High: "#E24B4A", Medium: "#EF9F27", Low: "#639922" };
  return <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: colors[level] || "#888", marginRight: 6, flexShrink: 0, marginTop: 2 }} />;
}

export default function PrivShieldGuide() {
  const [active, setActive] = useState("gap");

  return (
    <div style={{ fontFamily: "var(--font-sans)", color: "var(--color-text-primary)", paddingBottom: "2rem" }}>
      <h2 style={{ fontSize: 18, fontWeight: 500, margin: "0 0 4px" }}>PrivShield — Research Contribution Guide</h2>
      <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "0 0 1.5rem" }}>
        IEEE-level critique · System design · Publication roadmap
      </p>

      {/* Nav tabs */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: "1.5rem", borderBottom: "0.5px solid var(--color-border-tertiary)", paddingBottom: "0.75rem" }}>
        {sections.map(s => (
          <button key={s.id} onClick={() => setActive(s.id)} style={{
            fontSize: 12, padding: "4px 12px", borderRadius: "var(--border-radius-md)",
            border: active === s.id ? "0.5px solid var(--color-border-primary)" : "0.5px solid var(--color-border-tertiary)",
            background: active === s.id ? "var(--color-background-secondary)" : "transparent",
            color: active === s.id ? "var(--color-text-primary)" : "var(--color-text-secondary)",
            cursor: "pointer", fontWeight: active === s.id ? 500 : 400
          }}>
            {s.label}
          </button>
        ))}
      </div>

      {/* GAP */}
      {active === "gap" && (
        <div>
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)", marginBottom: "1rem", lineHeight: 1.7 }}>
            Your five reference papers — Yang (2026), Chen et al. (2025), Miranda et al. (2025), Gupta et al. (2023), and Mehmood et al. (2026) — all address <strong style={{ fontWeight: 500 }}>training-time attacks</strong>. The gap below is entirely unaddressed in your literature and in the broader field.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {gapData.map(g => (
              <div key={g.label} style={{
                borderRadius: "var(--border-radius-lg)",
                border: "0.5px solid var(--color-border-tertiary)",
                background: "var(--color-background-primary)",
                padding: "1rem 1.25rem"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <ColBadge color={g.color} label={g.label} />
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{g.title}</span>
                </div>
                <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "0 0 8px", lineHeight: 1.6 }}>{g.body}</p>
                <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", margin: 0, fontStyle: "italic" }}>{g.cite}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "1.25rem", padding: "1rem 1.25rem", borderRadius: "var(--border-radius-lg)", background: "var(--color-background-secondary)", border: "0.5px solid var(--color-border-tertiary)" }}>
            <p style={{ fontSize: 13, fontWeight: 500, margin: "0 0 6px" }}>The pivotal reframing</p>
            <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.7 }}>
              Every existing paper asks: <em>"What can an adversary extract from a model's training data?"</em> Your paper asks: <em>"What privacy risk does a user incur when they upload a document to an LLM at inference time, and how can that risk be assessed and mitigated before the upload?"</em> These are orthogonal problems. Yours is unsolved.
            </p>
          </div>
        </div>
      )}

      {/* CONTRIBUTION */}
      {active === "contribution" && (
        <div>
          <div style={{ marginBottom: "1.25rem", padding: "1rem 1.25rem", borderRadius: "var(--border-radius-lg)", background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <i className="ti ti-shield-check" style={{ fontSize: 20, color: "#185FA5" }} aria-hidden="true" />
              <span style={{ fontSize: 16, fontWeight: 500 }}>PrivShield</span>
              <ColBadge color="blue" label="Novel artefact" />
            </div>
            <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.7 }}>
              A client-side pre-upload privacy risk assessment and document sanitisation pipeline. PrivShield intercepts a document before it is submitted to any LLM platform, performs document-type classification, multi-layer PII detection, threat vector mapping, risk scoring, and offers automated redaction or pseudonymisation.
            </p>
          </div>

          <p style={{ fontSize: 14, fontWeight: 500, marginBottom: "0.75rem" }}>Three research contributions in one paper</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { num: "C1", color: "blue", title: "Inference-time threat taxonomy", desc: "The first systematic mapping of document type × PII entity type → downstream cybersecurity attack vector. Publishable as a standalone table. Grounded in MITRE ATT&CK and LINDDUN." },
              { num: "C2", color: "teal", title: "Empirical extraction study", desc: "First measurement of how much PII uploaded to production LLMs (ChatGPT, Gemini, Copilot) can be extracted via follow-up prompts. Establishes the threat is real, not theoretical." },
              { num: "C3", color: "purple", title: "PrivShield system + evaluation", desc: "End-to-end implemented system with quantified precision/recall for PII detection, a calibrated risk score, and a utility–privacy trade-off evaluation for the redaction modes." },
            ].map(c => (
              <div key={c.num} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "0.875rem 1rem", borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-tertiary)", background: "var(--color-background-primary)" }}>
                <ColBadge color={c.color} label={c.num} />
                <div>
                  <p style={{ fontSize: 13, fontWeight: 500, margin: "0 0 4px" }}>{c.title}</p>
                  <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.6 }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "1.25rem", padding: "1rem 1.25rem", borderRadius: "var(--border-radius-lg)", background: "var(--color-background-secondary)", border: "0.5px solid var(--color-border-tertiary)" }}>
            <p style={{ fontSize: 13, fontWeight: 500, margin: "0 0 6px" }}>Why this is not just another survey</p>
            <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.7 }}>
              Contributions C1, C2, and C3 together constitute a <em>measurement paper with an artefact</em> — the strongest category for cybersecurity conferences. C2 alone (empirical extraction study) could be a standalone conference paper. C1 alone (taxonomy) is publishable as a short paper or SoK at IEEE S&P. PrivShield (C3) is the practical demonstration that the threat is real and addressable.
            </p>
          </div>
        </div>
      )}

      {/* ARCHITECTURE */}
      {active === "architecture" && (
        <div>
          <p style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: "1rem", lineHeight: 1.7 }}>
            PrivShield is a seven-stage pipeline that runs entirely on the client before any data is transmitted to an LLM platform. Click any component to see design notes.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {archComponents.map((comp, i) => (
              <div key={comp.id} style={{
                display: "flex", gap: 12, alignItems: "flex-start",
                padding: "0.875rem 1rem",
                borderRadius: "var(--border-radius-md)",
                border: "0.5px solid var(--color-border-tertiary)",
                background: "var(--color-background-primary)"
              }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, minWidth: 32 }}>
                  <i className={`ti ${comp.icon}`} style={{ fontSize: 18, color: "var(--color-text-secondary)" }} aria-hidden="true" />
                  <span style={{ fontSize: 10, color: "var(--color-text-tertiary)" }}>{i + 1}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{comp.title}</span>
                    <ColBadge color={comp.color} label={comp.subtitle} />
                  </div>
                  <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.6 }}>{comp.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "1.25rem", padding: "1rem 1.25rem", borderRadius: "var(--border-radius-lg)", background: "var(--color-background-secondary)", border: "0.5px solid var(--color-border-tertiary)" }}>
            <p style={{ fontSize: 13, fontWeight: 500, margin: "0 0 6px" }}>Risk scoring formula</p>
            <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "0 0 8px", lineHeight: 1.7 }}>
              RiskScore(d) = Σᵢ [ wᵢ × sᵢ × cᵢ ] × λ(doc_type)
            </p>
            <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", margin: 0, lineHeight: 1.6 }}>
              where wᵢ = entity sensitivity weight (calibrated from breach statistics), sᵢ = entity count normalised by document length, cᵢ = context amplifier (e.g. ×2 if entity appears near a financial amount), and λ(doc_type) is a document-type multiplier (medical records λ=1.4, code with secrets λ=1.6, personal document λ=1.0).
            </p>
          </div>
        </div>
      )}

      {/* METHODOLOGY */}
      {active === "methodology" && (
        <div>
          <p style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: "1rem", lineHeight: 1.7 }}>
            A four-phase research methodology spanning approximately 18 weeks. Each phase produces an independently publishable result.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {methodPhases.map(p => (
              <div key={p.phase} style={{ borderRadius: "var(--border-radius-lg)", border: "0.5px solid var(--color-border-tertiary)", background: "var(--color-background-primary)", overflow: "hidden" }}>
                <div style={{ padding: "0.75rem 1rem", borderBottom: "0.5px solid var(--color-border-tertiary)", display: "flex", alignItems: "center", gap: 10 }}>
                  <ColBadge color={p.color} label={p.phase} />
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{p.title}</span>
                  <span style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginLeft: "auto" }}>{p.duration}</span>
                </div>
                <div style={{ padding: "0.75rem 1rem" }}>
                  <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
                    {p.tasks.map((t, i) => (
                      <li key={i} style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.7, marginBottom: 4 }}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "1.25rem", padding: "1rem 1.25rem", borderRadius: "var(--border-radius-lg)", background: "var(--color-background-secondary)", border: "0.5px solid var(--color-border-tertiary)" }}>
            <p style={{ fontSize: 13, fontWeight: 500, margin: "0 0 6px" }}>Ethics / IRB note</p>
            <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.7 }}>
              Phase 2 requires special care. You must use only synthetic documents you generate (via the Faker library) — never real users' data. Submit an ethics review describing your synthetic data generation methodology before beginning Phase 2. If you conduct a user study in Phase 4, a full IRB application is required.
            </p>
          </div>
        </div>
      )}

      {/* EXPERIMENTS & DATASETS */}
      {active === "experiments" && (
        <div>
          <p style={{ fontSize: 14, fontWeight: 500, marginBottom: "0.75rem" }}>Recommended datasets</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: "1.5rem" }}>
            {datasets.map(d => (
              <div key={d.name} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "0.75rem 1rem", borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-tertiary)", background: "var(--color-background-primary)" }}>
                <ColBadge color={d.color} label={d.type} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 500, margin: "0 0 2px" }}>{d.name}</p>
                  <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: "0 0 2px" }}>{d.use}</p>
                  <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", margin: 0 }}>Access: {d.access}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 14, fontWeight: 500, marginBottom: "0.75rem" }}>Tools and libraries</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: "1.5rem" }}>
            {tools.map(t => (
              <div key={t.name} style={{ padding: "0.75rem 1rem", borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-tertiary)", background: "var(--color-background-primary)" }}>
                <p style={{ fontSize: 13, fontWeight: 500, margin: "0 0 2px" }}>{t.name}</p>
                <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: "0 0 2px" }}>{t.role}</p>
                <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", margin: 0 }}>{t.url}</p>
              </div>
            ))}
          </div>
          <div style={{ padding: "1rem 1.25rem", borderRadius: "var(--border-radius-lg)", background: "var(--color-background-secondary)", border: "0.5px solid var(--color-border-tertiary)" }}>
            <p style={{ fontSize: 13, fontWeight: 500, margin: "0 0 6px" }}>Key experiments to run</p>
            {[
              "RQ1: What percentage of PII in uploaded documents can be extracted via follow-up prompts? (Test on GPT-4o, Gemini 1.5, Copilot)",
              "RQ2: Does PII persist across sessions via memory features? (ChatGPT Memory on/off experiment)",
              "RQ3: How accurately does PrivShield detect PII across document types? (Precision, recall, F1 on i2b2 + synthetic test set)",
              "RQ4: What is the utility cost of redaction? (Task completion rate with/without redacted document)",
              "RQ5: Do users change upload behaviour after seeing a PrivShield risk score? (Optional user study, n=30 suffices)"
            ].map((q, i) => (
              <p key={i} style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "0 0 6px", lineHeight: 1.6 }}>{q}</p>
            ))}
          </div>
        </div>
      )}

      {/* PUBLICATION PATH */}
      {active === "publish" && (
        <div>
          <p style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: "1rem", lineHeight: 1.7 }}>
            Target venues in order of fit. Match percentage reflects how well the PrivShield contribution aligns with that venue's typical acceptance profile.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: "1.5rem" }}>
            {venues.map(v => (
              <div key={v.name} style={{ padding: "0.875rem 1rem", borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-tertiary)", background: "var(--color-background-primary)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{v.name}</span>
                  <ColBadge color={v.tier === "A*" ? "purple" : v.tier === "A" ? "blue" : v.tier === "B" ? "teal" : "gray"} label={v.tier} />
                  <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 60, height: 4, borderRadius: 2, background: "var(--color-background-secondary)", overflow: "hidden" }}>
                      <div style={{ width: `${v.match}%`, height: "100%", background: v.match >= 85 ? "#1D9E75" : v.match >= 70 ? "#3B8BD4" : "#BA7517", borderRadius: 2 }} />
                    </div>
                    <span style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>{v.match}%</span>
                  </div>
                </div>
                <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: 0 }}>{v.notes}</p>
              </div>
            ))}
          </div>
          <div style={{ padding: "1rem 1.25rem", borderRadius: "var(--border-radius-lg)", background: "var(--color-background-secondary)", border: "0.5px solid var(--color-border-tertiary)" }}>
            <p style={{ fontSize: 13, fontWeight: 500, margin: "0 0 8px" }}>Recommended paper structure (IEEE format)</p>
            {[
              "Abstract — Lead with empirical finding (e.g. '73% of PII in uploaded documents can be extracted via follow-up prompts')",
              "1. Introduction — Motivate with real-world incidents (Samsung leak, 2023). State RQs.",
              "2. Background — Brief coverage of inference-time vs training-time attacks. Cite your 5 papers here.",
              "3. Threat taxonomy (C1) — Table: doc type × entity type × attack vector",
              "4. Empirical extraction study (C2) — Methodology, ethical clearance, results table",
              "5. PrivShield design (C3a) — Architecture, algorithm, implementation",
              "6. Evaluation (C3b) — PII detection metrics, risk score calibration, utility–privacy trade-off",
              "7. Discussion — Limitations, cross-session leakage finding, policy implications",
              "8. Related work — Distinguish from training-time papers. Brief coverage of deepfake/jailbreak.",
              "9. Conclusion and future work"
            ].map((item, i) => (
              <p key={i} style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: "0 0 5px", lineHeight: 1.5 }}>{item}</p>
            ))}
          </div>
        </div>
      )}

      {/* COMPARISON */}
      {active === "comparison" && (
        <div>
          <p style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: "1rem", lineHeight: 1.7 }}>
            How does your proposed topic compare to other active AI security research directions?
          </p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ borderBottom: "0.5px solid var(--color-border-secondary)" }}>
                  {["Topic", "Field maturity", "Novelty opportunity", "Practicality", "Verdict"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "6px 8px", color: "var(--color-text-secondary)", fontWeight: 500, fontSize: 12 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisons.map((c, i) => (
                  <tr key={i} style={{ borderBottom: "0.5px solid var(--color-border-tertiary)", background: c.topic.includes("PrivShield") ? "var(--color-background-secondary)" : "transparent" }}>
                    <td style={{ padding: "8px", fontWeight: c.topic.includes("PrivShield") ? 500 : 400 }}>{c.topic}</td>
                    <td style={{ padding: "8px" }}>
                      <ColBadge color={c.maturity === "Saturated" ? "red" : c.maturity === "Active" ? "amber" : c.maturity === "Maturing" ? "gray" : "green"} label={c.maturity} />
                    </td>
                    <td style={{ padding: "8px" }}>
                      <ColBadge color={c.novelty.includes("High") ? "green" : c.novelty.includes("Medium") ? "amber" : "gray"} label={c.novelty} />
                    </td>
                    <td style={{ padding: "8px" }}>
                      <ColBadge color={c.practicality === "High" ? "teal" : c.practicality === "Medium" ? "blue" : "gray"} label={c.practicality} />
                    </td>
                    <td style={{ padding: "8px", color: "var(--color-text-secondary)", fontSize: 11 }}>{c.verdict}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: "1.25rem", padding: "1rem 1.25rem", borderRadius: "var(--border-radius-lg)", background: "var(--color-background-secondary)", border: "0.5px solid var(--color-border-tertiary)" }}>
            <p style={{ fontSize: 13, fontWeight: 500, margin: "0 0 6px" }}>The key differentiation from jailbreak/deepfake work</p>
            <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.7 }}>
              Jailbreak detection addresses model-level adversarial robustness. Deepfake detection addresses synthetic media authenticity. PrivShield addresses something neither touches: the privacy risk borne by the <em>user</em> at the moment of interaction. This is the only approach that is proactive, user-centric, and platform-agnostic — it works regardless of which LLM the user chooses and requires no cooperation from the AI provider.
            </p>
          </div>
        </div>
      )}

      {/* WEAKNESSES */}
      {active === "weaknesses" && (
        <div>
          <p style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: "1rem", lineHeight: 1.7 }}>
            An IEEE reviewer will raise these objections. Address each one proactively in your paper. Acknowledging limitations strengthens, not weakens, your submission.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {weaknesses.map((w, i) => (
              <div key={i} style={{ borderRadius: "var(--border-radius-lg)", border: "0.5px solid var(--color-border-tertiary)", background: "var(--color-background-primary)", overflow: "hidden" }}>
                <div style={{ padding: "0.75rem 1rem", borderBottom: "0.5px solid var(--color-border-tertiary)", display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <SeverityDot level={w.severity} />
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{w.weakness}</span>
                  <ColBadge color={w.severity === "High" ? "coral" : w.severity === "Medium" ? "amber" : "green"} label={w.severity} />
                </div>
                <div style={{ padding: "0.75rem 1rem" }}>
                  <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.6 }}>{w.mitigation}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "1.25rem", padding: "1rem 1.25rem", borderRadius: "var(--border-radius-lg)", background: "var(--color-background-secondary)", border: "0.5px solid var(--color-border-tertiary)" }}>
            <p style={{ fontSize: 13, fontWeight: 500, margin: "0 0 6px" }}>Reviewer simulation: the three questions you must answer</p>
            {[
              "\"How is this different from just running Presidio?\" → Your contribution is the document-type-aware threat mapping and calibrated risk scoring, not PII detection alone. Presidio has no threat model, no risk score, and no redaction modes.",
              "\"Your empirical study has a small n — is it generalisable?\" → Acknowledge this explicitly. Argue that the existence of the leakage (any successful extraction) is sufficient to motivate the defence, regardless of the success rate.",
              "\"Your risk weights are arbitrary.\" → Respond with your calibration methodology (breach statistics + expert elicitation). This is where a small user study (n=10 security researchers rating document sensitivity) adds significant credibility."
            ].map((q, i) => (
              <p key={i} style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "0 0 8px", lineHeight: 1.6 }}>{q}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
