import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Advisory from "./pages/Advisory";
import PestDetect from "./pages/PestDetect";
import Chatbot from "./pages/Chatbot";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/advisory" element={<Advisory />} />
        <Route path="/pest" element={<PestDetect />} />
        <Route path="/chat" element={<Chatbot />} />
      </Routes>
    </BrowserRouter>
  );
}
