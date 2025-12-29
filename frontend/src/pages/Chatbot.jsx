import { useState, useContext } from "react";
import API from "../api";
import { AppContext } from "../context/AppContext";

export default function Chatbot() {
  const { language } = useContext(AppContext);
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("");

  const sendMsg = async () => {
    const res = await API.post("/api/chat", {
      message: msg,
      language,
    });
    setReply(res.data.reply);
  };

  return (
    <div>
      <h2>Chat Advisor</h2>

      <input value={msg} onChange={(e) => setMsg(e.target.value)} />
      <button onClick={sendMsg}>Send</button>

      <p>{reply}</p>
    </div>
  );
}
