import React, { useState, useRef, useEffect } from "react";

// Simulated AI chatbot function (replace with real API as needed)
function fetchChatbotResponse(message) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simple placeholder logic for responses
      if (message.toLowerCase().includes("bali")) {
        resolve("Bali is famous for its beaches, rice terraces, and cultural attractions. Don't miss Ubud and the temples!");
      } else if (message.toLowerCase().includes("pack")) {
        resolve("Packing tip: bring layers, comfortable shoes, and check the local weather for your destination.");
      } else if (message.toLowerCase().includes("iceland")) {
        resolve("For Iceland in December, warm/waterproof clothes, thermal layers, and a headlamp are recommended.");
      } else {
        resolve("I'm here to help with your travel questions or recommendations! Ask me anything.");
      }
    }, 1200);
  });
}

// PUBLIC_INTERFACE
function ChatPage() {
  /**
   * Chat Page - AI travel assistant chatbot for travel queries.
   * Uses a fake API to simulate chatbot responses.
   */
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi! I'm your AI travel assistant. Ask me anything about destinations, itineraries, or travel tips!" }
  ]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { sender: "user", text: input }]);
    setLoading(true);
    const userMsg = input;
    setInput("");
    try {
      const aiReply = await fetchChatbotResponse(userMsg);
      setMessages((msgs) => [...msgs, { sender: "ai", text: aiReply }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="hero" style={{paddingBottom: 28}}>
        <div className="subtitle">AI Travel Chatbot</div>
        <h1 className="title">Ask Your Travel Questions</h1>
        <div className="description">
          Chat with our AI and get instant answers to your travel-related queries and recommendations.
        </div>
      </div>
      <div style={{
        maxWidth: 500,
        margin: "0 auto",
        background: "rgba(255,255,255,0.05)",
        borderRadius: 8,
        padding: 18,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        minHeight: 330,
        display: "flex",
        flexDirection: "column"
      }}>
        <div
          style={{
            flex: 1, overflowY: "auto", marginBottom: 12, maxHeight: 270,
            padding: "0 4px"
          }}
        >
          {messages.map((msg, idx) => (
            <div key={idx} style={{
              marginBottom: 12,
              textAlign: msg.sender === "ai" ? "left" : "right"
            }}>
              <div style={{
                background: msg.sender === "ai" ? "rgba(0,255,255,0.10)" : "var(--base-light)",
                color: msg.sender === "ai" ? "var(--text-color)" : "#fff",
                display: "inline-block",
                borderRadius: 6,
                padding: "8px 14px",
                fontSize: "1em",
                maxWidth: "82%",
                wordBreak: "break-word",
                boxShadow: msg.sender === "ai" ? undefined : "0 1px 6px rgba(0,0,0,0.08)"
              }}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <form style={{display:"flex", gap: "6px"}}
              onSubmit={handleSubmit}
              autoComplete="off"
        >
          <input
            type="text"
            value={input}
            placeholder="Type your question…"
            style={{
              flex: 1,
              padding: "10px",
              fontSize: "1rem",
              borderRadius: "4px",
              border: "1px solid var(--border-color)",
              background: "#232846",
              color: "var(--text-color)"
            }}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            aria-label="Ask your travel question"
          />
          <button className="btn" type="submit" disabled={loading || !input.trim()}>
            {loading ? "..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatPage;
