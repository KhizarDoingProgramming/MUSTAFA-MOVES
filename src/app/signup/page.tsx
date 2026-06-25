"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Dumbbell, ArrowRight, Mail, Lock, User, Eye, EyeOff, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-service";
import { images } from "@/data/images";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signUp(email, password, name);
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[var(--color-accent)]/5 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-[var(--color-blue)]/5 blur-[120px]"
        />
      </div>

      {/* Visual side */}
      <div className="hidden lg:flex flex-1 relative items-end p-12"
        style={{
          backgroundImage: `url(${images.auth.signup})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/40 to-[#0d0d0d]/10" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10"
        >
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-2xl)] p-8 max-w-md backdrop-blur-md">
            <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--color-accent-soft)] flex items-center justify-center mb-4">
              <Dumbbell className="w-6 h-6 text-[var(--color-accent)]" />
            </div>
            <h2 className="text-2xl font-[600] mb-2">
              Start your transformation
            </h2>
            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
              Join thousands training smarter with Mstfa AI. Your fitness journey starts now.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full max-w-md"
        >
          <Link href="/" className="inline-flex items-center gap-3 mb-12 group">
            <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-accent)] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Dumbbell className="w-5 h-5 text-[#0d0d0d]" />
            </div>
            <span className="text-lg font-[600] tracking-tight">MustafaMoves</span>
          </Link>

          <h1 className="text-4xl font-[600] tracking-tight mb-2">
            Create account
          </h1>
          <p className="text-[var(--color-text-secondary)] mb-8">
            Start your AI-powered fitness journey
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-[500] text-[var(--color-text-secondary)] mb-2 block">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-tertiary)]" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Mustafa"
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-[var(--radius-lg)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-[500] text-[var(--color-text-secondary)] mb-2 block">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-tertiary)]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-[var(--radius-lg)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-[500] text-[var(--color-text-secondary)] mb-2 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-tertiary)]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full pl-11 pr-12 py-3.5 rounded-[var(--radius-lg)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-[var(--color-danger)]"
              >
                {error}
              </motion.p>
            )}

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-[var(--radius-lg)] bg-[var(--color-accent)] text-[#0d0d0d] font-[600] flex items-center justify-center gap-2 hover:bg-[var(--color-accent-hover)] transition-all disabled:opacity-50"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          <p className="text-center text-sm text-[var(--color-text-tertiary)] mt-8">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[var(--color-accent)] hover:underline font-[500]"
            >
              Log in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
