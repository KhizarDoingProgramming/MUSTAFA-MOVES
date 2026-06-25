"use client";

import { motion } from "framer-motion";
import { Play, Target, Clock, Dumbbell, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { FloatingAIButton } from "@/components/layout/FloatingAIButton";
import { exercises } from "@/data/exercises";
import { images } from "@/data/images";

const featuredExercises = exercises.slice(0, 4);

export default function ExerciseGuidePage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Navbar />
      <FloatingAIButton />
      <main>
        {/* Hero */}
        <div className="relative h-[60vh] md:h-[70vh] overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: `url(${images.guide.hero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-[var(--color-bg-primary)]/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-6xl mx-auto"
            >
              <span className="text-xs px-3 py-1 rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)] font-[500] mb-4 inline-block">
                Exercise Guide
              </span>
              <h1 className="text-4xl md:text-6xl font-[600] tracking-tight mb-4">
                Master Your{" "}
                <span className="text-[var(--color-accent)]">Form</span>
              </h1>
              <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mb-6">
                Learn proper technique with step-by-step instructions. Perfect form means better results.
              </p>
              <Link
                href="/exercise-library"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-accent)] text-[#0d0d0d] font-[600] text-sm hover:bg-[var(--color-accent-hover)] transition-all"
              >
                <Play className="w-4 h-4" />
                Browse All Exercises
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Featured Exercises */}
        <div className="px-6 md:px-[55px] max-w-6xl mx-auto py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="text-2xl font-[600] tracking-tight mb-2">Featured Exercises</h2>
            <p className="text-[var(--color-text-secondary)]">Start with these fundamental movements</p>
          </motion.div>

          <div className="space-y-6">
            {featuredExercises.map((exercise, index) => (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-card rounded-[var(--radius-xl)] overflow-hidden p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 aspect-video md:aspect-auto bg-cover bg-center flex items-center justify-center"
                      style={{ backgroundImage: `url(${exercise.image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/30 to-transparent" />
                      <Dumbbell className="w-16 h-16 text-[var(--color-accent)]/20 relative z-10" />
                    </div>
                    <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs px-3 py-1 rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]">{exercise.category}</span>
                        <span className="text-xs px-3 py-1 rounded-full bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]">{exercise.difficulty}</span>
                      </div>
                      <h3 className="text-xl font-[600] mb-3">{exercise.name}</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {exercise.targetMuscles.map((muscle) => (
                          <span key={muscle} className="text-xs px-3 py-1 rounded-full bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]">{muscle}</span>
                        ))}
                      </div>
                      <div className="grid grid-cols-3 gap-3 mb-5">
                        <div className="text-center p-2 rounded-[var(--radius-md)] bg-[var(--color-bg-tertiary)]">
                          <div className="text-sm font-[600]">{exercise.sets} sets</div>
                        </div>
                        <div className="text-center p-2 rounded-[var(--radius-md)] bg-[var(--color-bg-tertiary)]">
                          <div className="text-sm font-[600]">{exercise.reps}</div>
                        </div>
                        <div className="text-center p-2 rounded-[var(--radius-md)] bg-[var(--color-bg-tertiary)]">
                          <div className="text-sm font-[600]">{exercise.rest}</div>
                        </div>
                      </div>
                      <Link
                        href="/exercise-library"
                        className="inline-flex items-center gap-2 text-sm text-[var(--color-accent)] font-[500] hover:underline self-start"
                      >
                        View Full Guide
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Training Tips */}
        <div className="px-6 md:px-[55px] max-w-6xl mx-auto pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="text-2xl font-[600] tracking-tight mb-2">Training Tips</h2>
            <p className="text-[var(--color-text-secondary)]">Essential knowledge for your fitness journey</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Progressive Overload", desc: "Gradually increase weight, reps, or sets. This is the key to continuous improvement." },
              { title: "Mind-Muscle Connection", desc: "Focus on the muscle you're working. Feel it contract and stretch with each rep." },
              { title: "Recovery is Growth", desc: "Muscles grow during rest, not during training. Prioritize sleep and nutrition." },
            ].map((tip, i) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="bg-card rounded-[var(--radius-xl)] p-6 h-full">
                  <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-accent-soft)] flex items-center justify-center mb-4">
                    <span className="text-[var(--color-accent)] font-[700] text-lg">{i + 1}</span>
                  </div>
                  <h3 className="font-[600] mb-2">{tip.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{tip.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
