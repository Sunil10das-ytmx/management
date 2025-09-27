import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

const ChatSection = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! I'm your Smart Farm Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    // Mock bot reply (you can replace this with API call later)
    setTimeout(() => {
      const botMessage = {
        sender: "bot",
        text: "🤖 I'm still learning, but soon I'll give you smart farming answers!"
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);

    setInput("");
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto mt-16 bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl border border-gray-200 overflow-hidden flex flex-col h-[600px]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4 font-bold text-lg shadow">
        Smart Farm Chat
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-xs shadow-md ${
                msg.sender === "user"
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-br-none"
                  : "bg-gray-100 text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="flex items-center border-t border-gray-200 p-4 bg-white">
        <input
          type="text"
          className="flex-1 px-4 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-3"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <motion.button
          onClick={handleSend}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white shadow-lg"
        >
          <Send className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ChatSection;
