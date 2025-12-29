import { useState } from "react";
import API from "../api";

export default function PestDetect() {
  const [result, setResult] = useState("");

  const analyze = async () => {
  const res = await API.post("/api/pest-detect", {
    crop: "Rice", // later replace with selected crop
  });
  setResult(`${res.data.disease} - ${res.data.solution}`);
};


  return (
    <div>
      <h2>Pest Detection</h2>

      <button onClick={analyze}>Analyze</button>

      <p>{result}</p>
    </div>
  );
}
