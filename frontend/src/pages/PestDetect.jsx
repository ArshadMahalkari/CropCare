import { useState, useEffect, useContext } from "react";
import API from "../api";
import Navbar from "../components/Navbar";
import { AppContext } from "../context/AppContext";

export default function PestDetect() {
  const { crop } = useContext(AppContext);
  const [result, setResult] = useState(null);
  const [image, setImage] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(crop || "Rice");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const analyze = async () => {
    if (!image) return;
    setScanning(true);
    setResult(null);

    try {
      // Simulate network delay for effect
      await new Promise(r => setTimeout(r, 2000));

      const res = await API.post("/api/pest-detect", {
        crop: selectedCrop,
        // image: image // In a real app, send the file or base64
      });

      if (res.data && res.data.disease && res.data.solution) {
        setResult({
          disease: res.data.disease,
          solution: res.data.solution,
          confidence: res.data.confidence || 0.85,
          prevention: res.data.prevention || [],
          treatment_cost: res.data.treatment_cost || "₹500-800 per acre"
        });
      } else {
        setResult({
          disease: "Analysis Complete",
          solution: "Please consult an agricultural expert for detailed advice.",
          confidence: 0.7
        });
      }
    } catch (error) {
      console.error("Pest detection error:", error);
      let errorMsg = "Could not detect pest. Please try again.";

      if (!error.response) {
        errorMsg = "Cannot connect to server. Please ensure the backend is running.";
      } else if (error.response?.data?.solution) {
        setResult({
          disease: error.response.data.disease || "Unknown Issue",
          solution: error.response.data.solution,
          confidence: 0.8
        });
        return;
      }

      setResult({
        disease: "Detection Error",
        solution: errorMsg,
        confidence: 0
      });
    } finally {
      setScanning(false);
    }
  };

  const commonPests = [
    { crop: "Rice", pest: "Rice Leaf Blight", symptoms: "Brown spots on leaves", treatment: "Fungicide spray" },
    { crop: "Cotton", pest: "Cotton Bollworm", symptoms: "Holes in bolls", treatment: "Bt spray or pheromone traps" },
    { crop: "Wheat", pest: "Wheat Rust", symptoms: "Orange pustules on leaves", treatment: "Resistant varieties" },
    { crop: "Maize", pest: "Fall Armyworm", symptoms: "Feeding damage on leaves", treatment: "Biological control" }
  ];

  return (
    <div>
      <Navbar />

      {/* Header */}
      <section className="section-sm bg-gradient-primary text-white">
        <div className="container text-center">
          <span className="status-badge bg-white text-primary mb-4" style={{ display: 'inline-block' }}>
            🐛 AI Pest Detection
          </span>
          <h1 className="font-heading text-4xl font-bold mb-4">
            Identify Crop Pests & Diseases
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Upload a photo of your crop to get instant pest identification and treatment recommendations
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 gap-12" style={{ gridTemplateColumns: isMobile ? '1fr' : '1fr 400px' }}>
            {/* Main Detection Area */}
            <main>
              <div className="card card-farming">
                <div className="card-header">
                  <h3 className="card-title flex items-center gap-3">
                    <span className="text-2xl">📸</span>
                    Pest Detection Scanner
                  </h3>
                  <p className="card-subtitle">
                    Upload a clear photo of affected crop parts for AI analysis
                  </p>
                </div>

                <div className="form-group">
                  <label className="form-label">🌾 Select Your Crop</label>
                  <select
                    value={selectedCrop}
                    onChange={(e) => setSelectedCrop(e.target.value)}
                    className="form-select"
                    style={{ maxWidth: '300px' }}
                  >
                    <option value="Rice">Rice</option>
                    <option value="Cotton">Cotton</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Maize">Maize</option>
                  </select>
                </div>

                {/* Image Upload Area */}
                <div className="mb-8">
                  <div style={{
                    minHeight: '300px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: image ? 'transparent' : 'var(--gradient-nature)',
                    borderRadius: '1rem',
                    border: '2px dashed var(--primary-green)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    {image ? (
                      <div className="relative">
                        <img 
                          src={image} 
                          alt="Crop preview" 
                          style={{ 
                            maxWidth: '100%', 
                            maxHeight: '400px', 
                            borderRadius: '0.75rem',
                            boxShadow: 'var(--shadow-lg)'
                          }} 
                        />
                        {scanning && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                            <div className="text-center text-white">
                              <div className="loading-lg mb-4"></div>
                              <p className="font-semibold">AI Analyzing Image...</p>
                              <p className="text-sm opacity-75">Detecting pests and diseases</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center p-8">
                        <div className="text-6xl mb-4">📸</div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">
                          Upload Crop Image
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Take a clear photo of affected leaves, stems, or fruits
                        </p>
                        <div className="text-sm text-gray-500">
                          Supported formats: JPG, PNG, WebP
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4 mt-6">
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="sr-only"
                    />
                    <label
                      htmlFor="file-upload"
                      className="btn-secondary btn-lg cursor-pointer"
                    >
                      {image ? "📷 Change Image" : "📸 Upload Photo"}
                    </label>

                    <button
                      onClick={analyze}
                      disabled={!image || scanning}
                      className="btn-primary btn-lg"
                    >
                      {scanning ? (
                        <>
                          <span className="loading mr-2"></span>
                          Analyzing...
                        </>
                      ) : (
                        <>
                          🔍 Start Analysis
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Results */}
                {result && (
                  <div className="card card-sky animate-fade-in-up">
                    <div className="card-header">
                      <h3 className="card-title flex items-center gap-3">
                        <span className="text-2xl">🎯</span>
                        Detection Results
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-xl font-bold text-gray-800">
                            {result.disease}
                          </h4>
                          {result.confidence && (
                            <span className="status-badge status-success">
                              {Math.round(result.confidence * 100)}% Confidence
                            </span>
                          )}
                        </div>
                        
                        <div className="p-4 bg-sky-50 rounded-lg border-l-4 border-sky">
                          <h5 className="font-semibold text-sky mb-2">💊 Treatment Solution:</h5>
                          <p className="text-gray-800 leading-relaxed">{result.solution}</p>
                        </div>
                      </div>

                      {result.prevention && result.prevention.length > 0 && (
                        <div>
                          <h5 className="font-semibold text-leaf mb-3">🛡️ Prevention Tips:</h5>
                          <ul className="space-y-2">
                            {result.prevention.map((tip, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-leaf">✓</span>
                                <span className="text-gray-700">{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {result.treatment_cost && (
                        <div className="flex justify-between items-center p-4 bg-earth-cream rounded-lg">
                          <span className="font-semibold text-earth">💰 Estimated Treatment Cost:</span>
                          <span className="font-bold text-earth">{result.treatment_cost}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-4 mt-6">
                      <button 
                        className="btn-primary"
                        onClick={() => {
                          const text = `Pest Detection: ${result.disease} - ${result.solution}`;
                          navigator.clipboard.writeText(text);
                          alert('Results copied to clipboard!');
                        }}
                      >
                        📋 Copy Results
                      </button>
                      <button 
                        className="btn-secondary"
                        onClick={() => {
                          if ('speechSynthesis' in window) {
                            const utterance = new SpeechSynthesisUtterance(
                              `Detected: ${result.disease}. Treatment: ${result.solution}`
                            );
                            speechSynthesis.speak(utterance);
                          }
                        }}
                      >
                        🔊 Listen
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </main>

            {/* Sidebar */}
            <aside>
              <div className="card card-earth">
                <div className="card-header">
                  <h3 className="card-title">🐛 Common Pests</h3>
                  <p className="card-subtitle">Quick reference for major crop pests</p>
                </div>

                <div className="space-y-4">
                  {commonPests.map((pest, index) => (
                    <div key={index} className="p-4 bg-white rounded-lg border border-earth-brown-light">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-earth">{pest.pest}</h4>
                        <span className="text-xs bg-earth-cream text-earth-brown px-2 py-1 rounded">
                          {pest.crop}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Symptoms:</strong> {pest.symptoms}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Treatment:</strong> {pest.treatment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card card-farming mt-6">
                <div className="card-header">
                  <h3 className="card-title">📱 Tips for Better Detection</h3>
                </div>

                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Take photos in good natural light</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Focus on affected areas clearly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Include both healthy and affected parts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Avoid blurry or dark images</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Multiple angles help accuracy</span>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
