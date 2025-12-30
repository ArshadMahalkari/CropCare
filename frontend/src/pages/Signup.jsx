import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import Navbar from "../components/Navbar";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await API.post("/api/auth/signup", { name, email, password });
      if (res.data.token) {
        alert("Signup successful! Please login.");
        navigate("/login");
      } else {
        setError("Signup completed but no token received. Please login.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      let errorMsg = "Signup failed. Please try again.";

      if (!err.response) {
        errorMsg = "Cannot connect to server. Please ensure the backend is running on http://localhost:5000";
      } else if (err.response?.data?.error) {
        errorMsg = err.response.data.error;
      } else if (err.response?.data?.errors && err.response.data.errors.length > 0) {
        errorMsg = err.response.data.errors[0].msg || err.response.data.errors[0].message || "Validation error";
      } else if (err.response?.data?.message) {
        errorMsg = err.response.data.message;
      } else if (err.response?.status === 503) {
        errorMsg = "Database not available. Please ensure MongoDB is running.";
      } else if (err.response?.status === 500) {
        errorMsg = "Server error. Please try again later.";
      } else if (err.message) {
        errorMsg = err.message;
      }

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
          <h2 style={{ marginBottom: 20, textAlign: 'center' }}>Sign Up</h2>
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
          <form onSubmit={handleSignup}>
            <div style={{ marginBottom: 15 }}>
              <label style={{ display: 'block', marginBottom: 5 }}>Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ width: '100%' }}
                disabled={loading}
              />
            </div>
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
              <label style={{ display: 'block', marginBottom: 5 }}>Password (min 6 characters)</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                style={{ width: '100%' }}
                disabled={loading}
              />
            </div>
            <button className="btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
          <p style={{ marginTop: 15, textAlign: 'center' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--primary-blue)' }}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}