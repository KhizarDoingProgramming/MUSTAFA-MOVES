"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Sparkles,
  Bot,
  User,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { FloatingAIButton } from "@/components/layout/FloatingAIButton";
import { cn } from "@/lib/utils";
import { getGroqResponse } from "@/lib/groq";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const initialMessages = [
  {
    id: "1",
    role: "assistant" as const,
    content:
      "Hey! I'm Mstfa, your AI fitness coach. Tell me about your goals — whether it's building muscle, losing fat, getting stronger, or just staying fit. I'm here to help!",
    timestamp: new Date(),
  },
];

const suggestions = [
  "Build muscle plan",
  "Lose fat fast",
  "Beginner tips",
  "Nutrition advice",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const chatMessages = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await getGroqResponse(chatMessages);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const fallback: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "My bad, I hit a glitch. Can you try asking me again?",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, fallback]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] flex flex-col">
      <Navbar />
      <FloatingAIButton />
      <main className="flex flex-col h-screen">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]/50 backdrop-blur-md px-6 py-4 flex items-center gap-4 flex-shrink-0"
        >
          <Link href="/" className="md:hidden">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="w-10 h-10 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-semibold font-[family-name:var(--font-space)]">
              Mstfa AI
            </h1>
            <p className="text-xs text-[var(--color-success)] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse" />
              Online
            </p>
          </div>
        </motion.header>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className={cn(
                  "flex gap-3 max-w-3xl",
                  message.role === "user" ? "ml-auto flex-row-reverse" : ""
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0",
                    message.role === "assistant"
                      ? "bg-[var(--color-accent)]/10"
                      : "bg-[var(--color-bg-tertiary)]"
                  )}
                >
                  {message.role === "assistant" ? (
                    <Sparkles className="w-4 h-4 text-white" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </div>
                <div
                  className={cn(
                    "rounded-2xl px-4 py-3 max-w-[80%]",
                    message.role === "assistant"
                      ? "bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-tl-sm"
                      : "bg-[var(--color-accent)] text-white rounded-tr-sm"
                  )}
                >
                  <div className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </div>
                  <p className="text-[10px] mt-1 opacity-50">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex gap-3 max-w-3xl"
              >
                <div className="w-8 h-8 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1">
                    {[0, 0.2, 0.4].map((delay) => (
                      <motion.div
                        key={delay}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay,
                        }}
                        className="w-2 h-2 rounded-full bg-[var(--color-text-tertiary)]"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {messages.length <= 1 && (
          <div className="px-6 pb-4 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <motion.button
                key={s}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setInput(s)}
                className="px-4 py-2 rounded-full glass text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors font-[family-name:var(--font-sora)]"
              >
                {s}
              </motion.button>
            ))}
          </div>
        )}

        <div className="px-6 pb-6 pt-2 flex-shrink-0">
          <div className="glass rounded-2xl p-2 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask Mstfa anything about fitness..."
              className="flex-1 px-4 py-3 bg-transparent text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none text-sm"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              disabled={!input.trim()}
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                input.trim()
                  ? "bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/20"
                  : "bg-[var(--color-bg-tertiary)] text-[var(--color-text-tertiary)]"
              )}
            >
              <Send className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </main>
    </div>
  );
}
