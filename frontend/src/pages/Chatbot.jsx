import { useState, useContext, useEffect, useRef } from "react";
import API from "../api";
import { AppContext } from "../context/AppContext";
import Navbar from "../components/Navbar";

export default function Chatbot() {
  const { language } = useContext(AppContext);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMsg = async () => {
    if (!msg.trim() || loading) return;

    setLoading(true);
    const userMessage = { text: msg, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    const messageToSend = msg;
    setMsg("");

    try {
      const res = await API.post("/api/chat", {
        message: messageToSend,
        language,
      });

      if (res.data && res.data.reply) {
        const botMessage = { text: res.data.reply, sender: 'bot', timestamp: new Date() };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Chat error:", error);
      let errorText = "Sorry, I couldn't process your message. Please try again.";

      if (!error.response) {
        errorText = "Cannot connect to server. Please ensure the backend is running on http://localhost:5000";
      } else if (error.response?.data?.reply) {
        errorText = error.response.data.reply;
      } else if (error.response?.data?.error) {
        errorText = `Error: ${error.response.data.error}`;
      } else if (error.response?.status === 500) {
        errorText = "Server error. Please try again later.";
      } else if (error.response?.status === 400) {
        errorText = "Invalid request. Please check your message.";
      } else if (error.message) {
        errorText = `Error: ${error.message}`;
      }

      const errorMessage = { text: errorText, sender: 'bot', timestamp: new Date() };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      sendMsg();
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: 20 }}>
        <div className="card glass" style={{ maxWidth: 900, width: '100%', padding: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ padding: 6, textAlign: 'center', fontWeight: '700', color: 'var(--dark-navy)' }}>🌱 AI Crop Advisor</div>

          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '8px 6px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {messages.length === 0 && (
              <div style={{ textAlign: 'center', marginTop: '50px', color: 'white', opacity: 0.8 }}>
                <h2>Welcome!</h2>
                <p>Ask me anything about your crops.</p>
              </div>
            )}

            {messages.map((message, index) => (
              <div key={index} style={{
                alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                background: message.sender === 'user' ? 'linear-gradient(90deg, var(--primary-blue), var(--secondary-blue))' : 'white',
                color: message.sender === 'user' ? 'white' : 'var(--dark-navy)',
                padding: '12px 18px',
                borderRadius: '18px',
                maxWidth: '80%',
                boxShadow: '0 4px 14px rgba(9,30,66,0.06)',
                borderBottomRightRadius: message.sender === 'user' ? '6px' : '18px',
                borderBottomLeftRadius: message.sender === 'user' ? '18px' : '6px'
              }}>
                {message.text}
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.7)', padding: '10px 15px', borderRadius: '20px' }}>
                Thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(16px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.4)',
            display: 'flex',
            gap: '10px',
            alignItems: 'center'
          }}>
            <input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about crop advice..."
              disabled={loading}
              className="form-control"
              style={{ flex: 1 }}
            />
            <button
              onClick={sendMsg}
              disabled={loading || !msg.trim()}
              className={`round-button ${loading || !msg.trim() ? '' : 'btn-primary'}`}
              aria-label="Send message"
            >
              {loading ? '...' : '➤'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
