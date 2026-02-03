"use client";

import { useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

export default function Home() {
  // =========================
  // STATE
  // =========================
  const [text, setText] = useState("");
  const [concepts, setConcepts] = useState<string[]>([]);
  const [dependencies, setDependencies] = useState<
    { from: string; to: string }[]
  >([]);

  // =========================
  // COLOR LOGIC
  // =========================
  function getNodeColor(label: string) {
    const t = label.toLowerCase();

    if (
      t.includes("overfitting") ||
      t.includes("bias") ||
      t.includes("variance")
    ) {
      return "#ff6b6b"; // 🔴 problems
    }

    if (t.includes("regularization") || t.includes("l1") || t.includes("l2")) {
      return "#51cf66"; // 🟢 solutions
    }

    return "#ffd43b"; // 🟡 derived / neutral
  }

  // =========================
  // GRAPH BUILDER (SAFE)
  // =========================
  function buildGraph(
    concepts: string[] = [],
    dependencies: { from: string; to: string }[] = [],
  ) {
    const nodes = concepts.map((c, i) => ({
      id: c,
      data: { label: c },
      position: { x: i * 160, y: 120 },
      style: {
        background: getNodeColor(c),
        color: "#000",
        borderRadius: 8,
        padding: 10,
        fontWeight: "bold",
      },
    }));

    const edges = dependencies.map((d, i) => ({
      id: `e-${i}`,
      source: d.from,
      target: d.to,
      animated: true,
    }));

    return { nodes, edges };
  }

  const { nodes, edges } = buildGraph(concepts, dependencies);

  // =========================
  // API CALLS (DEFENSIVE)
  // =========================
  async function extractConcepts() {
    const res = await fetch("http://localhost:5000/extract-concepts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    const safeConcepts = Array.isArray(data.concepts) ? data.concepts : [];

    setConcepts(safeConcepts);
    extractDependencies(safeConcepts);
  }

  async function extractDependencies(conceptsList: string[]) {
    if (!Array.isArray(conceptsList) || conceptsList.length === 0) {
      setDependencies([]);
      return;
    }

    const res = await fetch("http://localhost:5000/extract-dependencies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ concepts: conceptsList }),
    });

    const data = await res.json();
    setDependencies(Array.isArray(data.dependencies) ? data.dependencies : []);
  }

  // =========================
  // UI
  // =========================
  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial, sans-serif",
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <div style={{ marginBottom: "30px" }}>
        <h1 style={{ marginBottom: "8px" }}>MindMapr – ML Concept Extractor</h1>

        <p style={{ color: "#888", marginTop: 0 }}>
          Turn raw machine learning notes into a visual concept map using Gemini
        </p>
      </div>

      <textarea
        rows={8}
        style={{ width: "100%", marginTop: 20, padding: 10 }}
        placeholder="Paste your ML notes here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br />
      <br />

      <button
        onClick={extractConcepts}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          background: "#4c6ef5",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Extract Concepts
      </button>

      {concepts.length > 0 && (
        <>
          <h2 style={{ marginTop: 30 }}>Extracted Concepts</h2>
          <ul>
            {concepts.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </>
      )}

      {nodes.length > 0 && edges.length > 0 && (
        <>
          <div style={{ marginTop: 30 }}>
            <strong>Legend:</strong>
            <ul>
              <li>🔴 Problems (Bias, Variance, Overfitting)</li>
              <li>🟡 Derived concepts (High bias, High variance)</li>
              <li>🟢 Solutions (Regularization, L1, L2)</li>
            </ul>
          </div>

          <div style={{ height: 420, marginTop: 20 }}>
            <h2>Concept Graph</h2>
            <ReactFlow nodes={nodes} edges={edges} fitView>
              <Background />
              <Controls />
            </ReactFlow>
          </div>
        </>
      )}
    </div>
  );
}
