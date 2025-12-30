import { useState, useEffect, useContext } from "react";
import API from "../api";
import Navbar from "../components/Navbar";
import { AppContext } from "../context/AppContext";

export default function PestDetect() {
  const { crop } = useContext(AppContext);
  const [result, setResult] = useState("");
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
      setResult("");
    }
  };

  const analyze = async () => {
    if (!image) return;
    setScanning(true);
    setResult("Scanning...");

    try {
      // Simulate network delay for effect
      await new Promise(r => setTimeout(r, 1500));

      const res = await API.post("/api/pest-detect", {
        crop: selectedCrop,
        // image: image // In a real app, send the file or base64
      });

      if (res.data && res.data.disease && res.data.solution) {
        setResult(`${res.data.disease} - ${res.data.solution}`);
      } else {
        setResult("Analysis complete. Please consult an agricultural expert for detailed advice.");
      }
    } catch (error) {
      console.error("Pest detection error:", error);
      let errorMsg = "Could not detect pest. Please try again.";

      if (!error.response) {
        errorMsg = "Cannot connect to server. Please ensure the backend is running.";
      } else if (error.response?.data?.solution) {
        errorMsg = error.response.data.solution;
      } else if (error.response?.data?.error) {
        errorMsg = error.response.data.error;
      } else if (error.response?.data?.disease && error.response?.data?.solution) {
        // If we got a response but it's in the wrong format, try to use it
        setResult(`${error.response.data.disease} - ${error.response.data.solution}`);
        return;
      } else if (error.message) {
        errorMsg = error.message;
      }

      setResult(`Error: ${errorMsg}`);
    } finally {
      setScanning(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container" style={{ padding: 28 }}>
        <div className="card glass" style={{ maxWidth: 900, margin: '28px auto', padding: isMobile ? 18 : 28 }}>
          <h2 style={{ marginBottom: 18, fontSize: '1.8em', fontWeight: 700, color: 'var(--dark-navy)' }}>AI Pest & Disease Detection</h2>

          <div style={{ marginBottom: 18 }}>
            <label htmlFor="crop-select-pest" style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Select Crop:</label>
            <select
              id="crop-select-pest"
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="form-control"
              style={{ width: '100%', maxWidth: '300px' }}
            >
              <option value="Rice">Rice</option>
              <option value="Cotton">Cotton</option>
              <option value="Wheat">Wheat</option>
              <option value="Maize">Maize</option>
            </select>
          </div>

          <div style={{
            marginBottom: 18,
            minHeight: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(180deg, rgba(13,110,253,0.04), rgba(13,110,253,0.02))',
            borderRadius: '12px',
            border: '1px dashed rgba(13,110,253,0.08)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {image ? (
              <>
                <img src={image} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '10px' }} />
                {scanning && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom, transparent, rgba(46, 204, 113, 0.5), transparent)',
                    animation: 'scan 2s infinite linear',
                  }} />
                )}
              </>
            ) : (
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>No image selected</p>
            )}
          </div>

          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
          <label
            htmlFor="file-upload"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(90deg, var(--primary-blue), var(--secondary-blue))',
              padding: '10px 20px',
              borderRadius: '10px',
              cursor: 'pointer',
              marginBottom: '12px',
              border: 'none',
              transition: 'transform 0.2s',
              boxShadow: '0 6px 18px rgba(13,110,253,0.12)',
              color: 'white',
              fontWeight: 600
            }}
          >
            {image ? "Change Image" : "📸 Upload Photo"}
          </label>

          <br />

          <button
            onClick={analyze}
            disabled={!image || scanning}
            style={{
              background: scanning ? '#c82333' : 'linear-gradient(90deg, var(--primary-blue), var(--secondary-blue))',
              border: 'none',
              color: 'white',
              padding: '12px 28px',
              borderRadius: '10px',
              fontSize: '1em',
              fontWeight: '700',
              cursor: image ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s ease',
              boxShadow: '0 6px 20px rgba(13,110,253,0.12)'
            }}
          >
            {scanning ? "Analyzing..." : "Start Scan"}
          </button>

          {result && (
            <div style={{
              marginTop: '18px',
              padding: '16px',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.95), rgba(245,248,255,0.95))',
              color: 'var(--dark-navy)',
              borderRadius: '10px',
              boxShadow: '0 6px 18px rgba(9,30,66,0.04)'
            }}>
              <h3 style={{ color: 'var(--dark-navy)', marginBottom: '8px' }}>Analysis Result</h3>
              <p style={{ fontSize: '1.05em' }}>{result}</p>
            </div>
          )}
        </div>
        <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
      </div>
    </div>
  );
}
