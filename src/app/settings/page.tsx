"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Sun,
  Moon,
  User,
  Bell,
  Shield,
  LogOut,
  ChevronRight,
  Dumbbell,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { FloatingAIButton } from "@/components/layout/FloatingAIButton";
import { Card, Button, Input, Select } from "@/components/ui";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";
import { logOut, updateUserProfile } from "@/lib/auth-service";

const settingsSections = [
  {
    title: "Appearance",
    items: [{ id: "theme", label: "Theme", icon: Moon, type: "toggle" as const }],
  },
  {
    title: "Notifications",
    items: [
      { id: "workout-reminders", label: "Workout Reminders", icon: Bell, type: "switch" as const, default: true },
      { id: "weekly-progress", label: "Weekly Progress", icon: Bell, type: "switch" as const, default: true },
    ],
  },
  {
    title: "Privacy",
    items: [
      { id: "profile-visibility", label: "Profile Visibility", icon: Shield, type: "nav" as const },
      { id: "data-export", label: "Export Data", icon: Shield, type: "nav" as const },
    ],
  },
];

export default function SettingsPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { user, profile } = useAuth();
  const [name, setName] = useState(profile?.name || "Mustafa");
  const [age, setAge] = useState(String(profile?.age || 25));
  const [weight, setWeight] = useState(String(profile?.weight || 70));
  const [height, setHeight] = useState(String(profile?.height || 175));
  const [goal, setGoal] = useState(profile?.goal || "muscle");
  const [notifications, setNotifications] = useState({
    "workout-reminders": true,
    "weekly-progress": true,
  });
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
      <main className="md:ml-[72px] lg:ml-[240px] pb-24 md:pb-8">
        <div className="px-6 py-6 flex items-center gap-4">
          <Link href="/" className="md:hidden">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold font-[family-name:var(--font-space)] tracking-tight">
              Settings
            </h1>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Customize your experience
            </p>
          </div>
        </div>

        <div className="px-6 max-w-2xl mx-auto space-y-6">
          {/* Profile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card glass>
              <h2 className="font-semibold font-[family-name:var(--font-space)] mb-4 flex items-center gap-2">
                <User className="w-4 h-4" />
                Profile
              </h2>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  {name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-lg font-[family-name:var(--font-space)]">{name}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {user?.email}
                  </p>
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
                <Button onClick={handleSave} className="w-full" disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Settings Sections */}
          {settingsSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: sectionIndex * 0.1 }}
            >
              <Card glass>
                <h2 className="font-semibold font-[family-name:var(--font-space)] mb-4">
                  {section.title}
                </h2>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--color-bg-tertiary)]/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-4 h-4 text-[var(--color-text-tertiary)]" />
                        <span className="text-sm">{item.label}</span>
                      </div>
                      {item.type === "toggle" && (
                        <button
                          onClick={toggleTheme}
                          className="relative w-12 h-7 rounded-full transition-colors duration-300"
                          style={{
                            backgroundColor:
                              theme === "dark"
                                ? "var(--color-accent)"
                                : "var(--color-bg-tertiary)",
                          }}
                        >
                          <motion.div
                            animate={{ x: theme === "dark" ? 22 : 2 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center"
                          >
                            {theme === "dark" ? (
                              <Moon className="w-3 h-3 text-[var(--color-accent)]" />
                            ) : (
                              <Sun className="w-3 h-3 text-orange-500" />
                            )}
                          </motion.div>
                        </button>
                      )}
                      {item.type === "switch" && (
                        <button
                          onClick={() =>
                            setNotifications((prev) => ({
                              ...prev,
                              [item.id as keyof typeof prev]:
                                !prev[item.id as keyof typeof prev],
                            }))
                          }
                          className="relative w-12 h-7 rounded-full transition-colors duration-300"
                          style={{
                            backgroundColor: notifications[item.id as keyof typeof notifications]
                              ? "var(--color-success)"
                              : "var(--color-bg-tertiary)",
                          }}
                        >
                          <motion.div
                            animate={{
                              x: notifications[item.id as keyof typeof notifications] ? 22 : 2,
                            }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-md"
                          />
                        </button>
                      )}
                      {item.type === "nav" && (
                        <ChevronRight className="w-4 h-4 text-[var(--color-text-tertiary)]" />
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}

          {/* App Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Card glass className="text-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-purple-600 flex items-center justify-center mx-auto mb-3 shadow-lg">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold font-[family-name:var(--font-space)]">
                MustafaMoves
              </h3>
              <p className="text-xs text-[var(--color-text-tertiary)] mt-1">
                Version 1.0.0 • Made with AI
              </p>
              <Button
                variant="danger"
                size="sm"
                className="mt-4"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
