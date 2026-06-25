"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Dumbbell, Clock } from "lucide-react";

const stats = [
  { icon: Dumbbell, value: "100+", label: "Exercises", color: "text-[var(--color-accent)]" },
  { icon: Users, value: "10K+", label: "Active Users", color: "text-purple-500" },
  { icon: TrendingUp, value: "50K+", label: "Workouts Done", color: "text-[var(--color-success)]" },
  { icon: Clock, value: "4.9", label: "App Rating", color: "text-orange-500" },
];

export function StatsSection() {
  return (
    <section className="px-6 py-24 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="glass rounded-[var(--radius-3xl)] p-8 md:p-12"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-3`} />
              <div className="text-3xl md:text-4xl font-bold tracking-tight mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-[var(--color-text-secondary)]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
