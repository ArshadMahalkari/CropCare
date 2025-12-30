import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import Navbar from "../components/Navbar";
import { AppContext } from "../context/AppContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AppContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await API.post("/api/auth/login", { email, password });
      if (res.data.token && res.data.user) {
        login(res.data.token, res.data.user);
        navigate("/");
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.error || err.response?.data?.errors?.[0]?.msg || err.response?.data?.message || "Login failed. Please check your credentials.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container" style={{ padding: '40px 20px', display: 'flex', justifyContent: 'center' }}>
        <div className="glass" style={{ padding: 30, maxWidth: 400, width: '100%' }}>
          <h2 style={{ marginBottom: 20, textAlign: 'center' }}>Login</h2>
          {error && (
            <div style={{ 
              padding: '10px', 
              marginBottom: '15px', 
              background: '#fee', 
              color: '#c33', 
              borderRadius: '6px',
              border: '1px solid #fcc'
            }}>
              {error}
            </div>
          )}
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 15 }}>
              <label style={{ display: 'block', marginBottom: 5 }}>Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: '100%' }}
                disabled={loading}
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', marginBottom: 5 }}>Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%' }}
                disabled={loading}
              />
            </div>
            <button className="btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p style={{ marginTop: 15, textAlign: 'center' }}>
            Don't have an account? <Link to="/signup" style={{ color: 'var(--primary-blue)' }}>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}