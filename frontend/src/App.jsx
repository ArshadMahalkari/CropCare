import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Advisory from "./pages/Advisory";
import PestDetect from "./pages/PestDetect";
import Chatbot from "./pages/Chatbot";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import History from "./pages/History";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/advisory" element={<Advisory />} />
        <Route path="/pest" element={<PestDetect />} />
        <Route path="/chat" element={<Chatbot />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/history" 
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}
