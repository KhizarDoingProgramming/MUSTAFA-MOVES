"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  LogOut,
  Dumbbell,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { FloatingAIButton } from "@/components/layout/FloatingAIButton";
import { Input, Select } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import { logOut, updateUserProfile } from "@/lib/auth-service";

export default function SettingsPage() {
  const router = useRouter();
  const { user, profile } = useAuth();
  const [name, setName] = useState(profile?.name || "Mustafa");
  const [age, setAge] = useState(String(profile?.age || 25));
  const [weight, setWeight] = useState(String(profile?.weight || 70));
  const [height, setHeight] = useState(String(profile?.height || 175));
  const [goal, setGoal] = useState(profile?.goal || "muscle");
  const [level, setLevel] = useState(profile?.level || "intermediate");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    await updateUserProfile(user.uid, {
      name,
      age: parseInt(age),
      weight: parseFloat(weight),
      height: parseFloat(height),
      goal,
      level,
    });
    setSaving(false);
  };

  const handleLogout = async () => {
    await logOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Navbar />
      <FloatingAIButton />
      <main className="pt-24 pb-16 md:pb-8">
        <div className="px-6 md:px-[55px] max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-[600] tracking-tight">Settings</h1>
            <p className="text-[var(--color-text-secondary)] mt-1">Customize your experience</p>
          </motion.div>

          {/* Profile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-card rounded-[var(--radius-xl)] p-6 mb-6"
          >
            <h2 className="font-[600] mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-[var(--color-accent)]" />
              Profile
            </h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-[#0d0d0d] font-[700] text-2xl">
                {name.charAt(0)}
              </div>
              <div>
                <h3 className="font-[600] text-lg">{name}</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">{user?.email}</p>
              </div>
            </div>
            <div className="space-y-4">
              <Input label="Name" value={name} onChange={setName} />
              <div className="grid grid-cols-3 gap-3">
                <Input label="Age" type="number" value={age} onChange={setAge} />
                <Input label="Weight (kg)" type="number" value={weight} onChange={setWeight} />
                <Input label="Height (cm)" type="number" value={height} onChange={setHeight} />
              </div>
              <Select
                label="Goal"
                value={goal}
                onChange={setGoal}
                options={[
                  { value: "muscle", label: "Muscle Gain" },
                  { value: "fat-loss", label: "Fat Loss" },
                  { value: "strength", label: "Strength" },
                  { value: "general", label: "General Fitness" },
                ]}
              />
              <Select
                label="Level"
                value={level}
                onChange={setLevel}
                options={[
                  { value: "beginner", label: "Beginner" },
                  { value: "intermediate", label: "Intermediate" },
                  { value: "advanced", label: "Advanced" },
                ]}
              />
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full py-3 rounded-[var(--radius-lg)] bg-[var(--color-accent)] text-[#0d0d0d] font-[600] text-sm hover:bg-[var(--color-accent-hover)] transition-all disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </motion.div>

          {/* Sign Out */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="bg-card rounded-[var(--radius-xl)] p-6 text-center">
              <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--color-accent-soft)] flex items-center justify-center mx-auto mb-3">
                <Dumbbell className="w-6 h-6 text-[var(--color-accent)]" />
              </div>
              <h3 className="font-[600]">MustafaMoves</h3>
              <p className="text-xs text-[var(--color-text-tertiary)] mt-1">Version 1.0.0</p>
              <button
                onClick={handleLogout}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] bg-[var(--color-danger)]/10 text-[var(--color-danger)] text-sm font-[500] hover:bg-[var(--color-danger)]/20 transition-all"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
