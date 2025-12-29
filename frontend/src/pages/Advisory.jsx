import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import API from "../api";

export default function Advisory() {
  const { crop, language } = useContext(AppContext);
  const [soil, setSoil] = useState("Clay");
  const [result, setResult] = useState("");

  const getAdvisory = async () => {
    const res = await API.post("/api/advisory", {
      crop,
      soil,
      language,
    });
    setResult(res.data.advice);
  };

  return (
    <div>
      <h2>{crop} Advisory</h2>

      <select value={soil} onChange={(e) => setSoil(e.target.value)}>
        <option>Clay</option>
        <option>Loam</option>
        <option>Sandy</option>
      </select>

      <button onClick={getAdvisory}>Get Advisory</button>

      <p>{result}</p>
    </div>
  );
}
