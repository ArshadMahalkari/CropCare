import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Navbar from "../components/Navbar";

export default function Home() {
  const { language } = useContext(AppContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isMobile] = useState(window.innerWidth < 768);

  const features = [
    {
      icon: "🌾",
      title: t('expert_advice') || "Expert Agricultural Advice",
      description: "AI-powered recommendations tailored to your soil, crop, and local conditions with expert agricultural knowledge",
      color: "var(--primary-green)",
      bgClass: "card-farming"
    },
    {
      icon: "💰",
      title: t('three_modes') || "Three Advisory Modes",
      description: "Cost-effective, sustainable, and optimal balance farming approaches for every farmer's needs",
      color: "var(--earth-orange)",
      bgClass: "card-earth"
    },
    {
      icon: "🌱",
      title: t('sustainable') || "Sustainable Practices",
      description: "Promote organic practices and long-term soil health with environmentally conscious farming guidance",
      color: "var(--leaf-green)",
      bgClass: "card-farming"
    },
    {
      icon: "🌤️",
      title: t('weather_integration') || "Weather Integration",
      description: "Real-time weather data integrated into your farming recommendations for optimal timing",
      color: "var(--sky-blue)",
      bgClass: "card-sky"
    },
    {
      icon: "🔊",
      title: t('voice_support') || "Voice Support",
      description: "Listen to advisories in your preferred language for easy understanding and accessibility",
      color: "var(--primary-green)",
      bgClass: "card-farming"
    },
    {
      icon: "📱",
      title: t('multiple_languages') || "Multiple Languages",
      description: "Available in 9 Indian languages with farmer-friendly interface designed for smartphones",
      color: "var(--leaf-green)",
      bgClass: "card-farming"
    }
  ];

  const advisoryModes = [
    {
      mode: t('economical') || "Economical",
      icon: "💰",
      description: "Minimize costs while maintaining good yields with budget-friendly farming solutions",
      benefits: ["25-30% cost reduction", "Optimized resource usage", "Quick return on investment"],
      color: "var(--earth-orange)",
      bgColor: "var(--earth-cream)",
      gradient: "var(--gradient-earth)"
    },
    {
      mode: t('environment_friendly') || "Environment-Friendly", 
      icon: "🌱",
      description: "Sustainable practices for long-term soil health and environmental protection",
      benefits: ["100% organic inputs", "Soil health improvement", "Chemical-free farming"],
      color: "var(--leaf-green)",
      bgColor: "var(--primary-green-100)",
      gradient: "var(--gradient-primary)"
    },
    {
      mode: t('balanced') || "Balanced",
      icon: "⚖️", 
      description: "Optimal balance of cost and sustainability for maximum farmer benefit",
      benefits: ["Best risk-reward ratio", "90-95% yield potential", "Recommended for most farmers"],
      color: "var(--sky-blue)",
      bgColor: "var(--sky-blue-100)",
      gradient: "var(--gradient-sky)"
    }
  ];

  const farmingSteps = [
    { 
      step: "1", 
      icon: "🌾", 
      title: "Select Your Crop", 
      desc: "Choose from Rice, Cotton, Wheat, or Maize with detailed crop-specific guidance",
      color: "var(--primary-green)"
    },
    { 
      step: "2", 
      icon: "🏞️", 
      title: "Identify Soil Type", 
      desc: "Clay, Loam, or Sandy - our AI will provide soil-specific recommendations",
      color: "var(--earth-brown)"
    },
    { 
      step: "3", 
      icon: "🤖", 
      title: "AI Analysis", 
      desc: "Advanced AI processes your data with real-time weather intelligence and expert knowledge",
      color: "var(--sky-blue)"
    },
    { 
      step: "4", 
      icon: "🎯", 
      title: "Get Three Options", 
      desc: "Choose from Economical, Environment-friendly, or Balanced farming approaches",
      color: "var(--leaf-green)"
    }
  ];

  return (
    <div>
      <Navbar />

      {/* Hero Section - Enhanced for Farmers */}
      <section className="hero-section">
        <div className="container">
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ marginBottom: 'var(--spacing-xl)' }}>
              <span className="status-badge status-success" style={{ 
                display: 'inline-block',
                fontSize: 'var(--text-base)',
                padding: 'var(--spacing-3) var(--spacing-6)',
                background: 'var(--gradient-primary)',
                color: 'white',
                border: 'none'
              }}>
                🌾 {t('smart_farming') || "Smart Farming Companion"}
              </span>
            </div>
            
            <h1 className="hero-title">
              🌾 {t('welcome') || "Welcome to CropCare"} - {t('smart_farming') || "Smart Farming"}
            </h1>
            
            <p className="hero-subtitle">
              Get personalized crop advisory with three intelligent modes: save money, protect environment, or find the perfect balance. Trusted by thousands of Indian farmers across 9 languages.
            </p>

            <div className="hero-actions">
              <button 
                className="btn-primary btn-lg" 
                onClick={() => navigate('/advisory')}
                style={{ minWidth: '240px' }}
              >
                🚀 {t('get_advisory') || "Get Advisory"}
              </button>
              <button 
                className="btn-secondary btn-lg"
                onClick={() => navigate('/chat')}
                style={{ minWidth: '240px' }}
              >
                💬 {t('ai_chat') || "AI Chat"}
              </button>
            </div>

            {/* Enhanced Stats */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">3</div>
                <div className="stat-label">{t('three_modes') || "Advisory Modes"}</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">9</div>
                <div className="stat-label">Indian Languages</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">4</div>
                <div className="stat-label">Major Crops</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">24/7</div>
                <div className="stat-label">AI Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Advisory Modes Section */}
      <section className="section bg-gray-50">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="status-badge status-info" style={{ 
              display: 'inline-block',
              fontSize: '1.125rem',
              padding: '0.75rem 1.5rem',
              background: 'var(--gradient-sky)',
              color: 'white',
              border: 'none',
              marginBottom: '1rem'
            }}>
              ⚖️ Choose Your Farming Approach
            </span>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '700', 
              marginBottom: '1.5rem', 
              color: 'var(--gray-900)' 
            }}>
              Three Ways to Farm Smarter
            </h2>
            <p style={{ 
              fontSize: '1.25rem', 
              color: 'var(--gray-600)', 
              maxWidth: '800px', 
              margin: '0 auto' 
            }}>
              CropCare offers three parallel advisory approaches, letting you choose what matters most: cost savings, environmental sustainability, or the perfect balance.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
            {advisoryModes.map((mode, index) => (
              <div 
                key={index}
                className="card advisory-mode-card animate-fade-in-up"
                style={{
                  padding: '2rem',
                  border: `3px solid ${mode.color}`,
                  background: `linear-gradient(135deg, ${mode.bgColor} 0%, white 100%)`,
                  cursor: 'pointer',
                  animationDelay: `${index * 0.2}s`,
                  borderRadius: 'var(--radius-2xl)',
                  boxShadow: 'var(--shadow-lg)',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => navigate('/advisory')}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div 
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: mode.gradient,
                        fontSize: '2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      {mode.icon}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <h3 style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: '700', 
                        marginBottom: '0.75rem', 
                        color: mode.color,
                        margin: 0
                      }}>
                        {mode.mode}
                      </h3>
                      <p style={{ 
                        color: 'var(--gray-700)', 
                        marginBottom: '1rem', 
                        fontSize: '1.125rem',
                        margin: 0
                      }}>
                        {mode.description}
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {mode.benefits.map((benefit, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: mode.color, fontSize: '1.125rem' }}>✓</span>
                        <span style={{ color: 'var(--gray-700)' }}>{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '1rem' }}>
                    <span style={{ color: 'var(--gray-400)', fontSize: '1.5rem' }}>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button 
              className="btn-primary btn-lg"
              onClick={() => navigate('/advisory')}
            >
              🌾 Try All Three Modes
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="status-badge status-success" style={{ 
              display: 'inline-block',
              fontSize: '1.125rem',
              padding: '0.75rem 1.5rem',
              background: 'var(--gradient-primary)',
              color: 'white',
              border: 'none',
              marginBottom: '1rem'
            }}>
              ✨ Why Choose CropCare
            </span>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '700', 
              marginBottom: '1.5rem', 
              color: 'var(--gray-900)' 
            }}>
              Built for Indian Farmers
            </h2>
            <p style={{ 
              fontSize: '1.25rem', 
              color: 'var(--gray-600)', 
              maxWidth: '800px', 
              margin: '0 auto' 
            }}>
              Advanced AI technology meets farmer-friendly design. Get professional agricultural advice in your language, on your phone, whenever you need it.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {features.map((feature, index) => (
              <div 
                key={index}
                className="card card-farming animate-fade-in-up"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  padding: '2rem',
                  borderRadius: 'var(--radius-2xl)',
                  boxShadow: 'var(--shadow-lg)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div 
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: feature.color,
                        color: 'white',
                        fontSize: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      {feature.icon}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <h3 style={{ 
                        fontSize: '1.25rem', 
                        fontWeight: '700', 
                        marginBottom: '0.75rem', 
                        color: feature.color,
                        margin: 0
                      }}>
                        {feature.title}
                      </h3>
                    </div>
                  </div>
                  
                  <p style={{ 
                    color: 'var(--gray-700)', 
                    lineHeight: '1.6',
                    margin: 0,
                    fontSize: '1rem'
                  }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section bg-gray-50">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="status-badge status-info" style={{ 
              display: 'inline-block',
              fontSize: '1.125rem',
              padding: '0.75rem 1.5rem',
              background: 'var(--gradient-sky)',
              color: 'white',
              border: 'none',
              marginBottom: '1rem'
            }}>
              🔄 Simple Process
            </span>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '700', 
              marginBottom: '1.5rem', 
              color: 'var(--gray-900)' 
            }}>
              How CropCare Works
            </h2>
            <p style={{ 
              fontSize: '1.25rem', 
              color: 'var(--gray-600)' 
            }}>
              Get personalized farming advice in just 4 simple steps
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {farmingSteps.map((item, index) => (
              <div 
                key={index} 
                className="card card-farming animate-fade-in-up"
                style={{ 
                  animationDelay: `${index * 0.2}s`,
                  padding: '2rem',
                  borderRadius: 'var(--radius-2xl)',
                  boxShadow: 'var(--shadow-lg)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div 
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: item.color,
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    {item.step}
                  </div>
                  
                  <div style={{ fontSize: '2rem', flexShrink: 0 }}>{item.icon}</div>
                  
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      fontSize: '1.25rem', 
                      fontWeight: '700', 
                      marginBottom: '0.5rem', 
                      color: 'var(--gray-900)',
                      margin: 0,
                      marginBottom: '0.5rem'
                    }}>
                      {item.title}
                    </h3>
                    <p style={{ color: 'var(--gray-600)', margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <div 
            className="card"
            style={{
              background: 'var(--gradient-primary)',
              color: 'white',
              padding: '4rem 2rem',
              textAlign: 'center'
            }}
          >
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '700', 
              marginBottom: '1.5rem', 
              color: 'white' 
            }}>
              Ready to Transform Your Farming?
            </h2>
            <p style={{ 
              fontSize: '1.25rem', 
              marginBottom: '2rem', 
              opacity: 0.9, 
              maxWidth: '600px', 
              margin: '0 auto 2rem' 
            }}>
              Join thousands of farmers already using CropCare for smarter, more profitable, and sustainable agricultural decisions
            </p>
            
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                className="btn-lg"
                style={{
                  background: 'white',
                  color: 'var(--primary-green)',
                  border: 'none',
                  minWidth: '200px'
                }}
                onClick={() => navigate('/advisory')}
              >
                🌾 Start Advisory
              </button>
              <button 
                className="btn-lg btn-outline"
                style={{
                  background: 'transparent',
                  color: 'white',
                  border: '2px solid white',
                  minWidth: '200px'
                }}
                onClick={() => navigate('/signup')}
              >
                📱 Sign Up Free
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '3rem 0', textAlign: 'center', borderTop: '1px solid var(--gray-200)' }}>
        <div className="container">
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '700', 
              color: 'var(--primary-green)', 
              marginBottom: '0.5rem' 
            }}>
              🌾 CropCare
            </h3>
            <p style={{ color: 'var(--gray-600)' }}>
              Empowering Indian farmers with AI-powered agricultural intelligence
            </p>
          </div>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '2rem', 
            marginBottom: '1.5rem', 
            fontSize: '0.875rem', 
            color: 'var(--gray-500)',
            flexWrap: 'wrap'
          }}>
            <span>🌾 Smart Advisory</span>
            <span>🌍 9 Languages</span>
            <span>📱 Mobile First</span>
            <span>🔊 Voice Support</span>
          </div>
          
          <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>
            Built with ❤️ for sustainable farming • Available in English, Hindi, Marathi, Tamil, Telugu, Kannada, Gujarati, Punjabi, and Bengali
          </p>
        </div>
      </footer>
    </div>
  );
}