"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function FloatingAIButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  const quickActions = [
    { label: "Generate Workout", href: "/workout-generator" },
    { label: "Chat with Mstfa", href: "/chat" },
    { label: "Browse Exercises", href: "/exercise-library" },
  ];

  return (
    <>
      {/* Robot AI Assistant Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 300, damping: 20 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-2xl bg-[var(--color-accent)] text-[#0d0d0d] shadow-lg shadow-[var(--color-accent)]/30 flex items-center justify-center hover:bg-[var(--color-accent-hover)] transition-all duration-300 hover:scale-105"
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0, scale: isOpen ? 0.9 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Bot className="w-7 h-7" />
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-2xl bg-[var(--color-accent)]/40"
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[55]"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed bottom-24 right-6 z-[60] w-80 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-[var(--radius-xl)] overflow-hidden shadow-2xl"
            >
              {/* Header */}
              <div className="p-4 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-hover)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[var(--radius-md)] bg-black/10 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-[#0d0d0d]" />
                  </div>
                  <div>
                    <p className="text-[#0d0d0d] font-[600] text-sm">Mstfa AI</p>
                    <p className="text-[#0d0d0d]/60 text-xs">Your fitness coach</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-3 space-y-1">
                {quickActions.map((action) => (
                  <Link key={action.label} href={action.href} onClick={() => setIsOpen(false)}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] hover:bg-[var(--color-bg-tertiary)]/50 transition-colors cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-[var(--radius-sm)] bg-[var(--color-accent-soft)] flex items-center justify-center">
                        <Bot className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                      </div>
                      <span className="text-sm text-[var(--color-text-primary)]">{action.label}</span>
                    </motion.div>
                  </Link>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-3 border-t border-[var(--color-border)]">
                <div className="flex items-center gap-2 bg-[var(--color-bg-tertiary)] rounded-[var(--radius-md)] px-3 py-2.5">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask Mstfa..."
                    className="flex-1 bg-transparent text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && input.trim()) {
                        window.location.href = `/chat?q=${encodeURIComponent(input)}`;
                      }
                    }}
                  />
                  <Link
                    href={`/chat?q=${encodeURIComponent(input)}`}
                    className={cn(
                      "w-7 h-7 rounded-[var(--radius-sm)] flex items-center justify-center transition-colors flex-shrink-0",
                      input.trim()
                        ? "bg-[var(--color-accent)] text-[#0d0d0d]"
                        : "bg-[var(--color-bg-tertiary)] text-[var(--color-text-tertiary)]"
                    )}
                  >
                    <Send className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
