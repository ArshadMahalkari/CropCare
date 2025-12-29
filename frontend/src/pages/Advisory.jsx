import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import API from "../api";

export default function Advisory() {
  const { crop, language } = useContext(AppContext);
  const [soil, setSoil] = useState("Clay");
  const [result, setResult] = useState("Click the button to get advisory");
  const [loading, setLoading] = useState(false);

  const getAdvisory = async () => {
    setLoading(true);
    setResult("");

    try {
      const response = await API.post("/api/advisory", {
        crop,
        soil,
        language,
      });

      console.log("Frontend response:", response.data);

      setResult(response.data.advice);
    } catch (error) {
      console.error("Frontend error:", error);
      setResult("Failed to fetch advisory");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{crop} Advisory</h2>

      <label>Soil Type</label>
      <br />
      <select value={soil} onChange={(e) => setSoil(e.target.value)}>
        <option value="Clay">Clay</option>
        <option value="Loam">Loam</option>
        <option value="Sandy">Sandy</option>
      </select>

      <br /><br />

      <button onClick={getAdvisory} disabled={loading}>
        {loading ? "Fetching..." : "Get Advisory"}
      </button>

      <div
        style={{
          marginTop: "20px",
          padding: "12px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          minHeight: "60px",
          background: "#f9f9f9",
        }}
      >
        {result}
      </div>
    </div>
  );
}
