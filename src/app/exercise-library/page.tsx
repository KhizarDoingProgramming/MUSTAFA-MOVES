"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Target, Clock } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { FloatingAIButton } from "@/components/layout/FloatingAIButton";
import { exercises, Exercise } from "@/data/exercises";

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
      <main className="pt-24 pb-16 md:pb-8">
        <div className="px-6 md:px-[55px] max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-[600] tracking-tight">Exercise Library</h1>
            <p className="text-[var(--color-text-secondary)] mt-1">{exercises.length} exercises to explore</p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-tertiary)]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search exercises..."
                className="w-full pl-11 pr-4 py-3 rounded-[var(--radius-lg)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 transition-all text-sm"
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
                className={`px-4 py-2 rounded-full text-sm font-[500] whitespace-nowrap transition-all duration-300 ${
                  category === cat
                    ? "bg-[var(--color-accent)] text-[#0d0d0d]"
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
                  <button
                    onClick={() => setSelectedExercise(exercise)}
                    className="w-full text-left bg-card rounded-[var(--radius-xl)] overflow-hidden hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-strong)] transition-all duration-300"
                  >
                    <div className="aspect-video relative bg-gradient-to-br from-[var(--color-accent-soft)] to-transparent flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/60 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white font-[600] text-lg">{exercise.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          {exercise.targetMuscles.slice(0, 2).map((muscle) => (
                            <span key={muscle} className="text-xs text-white/70 bg-white/10 px-2 py-0.5 rounded-full">
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
                  </button>
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

        {/* Exercise Detail Modal */}
        <AnimatePresence>
          {selectedExercise && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6"
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
                  <div className="aspect-video bg-gradient-to-br from-[var(--color-accent-soft)] to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-transparent to-transparent" />
                  <button
                    onClick={() => setSelectedExercise(null)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="p-6 -mt-8 relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs px-3 py-1 rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                      {selectedExercise.category}
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]">
                      {selectedExercise.difficulty}
                    </span>
                  </div>

                  <h2 className="text-2xl font-[600] mb-4">{selectedExercise.name}</h2>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedExercise.targetMuscles.map((muscle) => (
                      <span key={muscle} className="text-xs px-3 py-1 rounded-full bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]">
                        {muscle}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-[600] mb-3">Instructions</h3>
                  <ol className="space-y-3 mb-6">
                    {selectedExercise.instructions.map((step, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span className="w-6 h-6 rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)] flex items-center justify-center flex-shrink-0 text-xs font-[700]">
                          {i + 1}
                        </span>
                        <span className="text-[var(--color-text-secondary)] leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="p-3 rounded-[var(--radius-md)] bg-[var(--color-bg-secondary)] text-center">
                      <div className="text-lg font-[600]">{selectedExercise.sets}</div>
                      <div className="text-xs text-[var(--color-text-tertiary)]">Sets</div>
                    </div>
                    <div className="p-3 rounded-[var(--radius-md)] bg-[var(--color-bg-secondary)] text-center">
                      <div className="text-lg font-[600]">{selectedExercise.reps}</div>
                      <div className="text-xs text-[var(--color-text-tertiary)]">Reps</div>
                    </div>
                    <div className="p-3 rounded-[var(--radius-md)] bg-[var(--color-bg-secondary)] text-center">
                      <div className="text-lg font-[600]">{selectedExercise.rest}</div>
                      <div className="text-xs text-[var(--color-text-tertiary)]">Rest</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
