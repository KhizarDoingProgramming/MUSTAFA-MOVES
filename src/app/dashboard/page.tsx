"use client";

import { motion } from "framer-motion";
import {
  Flame,
  TrendingUp,
  Dumbbell,
  Target,
  Clock,
  ArrowLeft,
  Zap,
  Award,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { FloatingAIButton } from "@/components/layout/FloatingAIButton";
import { useAuth } from "@/hooks/useAuth";
import { Card, Badge, Button } from "@/components/ui";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const workoutHistory = [true, false, true, true, false, true, false];

const recentWorkouts = [
  { name: "Upper Body Power", date: "Today", duration: "45 min", calories: 320, exercises: 6 },
  { name: "Leg Day", date: "Yesterday", duration: "55 min", calories: 410, exercises: 5 },
  { name: "Push Day", date: "2 days ago", duration: "40 min", calories: 290, exercises: 6 },
  { name: "Pull Day", date: "3 days ago", duration: "42 min", calories: 305, exercises: 5 },
];

const recommendations = [
  {
    title: "Focus on Recovery",
    desc: "You've trained 4 days in a row. Consider a rest day tomorrow.",
    icon: Clock,
    color: "text-[var(--color-accent)]",
    bg: "bg-[var(--color-accent)]/10",
  },
  {
    title: "Increase Squat Weight",
    desc: "You've been at the same weight for 2 weeks. Time to go heavier.",
    icon: TrendingUp,
    color: "text-[var(--color-success)]",
    bg: "bg-[var(--color-success)]/10",
  },
  {
    title: "Hit Your Protein Goal",
    desc: "Based on your muscle gain goal, aim for 140g protein daily.",
    icon: Target,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
];

export default function DashboardPage() {
  const { profile } = useAuth();

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Navbar />
      <FloatingAIButton />
      <main className="md:ml-[72px] lg:ml-[240px] pb-24 md:pb-8">
        <div className="px-6 py-6 flex items-center gap-4">
          <Link href="/" className="md:hidden">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold font-[family-name:var(--font-space)] tracking-tight">
              Dashboard
            </h1>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Welcome back{profile?.name ? `, ${profile.name}` : ""}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
            {profile?.name?.charAt(0) || "M"}
          </div>
        </div>

        <div className="px-6 max-w-6xl mx-auto space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: Flame, label: "Calories", value: "1,325", color: "text-orange-500", bg: "from-orange-500/10 to-red-500/10" },
              { icon: Dumbbell, label: "Workouts", value: "12", color: "text-[var(--color-accent)]", bg: "from-[var(--color-accent)]/10 to-blue-500/10" },
              { icon: Zap, label: "Streak", value: "7 days", color: "text-[var(--color-warning)]", bg: "from-yellow-500/10 to-orange-500/10" },
              { icon: Award, label: "Best Lift", value: "140kg", color: "text-[var(--color-success)]", bg: "from-[var(--color-success)]/10 to-emerald-500/10" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.bg} opacity-50`} />
                  <div className="relative">
                    <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                    <div className="text-2xl font-bold font-[family-name:var(--font-space)] tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs text-[var(--color-text-tertiary)]">{stat.label}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Weekly Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card glass>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold font-[family-name:var(--font-space)]">This Week</h2>
                <Badge variant="accent">4 of 5 completed</Badge>
              </div>
              <div className="flex items-end justify-between gap-2 h-32">
                {weekDays.map((day, i) => (
                  <div key={day} className="flex-1 flex flex-col items-center gap-2">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: workoutHistory[i] ? "80%" : "20%" }}
                      transition={{ duration: 0.5, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                      className={`w-full rounded-xl ${
                        workoutHistory[i]
                          ? "bg-gradient-to-t from-[var(--color-accent)] to-blue-500"
                          : "bg-[var(--color-bg-tertiary)]"
                      }`}
                    />
                    <span className="text-xs text-[var(--color-text-tertiary)]">{day}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Workouts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card glass className="h-full">
                <h2 className="font-semibold font-[family-name:var(--font-space)] mb-4">Recent Workouts</h2>
                <div className="space-y-3">
                  {recentWorkouts.map((workout, i) => (
                    <motion.div
                      key={workout.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--color-bg-tertiary)]/50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center flex-shrink-0">
                        <Dumbbell className="w-5 h-5 text-[var(--color-accent)]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{workout.name}</p>
                        <p className="text-xs text-[var(--color-text-tertiary)]">{workout.date}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-medium">{workout.calories} cal</p>
                        <p className="text-xs text-[var(--color-text-tertiary)]">{workout.duration}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* AI Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card glass className="h-full">
                <h2 className="font-semibold font-[family-name:var(--font-space)] mb-4">Mstfa Recommends</h2>
                <div className="space-y-3">
                  {recommendations.map((rec, i) => (
                    <motion.div
                      key={rec.title}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-[var(--color-bg-tertiary)]/50 transition-colors"
                    >
                      <div className={`w-10 h-10 rounded-xl ${rec.bg} flex items-center justify-center flex-shrink-0`}>
                        <rec.icon className={`w-5 h-5 ${rec.color}`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{rec.title}</p>
                        <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                          {rec.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card glass>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {profile?.name?.charAt(0) || "M"}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg font-[family-name:var(--font-space)]">
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
                      <span>Height: {profile?.height || 175}cm</span>
                    </div>
                  </div>
                </div>
                <Link href="/settings">
                  <Button variant="secondary" size="sm">
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
