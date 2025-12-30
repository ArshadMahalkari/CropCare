import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import API from "../api";
import Navbar from "../components/Navbar";
import { useTranslation } from 'react-i18next';

export default function Advisory() {
  const { crop, setCrop, language, setLanguage } = useContext(AppContext);
  const { t } = useTranslation();
  const [soil, setSoil] = useState("Loam");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getAdvisory = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await API.post("/api/advisory", { crop, soil, language });
      setResult(response.data || null);
    } catch (err) {
      console.error("Advisory error", err);
      setResult({ advice: "Failed to fetch advisory at this time" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <main className="container" style={{ padding: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '360px 1fr', gap: 20 }}>
          <aside>
            <div className="glass" style={{ padding: 18 }}>
              <h3 style={{ marginBottom: 8 }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden style={{ marginRight: 8 }}><path d="M12 2L3 7v6c0 5 4 9 9 9s9-4 9-9V7l-9-5z" stroke="var(--primary-blue)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>{t('advisory_input')}</h3>

              <label htmlFor="crop-select" style={{ display: 'block', marginTop: 12, marginBottom: 6 }}>{t('crop_label')}</label>
              <select id="crop-select" value={crop} onChange={(e) => setCrop(e.target.value)} className="form-control" aria-label="Crop selection">
                <option>Rice</option>
                <option>Cotton</option>
                <option>Wheat</option>
                <option>Maize</option>
              </select>

              <label htmlFor="soil-select" style={{ display: 'block', marginTop: 12, marginBottom: 6 }}>{t('soil_label')}</label>
              <select id="soil-select" value={soil} onChange={(e) => setSoil(e.target.value)} className="form-control" aria-label="Soil type selection">
                <option>Loam</option>
                <option>Clay</option>
                <option>Sandy</option>
              </select>

              <label htmlFor="lang-select" style={{ display: 'block', marginTop: 12, marginBottom: 6 }}>{t('language_label')}</label>
              <select id="lang-select" value={language} onChange={(e) => setLanguage(e.target.value)} className="form-control" aria-label="Language selection">
                <option value="EN">English</option>
                <option value="HI">Hindi</option>
                <option value="MR">Marathi</option>
              </select>

              <div style={{ marginTop: 16 }}>
                <button className="btn-primary" onClick={getAdvisory} disabled={loading} aria-disabled={loading} aria-busy={loading}>{loading ? t('analyzing') : t('get_advisory')}</button>
              </div>
            </div>
          </aside>

          <section>
            <div className="glass" style={{ padding: 18, minHeight: 240 }}>
              <h3 style={{ marginBottom: 8 }}>{t('advisory_result_title')}</h3>

              {loading && <p role="status" aria-live="polite" style={{ color: 'var(--muted)' }}>{t('analyzing')}</p>}

              {!loading && !result && (
                <p style={{ color: 'var(--muted)' }}>{t('no_advisory_yet')}</p>
              )}

              {!loading && result && (
                <div>
                  <p style={{ fontWeight: 600 }}>{result.advice || (result.result && result.result.irrigation && result.result.irrigation[0])}</p>

                  {result.result && (
                    <div style={{ marginTop: 12 }}>
                      <div style={{ marginBottom: 8 }}><strong>Suitability:</strong> {result.result.suitability}</div>
                      <div style={{ marginBottom: 8 }}><strong>Irrigation:</strong> {result.result.irrigation.join(', ')}</div>
                      <div style={{ marginBottom: 8 }}><strong>Fertilizer:</strong> {result.result.fertilizer.join(', ')}</div>
                      <div style={{ marginBottom: 8 }}><strong>Precautions:</strong> {result.result.precautions.join(', ')}</div>
                      <div style={{ marginTop: 12, color: 'var(--muted)' }}><small>{result.result.explanation}</small></div>

                      <div style={{ marginTop: 12 }}>
                        <button className="btn-primary" onClick={async () => {
                          try {
                            const token = localStorage.getItem('token');
                            if (!token) {
                              alert('Please sign in to save advisories');
                              return;
                            }
                            const res = await API.post('/api/advisory/save', 
                              { input: { crop, soil, language }, result },
                              { headers: { Authorization: `Bearer ${token}` } }
                            );
                            if (res.data && res.data.success) alert('Advisory saved');
                            else alert('Failed to save advisory');
                          } catch (err) {
                            console.error('Save error', err);
                            alert('Failed to save advisory');
                          }
                        }}>Save advisory</button>
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>
          </section>
        </div>
      </main>
    </div>
  );
}