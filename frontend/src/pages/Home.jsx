import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { crop, setCrop, language, setLanguage } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div>
      <h1>Smart Crop Advisory</h1>

      <label>Crop</label>
      <select value={crop} onChange={(e) => setCrop(e.target.value)}>
        <option>Rice</option>
        <option>Cotton</option>
      </select>

      <label>Language</label>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="EN">English</option>
        <option value="MR">Marathi</option>
        <option value="HI">Hindi</option>
      </select>

      <button onClick={() => navigate("/advisory")}>
        Proceed
      </button>
    </div>
  );
}
