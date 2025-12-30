import { useEffect, useState } from 'react';
import API from '../api';
import Navbar from '../components/Navbar';

export default function History() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const res = await API.get('/api/advisory/history');
        setList(res.data.list || []);
      } catch (err) {
        console.error('History fetch error', err);
        setList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div>
      <Navbar />
      <main className="container" style={{ padding: '20px' }}>
        <div className="card glass" style={{ padding: 18 }}>
          <h2 className="card-title">Saved Advisories</h2>
          {loading && <p>Loading...</p>}
          {!loading && list.length === 0 && <p>No saved advisories yet.</p>}
          <div style={{ display: 'grid', gap: 12, marginTop: 12 }}>
            {list.map((a) => (
              <div key={a._id} className="card glass" style={{ padding: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{a.input?.crop} — {a.input?.soil}</div>
                    <div style={{ color: 'var(--muted)' }}>{new Date(a.createdAt).toLocaleString()}</div>
                  </div>
                </div>

                <div style={{ marginTop: 10 }}>
                  <p style={{ margin: 0, fontWeight: 600 }}>{a.result?.advice}</p>
                  {a.result?.result && (
                    <div style={{ marginTop: 8 }}>
                      <div><strong>Suitability:</strong> {a.result.result.suitability}</div>
                      <div><strong>Irrigation:</strong> {a.result.result.irrigation.join(', ')}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
