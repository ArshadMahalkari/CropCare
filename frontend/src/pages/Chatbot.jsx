import { useState, useContext, useEffect, useRef } from "react";
import API from "../api";
import { AppContext } from "../context/AppContext";
import Navbar from "../components/Navbar";

export default function Chatbot() {
  const { language, crop, soil } = useContext(AppContext);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage = {
      text: `🌾 Welcome to CropCare AI Assistant! I'm here to help you with all your farming questions. I can provide advice on crops, soil management, pest control, irrigation, fertilizers, and sustainable farming practices. What would you like to know?`,
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
    setSuggestions([
      "How to grow rice in clay soil?",
      "Best fertilizer for cotton?",
      "Pest control for wheat?",
      "Irrigation schedule for maize?",
      "Organic farming tips",
      "Weather-based farming"
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Voice recognition
  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = language === 'HI' ? 'hi-IN' : language === 'MR' ? 'mr-IN' : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setMsg(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
        alert('Voice recognition error. Please try again.');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert('Voice recognition not supported in this browser');
    }
  };

  const sendMsg = async (messageText = null) => {
    const messageToSend = messageText || msg;
    if (!messageToSend.trim() || loading) return;

    setLoading(true);
    const userMessage = { text: messageToSend, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setMsg("");
    setSuggestions([]);

    try {
      const res = await API.post("/api/chat", {
        message: messageToSend,
        language,
        context: { crop, soil }
      });

      if (res.data && res.data.reply) {
        const botMessage = { 
          text: res.data.reply, 
          sender: 'bot', 
          timestamp: new Date(),
          suggestions: res.data.suggestions,
          relatedAdvisory: res.data.relatedAdvisory
        };
        setMessages(prev => [...prev, botMessage]);
        
        if (res.data.suggestions) {
          setSuggestions(res.data.suggestions);
        }
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Chat error:", error);
      let errorText = "I apologize, but I'm experiencing some technical difficulties. Please try asking your question again, or visit our Advisory page for detailed farming guidance.";

      if (!error.response) {
        errorText = "Cannot connect to server. Please ensure the backend is running.";
      } else if (error.response?.data?.reply) {
        errorText = error.response.data.reply;
      }

      const errorMessage = { text: errorText, sender: 'bot', timestamp: new Date() };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !loading) {
      e.preventDefault();
      sendMsg();
    }
  };

  const speakMessage = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'HI' ? 'hi-IN' : language === 'MR' ? 'mr-IN' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const clearChat = () => {
    setMessages([{
      text: `🌾 Chat cleared! I'm still here to help with your farming questions. What would you like to know?`,
      sender: 'bot',
      timestamp: new Date()
    }]);
    setSuggestions([
      "Crop advisory help",
      "Pest management tips", 
      "Irrigation guidance",
      "Fertilizer recommendations"
    ]);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* Header */}
      <section className="section-sm bg-gradient-primary text-white">
        <div className="container text-center">
          <span className="status-badge bg-white text-primary mb-4" style={{ display: 'inline-block' }}>
            🤖 AI Farming Assistant
          </span>
          <h1 className="font-heading text-4xl font-bold mb-4">
            Chat with CropCare AI
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Get instant answers to your farming questions. Ask about crops, soil, pests, irrigation, fertilizers, and more!
          </p>
        </div>
      </section>

      {/* Chat Interface */}
      <section className="section flex-1">
        <div className="container">
          <div className="card card-farming chat-container">
            {/* Chat Header */}
            <div style={{ 
              padding: 'var(--spacing-4)',
              background: 'var(--gradient-primary)',
              color: 'white',
              borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
              borderBottom: '1px solid var(--gray-200)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--spacing-3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)', minWidth: 0, flex: 1 }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--text-xl)',
                    flexShrink: 0
                  }}>
                    🤖
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <h3 style={{ 
                      fontSize: 'var(--text-lg)', 
                      fontWeight: '700', 
                      margin: 0, 
                      marginBottom: 'var(--spacing-1)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      CropCare AI Assistant
                    </h3>
                    <p style={{ 
                      fontSize: 'var(--text-sm)', 
                      opacity: 0.9, 
                      margin: 0,
                      whiteSpace: 'nowrap'
                    }}>
                      Online • Ready to help
                    </p>
                  </div>
                </div>
                <button 
                  onClick={clearChat}
                  className="btn-sm"
                  style={{ 
                    background: 'rgba(255,255,255,0.2)', 
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.3)',
                    flexShrink: 0
                  }}
                >
                  🗑️ Clear
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="chat-messages">
              {messages.map((message, index) => (
                <div key={index} className="animate-fade-in-up" style={{
                  alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: window.innerWidth < 480 ? '90%' : '85%',
                  animationDelay: `${index * 0.1}s`
                }}>
                  <div className={`message ${message.sender}`}>
                    <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                      {message.text}
                    </div>
                    
                    {message.sender === 'bot' && (
                      <div style={{ display: 'flex', gap: 'var(--spacing-2)', marginTop: 'var(--spacing-3)', flexWrap: 'wrap' }}>
                        <button 
                          onClick={() => speakMessage(message.text)}
                          className="btn-sm btn-outline"
                          style={{ 
                            fontSize: 'var(--text-xs)',
                            padding: 'var(--spacing-1) var(--spacing-2)',
                            borderColor: 'var(--primary-green)',
                            color: 'var(--primary-green)'
                          }}
                        >
                          🔊
                        </button>
                      </div>
                    )}
                    
                    {message.relatedAdvisory && (
                      <div style={{ 
                        marginTop: 'var(--spacing-3)', 
                        padding: 'var(--spacing-3)', 
                        background: 'var(--primary-green-50)', 
                        borderRadius: 'var(--radius-lg)' 
                      }}>
                        <p style={{ 
                          fontSize: 'var(--text-sm)', 
                          color: 'var(--primary-green)', 
                          fontWeight: '500', 
                          margin: 0 
                        }}>
                          💡 {message.relatedAdvisory}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--gray-500)',
                    marginTop: 'var(--spacing-1)',
                    textAlign: message.sender === 'user' ? 'right' : 'left'
                  }}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))}
              
              {loading && (
                <div style={{ alignSelf: 'flex-start', maxWidth: '80%' }}>
                  <div className="message bot" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-2)'
                  }}>
                    <div className="loading"></div>
                    <span style={{ color: 'var(--gray-600)' }}>AI is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="chat-suggestions">
                <p style={{ 
                  fontSize: 'var(--text-sm)', 
                  fontWeight: '500', 
                  color: 'var(--gray-700)', 
                  margin: 0,
                  marginBottom: 'var(--spacing-2)'
                }}>
                  💡 Suggested questions:
                </p>
                <div className="chat-suggestions-grid">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => sendMsg(suggestion)}
                      className="chat-suggestion-btn btn-outline"
                      disabled={loading}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="chat-input-area">
              <div className="chat-input-container">
                <textarea
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask me about crops, soil, pests, irrigation, fertilizers..."
                  disabled={loading}
                  className="form-textarea"
                  style={{ 
                    minHeight: '48px',
                    maxHeight: '120px',
                    resize: 'none'
                  }}
                  rows={1}
                />
                
                <div className="chat-input-buttons">
                  <button
                    onClick={startListening}
                    disabled={loading || isListening}
                    className="btn-secondary btn-icon"
                    title="Voice Input"
                  >
                    {isListening ? '🎤' : '🎙️'}
                  </button>
                  
                  <button
                    onClick={() => sendMsg()}
                    disabled={loading || !msg.trim()}
                    className="btn-primary btn-icon"
                    title="Send Message"
                  >
                    {loading ? <div className="loading" style={{ width: '16px', height: '16px' }}></div> : '➤'}
                  </button>
                </div>
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginTop: 'var(--spacing-3)', 
                fontSize: 'var(--text-xs)', 
                color: 'var(--gray-500)',
                flexWrap: 'wrap',
                gap: 'var(--spacing-2)'
              }}>
                <span>Press Enter to send, Shift+Enter for new line</span>
                <span>{msg.length}/500</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-sm bg-gray-50">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4 text-gray-900">
              What I Can Help You With
            </h2>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: "🌾", title: "Crop Advisory", desc: "Personalized recommendations for Rice, Cotton, Wheat, Maize" },
              { icon: "🐛", title: "Pest Management", desc: "Identify and treat crop diseases and pest problems" },
              { icon: "💧", title: "Irrigation Guidance", desc: "Water management based on soil type and weather" },
              { icon: "🌱", title: "Fertilizer Advice", desc: "Balanced nutrition recommendations for optimal yields" },
              { icon: "🌤️", title: "Weather Insights", desc: "Climate-based farming decisions and timing" },
              { icon: "💰", title: "Cost Optimization", desc: "Economical farming practices to reduce expenses" }
            ].map((item, index) => (
              <div key={index} className="card card-farming">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">{item.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
