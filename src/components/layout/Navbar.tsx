"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, X, Menu } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/chat", label: "Mstfa AI" },
  { href: "/workout-generator", label: "Generator" },
  { href: "/exercise-library", label: "Library" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Navbar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <div className="max-w-[1440px] mx-auto px-6 md:px-[55px] h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white">
            <Dumbbell className="w-5 h-5" />
            <span className="text-sm font-medium tracking-tight">MustafaMoves</span>
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white/80 hover:text-white transition-colors"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-[#1a1a1a]"
              onClick={() => setMenuOpen(false)}
            >
              <nav className="h-full flex flex-col items-center justify-center gap-8">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "text-4xl md:text-5xl font-[500] tracking-tight transition-colors",
                        pathname === item.href
                          ? "text-[var(--color-accent)]"
                          : "text-white/40 hover:text-white/80"
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: navItems.length * 0.05 }}
                  className="mt-8"
                >
                  {user ? (
                    <Link
                      href="/settings"
                      onClick={() => setMenuOpen(false)}
                      className="text-lg text-white/60 hover:text-white transition-colors"
                    >
                      Settings
                    </Link>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setMenuOpen(false)}
                      className="text-lg text-white/60 hover:text-white transition-colors"
                    >
                      Log In
                    </Link>
                  )}
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
