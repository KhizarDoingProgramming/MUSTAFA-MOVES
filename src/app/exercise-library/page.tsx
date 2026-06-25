"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowLeft, Target, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { FloatingAIButton } from "@/components/layout/FloatingAIButton";
import { Card, Badge, Button } from "@/components/ui";
import { exercises, Exercise } from "@/data/exercises";
import { getExerciseImage } from "@/data/images";

const categories = ["All", "Chest", "Back", "Legs", "Shoulders", "Arms", "Core"];

export default function ExerciseLibraryPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const filteredExercises = exercises.filter((ex) => {
    const matchesSearch = ex.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || ex.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Navbar />
      <FloatingAIButton />
      <main className="pb-24 md:pb-8">
        <div className="px-6 py-6 flex items-center gap-4 pt-24">
          <Link href="/" className="md:hidden">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold font-[family-name:var(--font-space)] tracking-tight">
              Exercise Library
            </h1>
            <p className="text-sm text-[var(--color-text-secondary)]">
              {exercises.length} exercises to explore
            </p>
          </div>
        </div>

        <div className="px-6 max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-tertiary)]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search exercises..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 transition-all text-sm"
              />
            </div>
          </div>

          <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 font-[family-name:var(--font-sora)] ${
                  category === cat
                    ? "bg-[var(--color-accent)] text-white"
                    : "bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {filteredExercises.map((exercise, index) => (
                <motion.div
                  key={exercise.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card
                    hover
                    onClick={() => setSelectedExercise(exercise)}
                    className="overflow-hidden p-0"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={getExerciseImage(exercise.id)}
                        alt={exercise.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute top-3 right-3">
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
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white font-bold font-[family-name:var(--font-space)] text-lg">
                          {exercise.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          {exercise.targetMuscles.slice(0, 2).map((muscle) => (
                            <span
                              key={muscle}
                              className="text-xs text-white/70 bg-white/10 px-2 py-0.5 rounded-full"
                            >
                              {muscle}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary)]">
                        <span className="flex items-center gap-1">
                          <Target className="w-3 h-3" />
                          {exercise.sets} sets × {exercise.reps}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {exercise.rest}
                        </span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredExercises.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[var(--color-text-tertiary)]">No exercises found</p>
            </div>
          )}
        </div>

        <AnimatePresence>
          {selectedExercise && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6"
              onClick={() => setSelectedExercise(null)}
            >
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full md:max-w-lg bg-[var(--color-bg-primary)] rounded-t-3xl md:rounded-3xl max-h-[90vh] overflow-y-auto"
              >
                <div className="relative">
                  <img
                    src={getExerciseImage(selectedExercise.id)}
                    alt={selectedExercise.name}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-transparent to-transparent" />
                  <button
                    onClick={() => setSelectedExercise(null)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>

                <div className="p-6 -mt-8 relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant={
                        selectedExercise.difficulty === "Beginner"
                          ? "success"
                          : selectedExercise.difficulty === "Intermediate"
                          ? "warning"
                          : "danger"
                      }
                    >
                      {selectedExercise.difficulty}
                    </Badge>
                    <Badge variant="accent">{selectedExercise.category}</Badge>
                  </div>

                  <h2 className="text-2xl font-bold font-[family-name:var(--font-space)] mb-2">
                    {selectedExercise.name}
                  </h2>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedExercise.targetMuscles.map((muscle) => (
                      <span
                        key={muscle}
                        className="text-xs px-3 py-1 rounded-full bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-semibold mb-3">Instructions</h3>
                  <ol className="space-y-3 mb-6">
                    {selectedExercise.instructions.map((step, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span className="w-6 h-6 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center flex-shrink-0 text-xs font-bold">
                          {i + 1}
                        </span>
                        <span className="text-[var(--color-text-secondary)] leading-relaxed">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-[var(--color-bg-secondary)] text-center">
                      <div className="text-lg font-bold font-[family-name:var(--font-space)]">
                        {selectedExercise.sets}
                      </div>
                      <div className="text-xs text-[var(--color-text-tertiary)]">Sets</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[var(--color-bg-secondary)] text-center">
                      <div className="text-lg font-bold font-[family-name:var(--font-space)]">
                        {selectedExercise.reps}
                      </div>
                      <div className="text-xs text-[var(--color-text-tertiary)]">Reps</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[var(--color-bg-secondary)] text-center">
                      <div className="text-lg font-bold font-[family-name:var(--font-space)]">
                        {selectedExercise.rest}
                      </div>
                      <div className="text-xs text-[var(--color-text-tertiary)]">Rest</div>
                    </div>
                  </div>

                  <Link href="/workout-generator">
                    <Button className="w-full">
                      Add to Workout
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
