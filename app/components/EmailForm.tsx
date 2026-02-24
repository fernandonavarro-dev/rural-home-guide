"use client";

import { useState } from "react";

export default function EmailForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("You're on the list. We'll let you know when we launch.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  }

  if (status === "success") {
    return (
      <p
        style={{
          color: "#2E6B1A",
          fontFamily: "system-ui, sans-serif",
          fontSize: "1rem",
          marginTop: "0.5rem",
        }}
      >
        ✓ {message}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={status === "loading"}
          style={{
            flex: "1",
            minWidth: "220px",
            padding: "0.75rem 1rem",
            fontSize: "1rem",
            fontFamily: "system-ui, sans-serif",
            border: "1.5px solid #D1C9B8",
            borderRadius: "6px",
            backgroundColor: "#FFFFFF",
            color: "#1C1C1C",
            outline: "none",
          }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            fontFamily: "system-ui, sans-serif",
            fontWeight: 600,
            backgroundColor: "#C4860A",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "6px",
            cursor: status === "loading" ? "wait" : "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {status === "loading" ? "..." : "Notify me"}
        </button>
      </div>
      {status === "error" && (
        <p
          style={{
            color: "#B91C1C",
            fontFamily: "system-ui, sans-serif",
            fontSize: "0.875rem",
            margin: 0,
          }}
        >
          {message}
        </p>
      )}
    </form>
  );
}
