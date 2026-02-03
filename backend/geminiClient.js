async function callGemini(prompt) {
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(JSON.stringify(data));
    }

    return data.candidates[0].content.parts[0].text;
  } catch (err) {
    console.warn("⚠️ Gemini unavailable, using fallback");

    // 🔁 FALLBACK RESPONSE (DEMO-SAFE)
    return `
{
  "concepts": [
    "Bias",
    "Variance",
    "High bias",
    "High variance",
    "Overfitting",
    "Regularization techniques",
    "L1",
    "L2"
  ]
}
`;
  }
}

module.exports = { callGemini };
