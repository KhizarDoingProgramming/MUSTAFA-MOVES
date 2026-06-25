"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui";

export function CTASection() {
  return (
    <section className="px-6 py-24 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="relative rounded-[var(--radius-3xl)] overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] via-purple-600 to-pink-500" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80')] bg-cover bg-center opacity-20" />

        <div className="relative z-10 p-12 md:p-20 text-center text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Start Your Journey</span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Ready to transform?
          </h2>
          <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
            Join thousands of people who are already training smarter with Mstfa AI.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/chat">
              <Button className="bg-white text-[var(--color-accent)] hover:bg-white/90 shadow-xl group">
                Get Started Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/exercise-library">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Browse Exercises
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
