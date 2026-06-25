"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, X } from "lucide-react";
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
      {/* Fixed nav bar — always visible */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
          menuOpen ? "bg-[#0d0d0d]" : "mix-blend-difference"
        )}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-[55px] h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white">
            <Dumbbell className="w-5 h-5" />
            <span className="text-sm font-[500] tracking-tight hidden sm:block">
              MustafaMoves
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="text-white/80 hover:text-white transition-colors text-sm font-[500] tracking-wide uppercase"
          >
            Menu
          </button>
        </div>
      </header>

      {/* Full-screen overlay menu — Kerna style */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-[100] bg-[#0d0d0d] flex flex-col"
          >
            {/* Close button */}
            <div className="flex justify-end p-6 md:p-[55px]">
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 flex flex-col items-center justify-center gap-6 md:gap-8 -mt-20">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: i * 0.06, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "text-[clamp(32px,6vw,72px)] font-[600] tracking-tight leading-[1.1] transition-colors duration-300",
                      pathname === item.href
                        ? "text-[var(--color-accent)]"
                        : "text-white/20 hover:text-white/70"
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ delay: navItems.length * 0.06 + 0.1, duration: 0.5 }}
                className="mt-6"
              >
                {user ? (
                  <Link
                    href="/settings"
                    onClick={() => setMenuOpen(false)}
                    className="text-lg text-white/40 hover:text-white/70 transition-colors font-[500]"
                  >
                    Settings
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-all text-sm font-[500]"
                  >
                    Log In
                  </Link>
                )}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
