import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { language } = useContext(AppContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isMobile] = useState(window.innerWidth < 768);

  return (
    <div>
      <Navbar />

      <header className="container header" style={{ flexDirection: isMobile ? 'column' : 'row' }}>
        <div className="hero main-content">
          <h1 style={{ fontSize: isMobile ? '2rem' : '2.6rem', marginBottom: 12 }}>{t('title')}</h1>
          <p style={{ color: 'var(--muted)', marginBottom: 18, fontSize: '1.05rem' }}>{t('subtitle')}</p>

          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn-primary" onClick={() => navigate('/advisory')}>{t('get_advisory')}</button>
            <a href="#learn" style={{ alignSelf: 'center', padding: '8px 12px', borderRadius: 10, background: 'transparent', color: 'var(--primary-blue)', border: '1px solid var(--glass-border)', textDecoration: 'none' }}>{t('learn_more')}</a>
          </div>
        </div>

        <div className="sidebar" style={{ width: isMobile ? '100%' : '360px', padding: '20px' }}>
          <div className="card" style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <svg className="hero-illustration" width="68" height="68" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <rect x="2" y="28" width="60" height="32" rx="4" fill="var(--primary-blue)" opacity="0.12" />
                <path d="M10 28c0-6 8-12 22-12s22 6 22 12" stroke="var(--primary-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="32" cy="18" r="3" fill="var(--primary-blue)" />
              </svg>
              <div>
                <h3 style={{ margin: 0 }}>{t('why_title')}</h3>
                <p className="muted" style={{ margin: 0 }}>{t('subtitle')}</p>
              </div>
            </div>

            <ul style={{ color: 'var(--muted)', paddingLeft: 18, margin: 0 }}>
              {t('why_points', { returnObjects: true }).map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>
        </div>
      </header>

      <main id="learn" className="container" style={{ padding: '20px' }}>
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: 16 }}>
          <div className="glass" style={{ padding: 18 }}>
            <h4>Accessible design</h4>
            <p style={{ color: 'var(--muted)' }}>Large typography, simple language, and a clear flow for low-literacy users.</p>
          </div>
          <div className="glass" style={{ padding: 18 }}>
            <h4>Offline-friendly</h4>
            <p style={{ color: 'var(--muted)' }}>PWA caching and background sync to support intermittent connectivity.</p>
          </div>
          <div className="glass" style={{ padding: 18 }}>
            <h4>Scalable & modular</h4>
            <p style={{ color: 'var(--muted)' }}>Microservices-friendly architecture that allows incremental AI upgrades.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
