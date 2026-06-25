"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home,
  MessageCircle,
  Dumbbell,
  BookOpen,
  LayoutDashboard,
  Settings,
  Sparkles,
  LogIn,
  User,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/chat", label: "Mstfa AI", icon: MessageCircle },
  { href: "/workout-generator", label: "Generator", icon: Sparkles },
  { href: "/exercise-library", label: "Library", icon: BookOpen },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Navbar() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed left-0 top-0 h-full w-[72px] lg:w-[240px] z-50 flex-col justify-between py-6 hidden md:flex glass-strong"
      >
        <div>
          <Link href="/" className="flex items-center gap-3 px-4 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-purple-600 flex items-center justify-center shadow-lg shadow-[var(--color-accent)]/20">
              <Dumbbell className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold font-[family-name:var(--font-space)] hidden lg:block tracking-tight">
              MustafaMoves
            </span>
          </Link>

          <nav className="flex flex-col gap-1 px-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group relative",
                      isActive
                        ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                        : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]/50"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[var(--color-accent)] rounded-r-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm font-medium hidden lg:block font-[family-name:var(--font-sora)]">
                      {item.label}
                    </span>
                  </motion.div>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="px-4 space-y-3">
          {/* Auth */}
          {user ? (
            <Link href="/settings">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]/50 transition-all"
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-purple-600 flex items-center justify-center">
                  <User className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm font-medium hidden lg:block truncate">
                  {user.email?.split("@")[0]}
                </span>
              </motion.div>
            </Link>
          ) : (
            <Link href="/login">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]/50 transition-all"
              >
                <LogIn className="w-5 h-5" />
                <span className="text-sm font-medium hidden lg:block">Log In</span>
              </motion.div>
            </Link>
          )}

          {/* Pro Card */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-[var(--color-accent)]/10 to-purple-500/10 border border-[var(--color-accent)]/20">
            <Sparkles className="w-5 h-5 text-[var(--color-accent)] mb-2" />
            <p className="text-xs font-medium hidden lg:block leading-relaxed font-[family-name:var(--font-sora)]">
              Upgrade to Pro for AI-powered plans
            </p>
          </div>
        </div>
      </motion.aside>

      {/* Mobile Bottom Tab Bar */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass-strong"
      >
        <div className="flex items-center justify-around py-2 px-2">
          {navItems.slice(0, 5).map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors",
                    isActive
                      ? "text-[var(--color-accent)]"
                      : "text-[var(--color-text-tertiary)]"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-[10px] font-medium font-[family-name:var(--font-sora)]">
                    {item.label}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
}
