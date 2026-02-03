// =========================
// Helpers & Config
// =========================

const ALLOWED_CONCEPTS = [
  "error",
  "machine learning models",
  "bias",
  "variance",
  "high bias",
  "high variance",
  "overfitting",
  "regularization",
  "l1",
  "l2",
];

function normalize(text) {
  return text.toLowerCase().trim();
}

// Enable fetch for Node.js
global.fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { callGemini } = require("./geminiClient");

// =========================
// App Setup
// =========================

const app = express();
app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});

// =========================
// Health Check
// =========================

app.get("/", (req, res) => {
  res.send("MindMapr backend is running");
});

// =========================
// Gemini Test Route
// =========================

app.get("/test-gemini", async (req, res) => {
  try {
    const reply = await callGemini(
      "Explain bias vs variance in one simple sentence."
    );
    res.send(reply);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// =========================
// Extract Concepts
// =========================

app.post("/extract-concepts", async (req, res) => {
  try {
    const { text } = req.body;

    const prompt = `
You are an expert Machine Learning professor.

From the text below, extract the key conceptual terms
related to Machine Learning understanding.

Rules:
- Return ONLY valid JSON
- Do NOT explain anything
- Do NOT use markdown
- Do NOT wrap in \`\`\`
- Concepts must be short phrases

Text:
${text}

Return JSON in this format:
{
  "concepts": ["Concept 1", "Concept 2"]
}
`;

    const result = await callGemini(prompt);

    // Clean Gemini output
    const cleaned = result
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const jsonStart = cleaned.indexOf("{");
    const jsonEnd = cleaned.lastIndexOf("}") + 1;
    const jsonString = cleaned.slice(jsonStart, jsonEnd);

    const parsed = JSON.parse(jsonString);

    // 🔥 PRUNE CONCEPTS
    const prunedConcepts = parsed.concepts.filter((c) =>
      ALLOWED_CONCEPTS.some((allowed) =>
        normalize(c).includes(allowed)
      )
    );

    res.json({ concepts: prunedConcepts });
  } catch (err) {
    console.error("Extract concepts error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// =========================
// Extract Dependencies
// =========================

app.post("/extract-dependencies", async (req, res) => {
  try {
    const { concepts } = req.body;

    const prompt = `
You are an expert Machine Learning educator.

Given the following ML concepts, identify prerequisite relationships.

Rules:
- Return ONLY valid JSON
- Do NOT explain anything
- Do NOT use markdown or backticks
- Use concept names exactly as given

Concepts:
${concepts.join(", ")}

Return JSON in this format:
{
  "dependencies": [
    { "from": "Concept A", "to": "Concept B" }
  ]
}
`;

    const result = await callGemini(prompt);

    const cleaned = result
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const jsonStart = cleaned.indexOf("{");
    const jsonEnd = cleaned.lastIndexOf("}") + 1;
    const jsonString = cleaned.slice(jsonStart, jsonEnd);

    const parsed = JSON.parse(jsonString);

    // 🔥 PRUNE DEPENDENCIES
    const prunedDependencies = parsed.dependencies.filter(
      (d) =>
        ALLOWED_CONCEPTS.some((a) =>
          normalize(d.from).includes(a)
        ) &&
        ALLOWED_CONCEPTS.some((a) =>
          normalize(d.to).includes(a)
        )
    );

    res.json({ dependencies: prunedDependencies });
  } catch (err) {
    console.error("Dependency error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// =========================
// List Available Gemini Models (Debug)
// =========================

app.get("/list-models", async (req, res) => {
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models?key=" +
        process.env.GEMINI_API_KEY
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
