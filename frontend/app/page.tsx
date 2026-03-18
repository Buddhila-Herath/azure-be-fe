"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export default function Home() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const checkAPI = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/health`);
      const data = await res.json();
      setStatus(data.status);
    } catch (_err) {
      setStatus("API not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>My Microservices App</h1>

      <button onClick={checkAPI} disabled={loading}>
        {loading ? "Checking..." : "Check Backend"}
      </button>

      <p>Status: {status || "Not checked yet"}</p>
    </div>
  );
}
