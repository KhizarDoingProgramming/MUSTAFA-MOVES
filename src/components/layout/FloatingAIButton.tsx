"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Bot } from "lucide-react";
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
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 300, damping: 20 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 md:bottom-8 right-6 z-[60] w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-purple-600 text-white shadow-xl shadow-[var(--color-accent)]/30 flex items-center justify-center hover:shadow-2xl hover:shadow-[var(--color-accent)]/40 transition-shadow"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0, scale: isOpen ? 0.8 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Sparkles className="w-6 h-6" />
          )}
        </motion.div>
        {/* Pulse Ring */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-[var(--color-accent)]/30"
        />
      </motion.button>

      {/* Quick Action Panel */}
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
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed bottom-40 md:bottom-28 right-6 z-[60] w-72 glass rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Header */}
              <div className="p-4 bg-gradient-to-br from-[var(--color-accent)] to-purple-600">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm font-[family-name:var(--font-space)]">
                      Mstfa AI
                    </p>
                    <p className="text-white/60 text-xs">How can I help you?</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-3 space-y-1">
                {quickActions.map((action) => (
                  <Link key={action.label} href={action.href} onClick={() => setIsOpen(false)}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[var(--color-bg-tertiary)]/50 transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-[var(--color-accent)]" />
                      <span className="text-sm font-[family-name:var(--font-sora)]">
                        {action.label}
                      </span>
                    </motion.div>
                  </Link>
                ))}
              </div>

              {/* Quick Chat Input */}
              <div className="p-3 border-t border-[var(--color-border)]">
                <div className="flex items-center gap-2 bg-[var(--color-bg-tertiary)] rounded-xl px-3 py-2">
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
                      "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                      input.trim()
                        ? "bg-[var(--color-accent)] text-white"
                        : "bg-[var(--color-bg-tertiary)] text-[var(--color-text-tertiary)]"
                    )}
                  >
                    <Send className="w-3.5 h-3.5" />
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
