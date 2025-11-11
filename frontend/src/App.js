import React, { useState } from "react";
import { ReactTyped } from "react-typed";


function App() {
  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [length, setLength] = useState("medium");

  const summarize = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError("");
    setSummary("");

    let lengthHint = "";
    if (length === "short") lengthHint = "Summarize briefly in 1-2 sentences.";
    else if (length === "medium")
      lengthHint = "Summarize concisely in 3-4 sentences.";
    else lengthHint = "Summarize in detail with key points.";

    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `${input}\n\n${lengthHint}`,
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setSummary(data[0]?.summary_text || "No summary returned.");
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const copySummary = () => {
    navigator.clipboard.writeText(summary);
    alert("✅ Summary copied to clipboard!");
  };

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        padding: "30px",
        maxWidth: "750px",
        margin: "auto",
        textAlign: "center",
      }}
    >
      <h1>📰 AI News Summarizer</h1>
      <p style={{ color: "#555" }}>
        Paste your article text below and let AI summarize it instantly.
      </p>

      {/* Input box */}
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

      {/* Summary length selector */}
      <div style={{ marginTop: "10px" }}>
        <label style={{ marginRight: "10px" }}>Summary length:</label>
        <select
          value={length}
          onChange={(e) => setLength(e.target.value)}
          style={{ padding: "6px", borderRadius: "6px" }}
        >
          <option value="short">Short</option>
          <option value="medium">Medium</option>
          <option value="detailed">Detailed</option>
        </select>
      </div>

      {/* Summarize button */}
      <div style={{ marginTop: "15px" }}>
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

      {/* Summary output with typing animation */}
      {summary && (
        <div
          style={{
            marginTop: "25px",
            padding: "15px",
            backgroundColor: "#f9f9f9",
            border: "1px solid #ddd",
            borderRadius: "8px",
            textAlign: "left",
          }}
        >
          <h3>🧠 Summary:</h3>
          <ReactTyped
            strings={[summary]}
            typeSpeed={15}
            showCursor={false}
          />
          <br />
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

      {/* How it works section */}
      <section style={{ marginTop: "40px", textAlign: "left" }}>
        <h2>⚙️ How It Works</h2>
        <p>
          This app uses Hugging Face’s <b>BART-large-CNN</b> transformer model
          to summarize text. When you click “Summarize”, your input text is sent
          to a secure Vercel serverless API route, which communicates with
          Hugging Face. The AI then returns a concise summary based on your
          selected detail level.
        </p>
      </section>

      <footer style={{ marginTop: "30px", fontSize: "0.9em", color: "#555" }}>
        <p>Built with ❤️ using React + Vercel + Hugging Face API</p>
      </footer>
    </div>
  );
}

export default App;
