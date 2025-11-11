import React, { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const summarize = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError("");
    setSummary("");

    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputs: input }),
      }
    );



      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // HF sometimes returns an array of objects
      setSummary(data[0]?.summary_text || "No summary returned.");
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const copySummary = () => {
    navigator.clipboard.writeText(summary);
    alert("Summary copied to clipboard!");
  };

  return (
    <div style={{
      fontFamily: "system-ui, sans-serif",
      padding: "30px",
      maxWidth: "700px",
      margin: "auto",
      textAlign: "center"
    }}>
      <h1>📰 AI News Summarizer</h1>
      <p>Paste your article text or paragraph below and click “Summarize”.</p>

      <textarea
        rows="8"
        placeholder="Paste text here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          resize: "none",
        }}
      />

      <div style={{ marginTop: "10px" }}>
        <button
          onClick={summarize}
          disabled={loading || !input.trim()}
          style={{
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>
      </div>

      {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}

      {summary && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#f9f9f9",
            border: "1px solid #ddd",
            borderRadius: "8px",
            textAlign: "left",
          }}
        >
          <h3>Summary:</h3>
          <p>{summary}</p>
          <button
            onClick={copySummary}
            style={{
              marginTop: "10px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              padding: "6px 12px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Copy Summary
          </button>
        </div>
      )}

      <footer style={{ marginTop: "30px", fontSize: "0.9em", color: "#555" }}>
        <p>Model: facebook/bart-large-cnn (via Hugging Face Inference API)</p>
      </footer>
    </div>
  );
}

export default App;

