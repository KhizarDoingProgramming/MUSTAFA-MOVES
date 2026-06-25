"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6">
      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[var(--color-accent)]/20 to-purple-600/20 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-pink-500/20 to-[var(--color-accent)]/20 blur-[120px]"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <Sparkles className="w-4 h-4 text-[var(--color-accent)]" />
          <span className="text-sm font-medium text-[var(--color-text-secondary)]">
            AI-Powered Fitness Coach
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6"
        >
          Train{" "}
          <span className="text-gradient">Smarter</span>
          <br />
          with{" "}
          <span className="text-gradient-warm">Mstfa</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Your personal AI fitness assistant that builds custom workout plans,
          guides your exercises, and keeps you motivated — all in one premium experience.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/chat">
            <Button size="lg" className="group">
              Chat with Mstfa
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/workout-generator">
            <Button variant="secondary" size="lg">
              <Play className="w-4 h-4" />
              Generate Workout
            </Button>
          </Link>
        </motion.div>

        {/* Floating UI Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative mt-20 max-w-4xl mx-auto"
        >
          <div className="relative rounded-[var(--radius-3xl)] overflow-hidden glass p-1">
            <div className="rounded-[var(--radius-2xl)] overflow-hidden bg-[var(--color-bg-secondary)]">
              <div className="aspect-video relative">
                <img
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80"
                  alt="Premium gym environment"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass rounded-[var(--radius-xl)] p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-[var(--radius-lg)] bg-gradient-to-br from-[var(--color-accent)] to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold">Today&apos;s Workout</p>
                      <p className="text-xs text-[var(--color-text-secondary)]">Upper Body Power — 45 min</p>
                    </div>
                    <Button size="sm" className="ml-auto">
                      Start
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
