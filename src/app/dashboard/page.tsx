"use client";

import { motion } from "framer-motion";
import {
  Flame,
  TrendingUp,
  Dumbbell,
  Target,
  Clock,
  Zap,
  Award,
  Bot,
  ChevronRight,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { FloatingAIButton } from "@/components/layout/FloatingAIButton";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type WorkoutLog = {
  date: string;
  name: string;
  duration: string;
  calories: number;
};

type DashboardData = {
  workouts: WorkoutLog[];
  streak: number;
  totalCalories: number;
  totalWorkouts: number;
  level: string;
};

export default function DashboardPage() {
  const { user, profile } = useAuth();
  const [data, setData] = useState<DashboardData>({
    workouts: [],
    streak: 0,
    totalCalories: 0,
    totalWorkouts: 0,
    level: "intermediate",
  });

  useEffect(() => {
    if (!user) return;
    const db = getFirebaseDb();
    getDoc(doc(db, "users", user.uid)).then((snap) => {
      if (snap.exists()) {
        const d = snap.data();
        setData({
          workouts: d.workouts || [],
          streak: d.streak || 0,
          totalCalories: d.totalCalories || 0,
          totalWorkouts: d.totalWorkouts || 0,
          level: d.level || "intermediate",
        });
      }
    });
  }, [user]);

  const recentWorkouts = data.workouts.slice(-4).reverse();

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Navbar />
      <FloatingAIButton />
      <main className="pt-24 pb-16 md:pb-8">
        <div className="px-6 md:px-[55px] max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-[600] tracking-tight">
              Dashboard
            </h1>
            <p className="text-[var(--color-text-secondary)] mt-1">
              Welcome back{profile?.name ? `, ${profile.name}` : ""}
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { icon: Flame, label: "Calories", value: data.totalCalories.toLocaleString(), color: "text-[var(--color-accent)]" },
              { icon: Dumbbell, label: "Workouts", value: String(data.totalWorkouts), color: "text-[var(--color-accent)]" },
              { icon: Zap, label: "Streak", value: `${data.streak} days`, color: "text-[var(--color-accent)]" },
              { icon: Award, label: "Level", value: data.level.charAt(0).toUpperCase() + data.level.slice(1), color: "text-[var(--color-accent)]" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-card rounded-[var(--radius-lg)] p-5"
              >
                <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                <div className="text-2xl font-[600] tracking-tight">{stat.value}</div>
                <div className="text-xs text-[var(--color-text-tertiary)]">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Workouts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-card rounded-[var(--radius-xl)] p-6">
                <h2 className="font-[600] mb-4 flex items-center gap-2">
                  <Dumbbell className="w-4 h-4 text-[var(--color-accent)]" />
                  Recent Workouts
                </h2>
                {recentWorkouts.length > 0 ? (
                  <div className="space-y-3">
                    {recentWorkouts.map((workout, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] hover:bg-[var(--color-bg-tertiary)]/50 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-accent-soft)] flex items-center justify-center flex-shrink-0">
                          <Dumbbell className="w-5 h-5 text-[var(--color-accent)]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-[500] truncate">{workout.name}</p>
                          <p className="text-xs text-[var(--color-text-tertiary)]">{workout.date}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm font-[500]">{workout.calories} cal</p>
                          <p className="text-xs text-[var(--color-text-tertiary)]">{workout.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Bot className="w-10 h-10 text-[var(--color-text-tertiary)] mx-auto mb-3" />
                    <p className="text-sm text-[var(--color-text-secondary)]">No workouts yet</p>
                    <Link
                      href="/workout-generator"
                      className="inline-flex items-center gap-1 text-sm text-[var(--color-accent)] mt-2 hover:underline"
                    >
                      Generate your first plan
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Weekly Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-card rounded-[var(--radius-xl)] p-6">
                <h2 className="font-[600] mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[var(--color-accent)]" />
                  This Week
                </h2>

                <div className="flex items-end justify-between gap-2 h-32 mb-6">
                  {weekDays.map((day, i) => (
                    <div key={day} className="flex-1 flex flex-col items-center gap-2">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: data.workouts.length > 0 ? `${Math.random() * 60 + 20}%` : "10%" }}
                        transition={{ duration: 0.5, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                        className={`w-full rounded-[var(--radius-md)] ${
                          data.workouts.length > 0
                            ? "bg-[var(--color-accent)]/60"
                            : "bg-[var(--color-bg-tertiary)]"
                        }`}
                      />
                      <span className="text-xs text-[var(--color-text-tertiary)]">{day}</span>
                    </div>
                  ))}
                </div>

                {/* Mstfa AI Recommendation */}
                <div className="p-4 rounded-[var(--radius-md)] bg-[var(--color-accent-soft)] border border-[var(--color-accent)]/10">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-[var(--color-accent)]/20 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-[var(--color-accent)]" />
                    </div>
                    <div>
                      <p className="text-sm font-[500] text-[var(--color-accent)]">Mstfa Says</p>
                      <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                        {data.workouts.length === 0
                          ? "Start your first workout to get personalized recommendations!"
                          : "Great work this week! Try adding one more session to level up."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6"
          >
            <div className="bg-card rounded-[var(--radius-xl)] p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-[#0d0d0d] font-[700] text-xl">
                    {profile?.name?.charAt(0) || "M"}
                  </div>
                  <div>
                    <h3 className="font-[600] text-lg">
                      {profile?.name || "Mustafa"}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      {profile?.goal
                        ? profile.goal.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())
                        : "Muscle Gain"}{" "}
                      •{" "}
                      {profile?.level
                        ? profile.level.charAt(0).toUpperCase() + profile.level.slice(1)
                        : "Intermediate"}
                    </p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-[var(--color-text-tertiary)]">
                      <span>Age: {profile?.age || 25}</span>
                      <span>Weight: {profile?.weight || 70}kg</span>
                    </div>
                  </div>
                </div>
                <Link
                  href="/settings"
                  className="text-sm text-[var(--color-accent)] hover:underline font-[500]"
                >
                  Edit
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
