import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import API from "../api";
import Navbar from "../components/Navbar";
import { useTranslation } from 'react-i18next';

export default function Advisory() {
  const { crop, setCrop, language, setLanguage } = useContext(AppContext);
  const { t } = useTranslation();
  const [soil, setSoil] = useState("Loam");
  const [location, setLocation] = useState("");
  const [season, setSeason] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedMode, setSelectedMode] = useState("balanced");
  const [weather, setWeather] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Get user's location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
        },
        (error) => {
          console.error("Location error:", error);
          alert("Unable to get location. Please enter manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const getAdvisory = async () => {
    setLoading(true);
    setResult(null);
    setWeather(null);

    try {
      const response = await API.post("/api/advisory", { 
        crop, 
        soil, 
        location,
        season,
        mode: 'all', // Get all three modes
        language 
      });
      
      const data = response.data || {};
      setResult(data);
      
      if (data.weather) {
        setWeather(data.weather);
      }
    } catch (err) {
      console.error("Advisory error", err);
      setResult({ 
        error: "Failed to fetch advisory at this time",
        economical: {
          mode: "Economical",
          icon: "💰",
          focus: "Cost minimization",
          what_to_do: ["Use basic fertilizers", "Optimize water usage"],
          why_advice: "Fallback advisory due to service unavailability"
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const saveAdvisory = async (mode) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please sign in to save advisories');
        return;
      }
      
      const advisoryToSave = result[mode];
      const res = await API.post('/api/advisory/save', 
        { 
          input: { crop, soil, location, season, mode, language }, 
          result: advisoryToSave 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (res.data && res.data.success) {
        alert(`${mode} advisory saved successfully!`);
      } else {
        alert('Failed to save advisory');
      }
    } catch (err) {
      console.error('Save error', err);
      alert('Failed to save advisory');
    }
  };

  const speakAdvisory = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'HI' ? 'hi-IN' : language === 'MR' ? 'mr-IN' : 'en-US';
      speechSynthesis.speak(utterance);
    } else {
      alert('Speech synthesis not supported in this browser');
    }
  };

  const AdvisoryModeCard = ({ mode, data, isSelected, onSelect }) => {
    if (!data) return null;

    const getModeColor = (mode) => {
      switch (mode) {
        case 'economical': return 'var(--sun-orange)';
        case 'environment': return 'var(--leaf-green)';
        case 'balanced': return 'var(--sky-blue)';
        default: return 'var(--primary-green)';
      }
    };

    const getModeGradient = (mode) => {
      switch (mode) {
        case 'economical': return 'var(--gradient-earth)';
        case 'environment': return 'var(--gradient-primary)';
        case 'balanced': return 'var(--gradient-sky)';
        default: return 'var(--gradient-primary)';
      }
    };

    return (
      <div 
        className={`card advisory-mode-card ${mode} ${isSelected ? 'selected' : ''} animate-fade-in-scale`}
        style={{
          border: `3px solid ${isSelected ? getModeColor(mode) : 'transparent'}`,
          cursor: 'pointer',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isSelected ? 'translateY(-4px)' : 'none'
        }}
        onClick={() => onSelect(mode)}
      >
        <div className="card-header">
          <div className="flex items-center gap-4 mb-4">
            <div 
              className="flex items-center justify-center"
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: getModeGradient(mode),
                fontSize: '1.5rem'
              }}
            >
              {data.icon}
            </div>
            <div>
              <h3 className="card-title" style={{ color: getModeColor(mode), marginBottom: '0.5rem' }}>
                {data.mode}
              </h3>
              <p className="card-subtitle">{data.focus}</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-3">🎯 Key Benefits:</h4>
          <ul className="space-y-2">
            {data.what_to_do?.slice(0, 2).map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <span style={{ color: getModeColor(mode) }}>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 gap-3 mb-6">
          {data.cost_implication && (
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">💰 Cost:</span>
              <span className="text-sm font-semibold" style={{ color: getModeColor(mode) }}>
                {data.cost_implication}
              </span>
            </div>
          )}
          {data.yield_expectation && (
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">🌾 Yield:</span>
              <span className="text-sm font-semibold" style={{ color: getModeColor(mode) }}>
                {data.yield_expectation}
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button 
            className="btn-sm flex-1"
            style={{ 
              background: getModeGradient(mode), 
              color: 'white', 
              border: 'none'
            }}
            onClick={(e) => {
              e.stopPropagation();
              saveAdvisory(mode);
            }}
          >
            💾 Save
          </button>
          <button 
            className="btn-sm btn-outline flex-1"
            style={{ 
              borderColor: getModeColor(mode),
              color: getModeColor(mode)
            }}
            onClick={(e) => {
              e.stopPropagation();
              speakAdvisory(data.why_advice || data.focus);
            }}
          >
            🔊 Listen
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Navbar />

      {/* Header */}
      <section className="section-sm bg-gradient-primary text-white">
        <div className="container text-center">
          <span className="status-badge bg-white text-primary mb-4" style={{ display: 'inline-block' }}>
            🌾 Smart Farming Advisory
          </span>
          <h1 className="font-heading text-4xl font-bold mb-4">
            Get Personalized Crop Advisory
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Choose from three intelligent farming approaches: save money, protect environment, or find the perfect balance
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: window.innerWidth >= 768 ? '400px 1fr' : '1fr',
            gap: '3rem',
            alignItems: 'start'
          }}>
            {/* Input Panel */}
            <aside>
              <div className="card card-farming">
                <div className="card-header">
                  <h3 className="card-title flex items-center gap-3">
                    <span className="text-2xl">🌾</span>
                    Farm Details
                  </h3>
                  <p className="card-subtitle">
                    Tell us about your crop and farming conditions
                  </p>
                </div>

                <div className="form-group">
                  <label className="form-label">🌾 Select Your Crop</label>
                  <select 
                    value={crop} 
                    onChange={(e) => setCrop(e.target.value)} 
                    className="form-select"
                  >
                    <option>Rice</option>
                    <option>Cotton</option>
                    <option>Wheat</option>
                    <option>Maize</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">🏞️ Soil Type</label>
                  <select 
                    value={soil} 
                    onChange={(e) => setSoil(e.target.value)} 
                    className="form-select"
                  >
                    <option>Loam</option>
                    <option>Clay</option>
                    <option>Sandy</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">📍 Location (Optional)</label>
                  <div className="flex gap-3">
                    <input 
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Enter your location"
                      className="form-input flex-1"
                    />
                    <button 
                      onClick={getCurrentLocation}
                      className="btn-secondary btn-icon"
                      title="Get GPS Location"
                    >
                      📍
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">🌦️ Season (Optional)</label>
                  <select 
                    value={season} 
                    onChange={(e) => setSeason(e.target.value)} 
                    className="form-select"
                  >
                    <option value="">Select Season</option>
                    <option>Kharif</option>
                    <option>Rabi</option>
                    <option>Zaid</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">🌐 Language</label>
                  <select 
                    value={language} 
                    onChange={(e) => setLanguage(e.target.value)} 
                    className="form-select"
                  >
                    <option value="EN">English</option>
                    <option value="HI">Hindi</option>
                    <option value="MR">Marathi</option>
                  </select>
                </div>

                <button 
                  className="btn-primary btn-lg" 
                  onClick={getAdvisory} 
                  disabled={loading}
                  style={{ width: '100%' }}
                >
                  {loading ? (
                    <>
                      <span className="loading"></span>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      🤖 Get Smart Advisory
                    </>
                  )}
                </button>
              </div>

              {/* Weather Widget */}
              {weather && (
                <div className="card card-sky mt-6">
                  <div className="card-header">
                    <h4 className="card-title flex items-center gap-2">
                      🌤️ Weather Context
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Temperature:</span>
                      <div className="font-semibold text-sky">{weather.temperature}</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Humidity:</span>
                      <div className="font-semibold text-sky">{weather.humidity}</div>
                    </div>
                    <div className="col-span-2">
                      <span className="font-medium text-gray-700">Forecast:</span>
                      <div className="font-semibold text-sky">{weather.rainfall_forecast}</div>
                    </div>
                  </div>
                </div>
              )}
            </aside>

            {/* Results Panel */}
            <main>
              {loading && (
                <div className="card text-center py-12">
                  <div className="loading-lg mx-auto mb-6"></div>
                  <h3 className="text-xl font-semibold mb-2">Analyzing Your Farm Data</h3>
                  <p className="text-gray-600">Our AI is processing your crop, soil, and weather conditions...</p>
                </div>
              )}

              {!loading && !result && (
                <div className="card card-farming text-center py-12">
                  <div className="text-6xl mb-6">🌾</div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                    Ready to Get Smart Advisory?
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Fill in your crop and soil details, then click "Get Smart Advisory" to see personalized recommendations in three different approaches.
                  </p>
                  <div className="flex justify-center gap-4 text-sm text-gray-500">
                    <span>💰 Economical</span>
                    <span>🌱 Environment-friendly</span>
                    <span>⚖️ Balanced</span>
                  </div>
                </div>
              )}

              {!loading && result && (result.economical || result.environment || result.balanced) && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <span className="status-badge status-success mb-4" style={{ display: 'inline-block' }}>
                      ✨ Three Smart Approaches
                    </span>
                    <h2 className="font-heading text-3xl font-bold mb-4 text-gray-900">
                      Choose Your Farming Strategy
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      Our AI has analyzed your {crop} cultivation in {soil} soil and generated three personalized approaches. Select the one that best fits your goals.
                    </p>
                  </div>
                  
                  {/* Three Advisory Mode Cards */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {result.economical && (
                      <AdvisoryModeCard 
                        mode="economical"
                        data={result.economical}
                        isSelected={selectedMode === 'economical'}
                        onSelect={setSelectedMode}
                      />
                    )}
                    {result.environment && (
                      <AdvisoryModeCard 
                        mode="environment"
                        data={result.environment}
                        isSelected={selectedMode === 'environment'}
                        onSelect={setSelectedMode}
                      />
                    )}
                    {result.balanced && (
                      <AdvisoryModeCard 
                        mode="balanced"
                        data={result.balanced}
                        isSelected={selectedMode === 'balanced'}
                        onSelect={setSelectedMode}
                      />
                    )}
                  </div>

                  {/* Detailed View of Selected Mode */}
                  {selectedMode && result[selectedMode] && (
                    <div className="card card-farming animate-fade-in-up">
                      <div className="card-header">
                        <h3 className="card-title flex items-center gap-3">
                          <span className="text-2xl">{result[selectedMode].icon}</span>
                          Detailed {result[selectedMode].mode} Advisory
                        </h3>
                        <p className="card-subtitle">
                          Complete step-by-step guidance for your {crop} cultivation
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-8">
                        <div>
                          <h4 className="font-semibold text-primary mb-4 flex items-center gap-2">
                            📋 What to do:
                          </h4>
                          <ul className="space-y-3">
                            {result[selectedMode].what_to_do?.map((item, index) => (
                              <li key={index} className="flex items-start gap-3 p-3 bg-primary-50 rounded-lg">
                                <span className="text-primary font-bold">{index + 1}.</span>
                                <span className="text-gray-800">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {result[selectedMode].when_to_do && (
                          <div>
                            <h4 className="font-semibold text-leaf mb-4 flex items-center gap-2">
                              ⏰ When to do:
                            </h4>
                            <ul className="space-y-3">
                              {result[selectedMode].when_to_do.map((item, index) => (
                                <li key={index} className="flex items-start gap-3 p-3 bg-primary-50 rounded-lg">
                                  <span className="text-leaf font-bold">⏰</span>
                                  <span className="text-gray-800">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div>
                          <h4 className="font-semibold text-sky mb-4 flex items-center gap-2">
                            💡 Why this advice:
                          </h4>
                          <div className="p-6 bg-sky-50 rounded-xl border-l-4 border-sky">
                            <p className="text-gray-800 leading-relaxed">
                              {result[selectedMode].why_advice}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          {result[selectedMode].cost_implication && (
                            <div className="flex justify-between items-center p-4 bg-earth-cream rounded-lg">
                              <span className="font-semibold text-earth">💰 Investment Required:</span>
                              <span className="font-bold text-earth">{result[selectedMode].cost_implication}</span>
                            </div>
                          )}
                          {result[selectedMode].yield_expectation && (
                            <div className="flex justify-between items-center p-4 bg-primary-100 rounded-lg">
                              <span className="font-semibold text-primary">🌾 Expected Yield:</span>
                              <span className="font-bold text-primary">{result[selectedMode].yield_expectation}</span>
                            </div>
                          )}
                          {result[selectedMode].risk_level && (
                            <div className="flex justify-between items-center p-4 bg-sky-100 rounded-lg">
                              <span className="font-semibold text-sky">⚠️ Risk Level:</span>
                              <span className="font-bold text-sky">{result[selectedMode].risk_level}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-4 mt-8" style={{ flexWrap: 'wrap' }}>
                        <button 
                          className="btn-primary btn-lg"
                          onClick={() => saveAdvisory(selectedMode)}
                        >
                          💾 Save This Advisory
                        </button>
                        <button 
                          className="btn-secondary btn-lg"
                          onClick={() => speakAdvisory(result[selectedMode].why_advice)}
                        >
                          🔊 Listen to Explanation
                        </button>
                        <button 
                          className="btn-outline btn-lg"
                          onClick={() => {
                            const text = `${result[selectedMode].mode} Advisory: ${result[selectedMode].what_to_do?.join('. ')}`;
                            navigator.clipboard.writeText(text);
                            alert('Advisory copied to clipboard!');
                          }}
                        >
                          📋 Copy Advisory
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Legacy support for old format */}
              {!loading && result && result.advice && !result.economical && (
                <div className="card card-farming">
                  <div className="card-header">
                    <h3 className="card-title">Advisory Result</h3>
                  </div>
                  <p className="font-semibold mb-6 text-lg">{result.advice}</p>
                  
                  {result.result && (
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex justify-between">
                        <span className="font-medium">Suitability:</span>
                        <span className="font-semibold">{result.result.suitability}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Irrigation:</span>
                        <span className="font-semibold">{result.result.irrigation?.join(', ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Fertilizer:</span>
                        <span className="font-semibold">{result.result.fertilizer?.join(', ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Precautions:</span>
                        <span className="font-semibold">{result.result.precautions?.join(', ')}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}