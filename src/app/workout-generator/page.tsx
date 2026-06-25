"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Download,
  RotateCcw,
  ChevronRight,
  Dumbbell,
  Calendar,
  Bot,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { FloatingAIButton } from "@/components/layout/FloatingAIButton";
import { Input } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import { generateWorkoutPlan, WorkoutPlan } from "@/data/exercises";
import { getFirebaseDb } from "@/lib/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

const goalsList = [
  { id: "muscle", label: "Muscle Gain", emoji: "💪" },
  { id: "fat-loss", label: "Fat Loss", emoji: "🔥" },
  { id: "strength", label: "Strength", emoji: "🏋️" },
  { id: "general", label: "General Fitness", emoji: "✨" },
];

const levelsList = [
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
];

export default function WorkoutGeneratorPage() {
  const { profile, user } = useAuth();
  const [step, setStep] = useState(0);
  const [age, setAge] = useState(String(profile?.age || 25));
  const [weight, setWeight] = useState(String(profile?.weight || 70));
  const [height, setHeight] = useState(String(profile?.height || 175));
  const [goal, setGoal] = useState(profile?.goal || "muscle");
  const [level, setLevel] = useState(profile?.level || "intermediate");
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newPlan = generateWorkoutPlan(
        parseInt(age),
        parseFloat(weight),
        parseFloat(height),
        goal,
        level
      );
      setPlan(newPlan);
      setIsGenerating(false);
      setStep(2);

      // Save to Firestore
      if (user) {
        const db = getFirebaseDb();
        updateDoc(doc(db, "users", user.uid), {
          workouts: arrayUnion({
            name: newPlan.name,
            date: new Date().toLocaleDateString(),
            duration: `${newPlan.days.filter(d => !d.isRestDay).length} days/week`,
            calories: Math.floor(Math.random() * 200) + 250,
          }),
          totalWorkouts: (profile as any)?.totalWorkouts + 1 || 1,
        }).catch(() => {});
      }
    }, 2000);
  };

  const handleDownloadPDF = async () => {
    if (!plan) return;
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.text("MustafaMoves", 20, 25);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120, 120, 120);
    doc.text("AI-Powered Workout Plan", 20, 33);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 20, 40);
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 45, 190, 45);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(plan.name, 20, 55);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Goal: ${plan.goal.replace("-", " ")}`, 20, 63);
    doc.text(`Level: ${plan.level}`, 20, 70);
    let y = 85;
    plan.days.forEach((day) => {
      if (y > 250) { doc.addPage(); y = 20; }
      if (day.isRestDay) {
        doc.setFontSize(12); doc.setFont("helvetica", "bold"); doc.setTextColor(100, 100, 100);
        doc.text(`${day.day} — Rest Day`, 20, y); y += 12;
      } else {
        doc.setFontSize(12); doc.setFont("helvetica", "bold"); doc.setTextColor(0, 0, 0);
        doc.text(`${day.day} — ${day.focus}`, 20, y); y += 8;
        day.exercises.forEach((ex) => {
          if (y > 270) { doc.addPage(); y = 20; }
          doc.setFontSize(10); doc.setFont("helvetica", "normal"); doc.setTextColor(60, 60, 60);
          doc.text(`• ${ex.name}`, 28, y); doc.text(`${ex.sets} sets × ${ex.reps} reps`, 140, y); y += 6;
        }); y += 6;
      }
    });
    doc.save(`MustafaMoves-${plan.name.replace(/\s+/g, "-")}.pdf`);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Navbar />
      <FloatingAIButton />
      <main className="pt-24 pb-16 md:pb-8">
        <div className="px-6 md:px-[55px] max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-[600] tracking-tight">Workout Generator</h1>
            <p className="text-[var(--color-text-secondary)] mt-1">AI-powered personalized workout plans</p>
          </motion.div>

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="bg-card rounded-[var(--radius-xl)] p-6 md:p-8 mb-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-accent-soft)] flex items-center justify-center">
                      <Dumbbell className="w-5 h-5 text-[var(--color-accent)]" />
                    </div>
                    <div>
                      <h2 className="font-[600]">Personal Details</h2>
                      <p className="text-xs text-[var(--color-text-secondary)]">Help Mstfa understand your body</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Input label="Age" type="number" value={age} onChange={setAge} placeholder="25" />
                    <Input label="Weight (kg)" type="number" value={weight} onChange={setWeight} placeholder="70" />
                    <Input label="Height (cm)" type="number" value={height} onChange={setHeight} placeholder="175" />
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    className="w-full py-3 rounded-[var(--radius-lg)] bg-[var(--color-accent)] text-[#0d0d0d] font-[600] text-sm hover:bg-[var(--color-accent-hover)] transition-all inline-flex items-center justify-center gap-2"
                  >
                    Continue
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="bg-card rounded-[var(--radius-xl)] p-6 md:p-8 mb-6">
                  <h2 className="font-[600] mb-4">What&apos;s your goal?</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    {goalsList.map((g) => (
                      <motion.button
                        key={g.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setGoal(g.id)}
                        className={`p-4 rounded-[var(--radius-lg)] text-center transition-all duration-300 ${
                          goal === g.id
                            ? "bg-[var(--color-accent-soft)] border-2 border-[var(--color-accent)]"
                            : "bg-[var(--color-bg-tertiary)] border-2 border-transparent hover:border-[var(--color-border-strong)]"
                        }`}
                      >
                        <div className="text-2xl mb-1">{g.emoji}</div>
                        <div className="font-[500] text-sm">{g.label}</div>
                      </motion.button>
                    ))}
                  </div>

                  <h2 className="font-[600] mb-4">Fitness Level</h2>
                  <div className="flex gap-3 mb-6">
                    {levelsList.map((l) => (
                      <motion.button
                        key={l.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setLevel(l.id)}
                        className={`flex-1 p-3 rounded-[var(--radius-lg)] text-center transition-all duration-300 ${
                          level === l.id
                            ? "bg-[var(--color-accent-soft)] border-2 border-[var(--color-accent)]"
                            : "bg-[var(--color-bg-tertiary)] border-2 border-transparent"
                        }`}
                      >
                        <div className="font-[500] text-sm capitalize">{l.label}</div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setStep(0)} className="flex-1 py-3 rounded-[var(--radius-lg)] bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] font-[500] text-sm hover:bg-[var(--color-bg-tertiary)]/80 transition-all">
                      Back
                    </button>
                    <button
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="flex-1 py-3 rounded-[var(--radius-lg)] bg-[var(--color-accent)] text-[#0d0d0d] font-[600] text-sm hover:bg-[var(--color-accent-hover)] transition-all disabled:opacity-50 inline-flex items-center justify-center gap-2"
                    >
                      {isGenerating ? (
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                          <Sparkles className="w-4 h-4" />
                        </motion.div>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          Generate Plan
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && plan && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="bg-card rounded-[var(--radius-xl)] p-6 md:p-8 mb-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-[600]">{plan.name}</h2>
                      <p className="text-sm text-[var(--color-text-secondary)]">
                        {plan.days.filter((d) => !d.isRestDay).length} training days • {plan.level}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={handleDownloadPDF} className="px-4 py-2 rounded-[var(--radius-md)] bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] font-[500] text-sm hover:bg-[var(--color-bg-tertiary)]/80 transition-all inline-flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        PDF
                      </button>
                      <button onClick={() => setStep(0)} className="p-2 rounded-[var(--radius-md)] bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]/80 transition-all">
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {plan.days.map((day, i) => (
                      <motion.div
                        key={day.day}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        className={`p-4 rounded-[var(--radius-lg)] ${
                          day.isRestDay
                            ? "bg-[var(--color-bg-tertiary)]/50"
                            : "bg-[var(--color-bg-tertiary)] border border-[var(--color-border)]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <Calendar className="w-4 h-4 text-[var(--color-text-tertiary)]" />
                            <span className="font-[500] text-sm">{day.day}</span>
                          </div>
                          <span className={`text-xs px-3 py-1 rounded-full ${
                            day.isRestDay ? "bg-[var(--color-bg-tertiary)] text-[var(--color-text-tertiary)]" : "bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                          }`}>
                            {day.isRestDay ? "Rest" : day.focus}
                          </span>
                        </div>
                        {!day.isRestDay && (
                          <div className="space-y-2 mt-3">
                            {day.exercises.map((exercise) => (
                              <div key={exercise.id} className="flex items-center justify-between text-xs text-[var(--color-text-secondary)]">
                                <span>{exercise.name}</span>
                                <span className="font-mono">{exercise.sets}×{exercise.reps}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Mstfa insight */}
                  <div className="mt-6 p-4 rounded-[var(--radius-md)] bg-[var(--color-accent-soft)] border border-[var(--color-accent)]/10">
                    <div className="flex items-start gap-3">
                      <Bot className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-[500] text-[var(--color-accent)]">Mstfa&apos;s Tip</p>
                        <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                          {plan.goal === "muscle" ? "Aim for 1.6-2.2g of protein per kg of bodyweight daily." :
                           plan.goal === "fat-loss" ? "Stay in a 300-500 calorie deficit while hitting your protein goals." :
                           "Focus on progressive overload — add 2.5kg or 1 rep each session."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
