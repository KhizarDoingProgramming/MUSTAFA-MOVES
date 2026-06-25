"use client";

import { motion } from "framer-motion";
import { Play, Target, Clock, Dumbbell, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { FloatingAIButton } from "@/components/layout/FloatingAIButton";
import { Button, Badge, Card } from "@/components/ui";
import { exercises } from "@/data/exercises";
import { getExerciseImage } from "@/data/images";
import { images } from "@/data/images";

const featuredExercises = exercises.slice(0, 4);

export default function ExerciseGuidePage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Navbar />
      <FloatingAIButton />
      <main className="md:ml-[72px] lg:ml-[240px] pb-24 md:pb-8">
        {/* Hero */}
        <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
          <img
            src={images.guide.hero}
            alt="Premium gym environment"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-[var(--color-bg-primary)]/50 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-6xl mx-auto"
            >
              <Badge variant="accent" className="mb-4">Exercise Guide</Badge>
              <h1 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-space)] tracking-tight mb-4">
                Master Your{" "}
                <span className="text-gradient">Form</span>
              </h1>
              <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mb-6">
                Learn proper technique with step-by-step instructions.
                Perfect form means better results and fewer injuries.
              </p>
              <Link href="/exercise-library">
                <Button size="lg" className="group">
                  <Play className="w-5 h-5" />
                  Browse All Exercises
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Featured Exercises */}
        <div className="px-6 max-w-6xl mx-auto py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="text-2xl font-bold font-[family-name:var(--font-space)] tracking-tight mb-2">
              Featured Exercises
            </h2>
            <p className="text-[var(--color-text-secondary)]">
              Start with these fundamental movements
            </p>
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
                <Card glass className="overflow-hidden p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 aspect-video md:aspect-auto relative">
                      <img
                        src={getExerciseImage(exercise.id)}
                        alt={exercise.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--color-bg-primary)]/20 hidden md:block" />
                    </div>
                    <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge
                          variant={
                            exercise.difficulty === "Beginner"
                              ? "success"
                              : exercise.difficulty === "Intermediate"
                              ? "warning"
                              : "danger"
                          }
                        >
                          {exercise.difficulty}
                        </Badge>
                        <Badge variant="accent">{exercise.category}</Badge>
                      </div>

                      <h3 className="text-xl font-bold font-[family-name:var(--font-space)] mb-3">
                        {exercise.name}
                      </h3>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {exercise.targetMuscles.map((muscle) => (
                          <span
                            key={muscle}
                            className="text-xs px-3 py-1 rounded-full bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]"
                          >
                            {muscle}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-3 gap-3 mb-5">
                        <div className="text-center p-2 rounded-xl bg-[var(--color-bg-tertiary)]">
                          <Dumbbell className="w-4 h-4 text-[var(--color-accent)] mx-auto mb-1" />
                          <div className="text-sm font-bold font-[family-name:var(--font-space)]">
                            {exercise.sets} sets
                          </div>
                        </div>
                        <div className="text-center p-2 rounded-xl bg-[var(--color-bg-tertiary)]">
                          <Target className="w-4 h-4 text-purple-500 mx-auto mb-1" />
                          <div className="text-sm font-bold font-[family-name:var(--font-space)]">
                            {exercise.reps}
                          </div>
                        </div>
                        <div className="text-center p-2 rounded-xl bg-[var(--color-bg-tertiary)]">
                          <Clock className="w-4 h-4 text-[var(--color-success)] mx-auto mb-1" />
                          <div className="text-sm font-bold font-[family-name:var(--font-space)]">
                            {exercise.rest}
                          </div>
                        </div>
                      </div>

                      <ol className="space-y-2 mb-6">
                        {exercise.instructions.slice(0, 3).map((step, i) => (
                          <li key={i} className="flex gap-2 text-sm text-[var(--color-text-secondary)]">
                            <span className="w-5 h-5 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">
                              {i + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>

                      <Link href="/exercise-library">
                        <Button size="sm" className="self-start">
                          View Full Guide
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Training Tips */}
        <div className="px-6 max-w-6xl mx-auto pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="text-2xl font-bold font-[family-name:var(--font-space)] tracking-tight mb-2">
              Training Tips
            </h2>
            <p className="text-[var(--color-text-secondary)]">
              Essential knowledge for your fitness journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Progressive Overload",
                desc: "Gradually increase weight, reps, or sets. This is the key to continuous improvement.",
                gradient: "from-[var(--color-accent)] to-blue-600",
              },
              {
                title: "Mind-Muscle Connection",
                desc: "Focus on the muscle you're working. Feel it contract and stretch with each rep.",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                title: "Recovery is Growth",
                desc: "Muscles grow during rest, not during training. Prioritize sleep and nutrition.",
                gradient: "from-[var(--color-success)] to-emerald-600",
              },
            ].map((tip, i) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="h-full">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tip.gradient} flex items-center justify-center mb-4 shadow-lg`}
                  >
                    <span className="text-white text-lg font-bold">{i + 1}</span>
                  </div>
                  <h3 className="font-semibold font-[family-name:var(--font-space)] mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {tip.desc}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
