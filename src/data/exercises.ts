export interface Exercise {
  id: string;
  name: string;
  targetMuscles: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  instructions: string[];
  image: string;
  category: string;
  sets?: number;
  reps?: string;
  rest?: string;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  goal: string;
  level: string;
  days: WorkoutDay[];
  createdAt: string;
}

export interface WorkoutDay {
  day: string;
  focus: string;
  exercises: Exercise[];
  isRestDay: boolean;
}

export const exercises: Exercise[] = [
  {
    id: "bench-press",
    name: "Barbell Bench Press",
    targetMuscles: ["Chest", "Triceps", "Front Delts"],
    difficulty: "Intermediate",
    instructions: [
      "Lie flat on a bench with feet firmly on the floor",
      "Grip the barbell slightly wider than shoulder-width",
      "Unrack the bar and lower it to your mid-chest",
      "Press the bar back up to full arm extension",
      "Keep your shoulder blades pinned throughout",
    ],
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
    category: "Chest",
    sets: 4,
    reps: "8-12",
    rest: "90s",
  },
  {
    id: "squat",
    name: "Barbell Back Squat",
    targetMuscles: ["Quads", "Glutes", "Hamstrings"],
    difficulty: "Intermediate",
    instructions: [
      "Position the bar on your upper traps",
      "Stand with feet shoulder-width apart",
      "Brace your core and descend until thighs are parallel",
      "Drive through your heels to stand back up",
      "Keep your chest up and knees tracking over toes",
    ],
    image: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=800&q=80",
    category: "Legs",
    sets: 4,
    reps: "6-10",
    rest: "120s",
  },
  {
    id: "deadlift",
    name: "Conventional Deadlift",
    targetMuscles: ["Back", "Glutes", "Hamstrings"],
    difficulty: "Advanced",
    instructions: [
      "Stand with feet hip-width apart, bar over mid-foot",
      "Hinge at hips and grip the bar just outside knees",
      "Brace your core, flatten your back",
      "Drive through the floor, extending hips and knees",
      "Lock out at the top with shoulders back",
    ],
    image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=80",
    category: "Back",
    sets: 4,
    reps: "5-8",
    rest: "150s",
  },
  {
    id: "overhead-press",
    name: "Standing Overhead Press",
    targetMuscles: ["Shoulders", "Triceps", "Core"],
    difficulty: "Intermediate",
    instructions: [
      "Grip the barbell at shoulder width",
      "Start with the bar at collarbone height",
      "Press the bar overhead in a straight line",
      "Lock out arms fully above your head",
      "Lower the bar back to starting position with control",
    ],
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80",
    category: "Shoulders",
    sets: 4,
    reps: "8-12",
    rest: "90s",
  },
  {
    id: "pull-ups",
    name: "Pull-Ups",
    targetMuscles: ["Lats", "Biceps", "Core"],
    difficulty: "Intermediate",
    instructions: [
      "Hang from a bar with palms facing away",
      "Engage your lats and pull your chest to the bar",
      "Drive elbows down and back",
      "Pause briefly at the top",
      "Lower yourself with control to full extension",
    ],
    image: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800&q=80",
    category: "Back",
    sets: 3,
    reps: "8-12",
    rest: "90s",
  },
  {
    id: "dumbbell-row",
    name: "Single-Arm Dumbbell Row",
    targetMuscles: ["Lats", "Rhomboids", "Biceps"],
    difficulty: "Beginner",
    instructions: [
      "Place one knee and hand on a bench",
      "Hold a dumbbell in the opposite hand",
      "Pull the dumbbell to your hip",
      "Squeeze your shoulder blade at the top",
      "Lower with control and repeat",
    ],
    image: "https://images.unsplash.com/photo-1581009137042-b5422489b831?w=800&q=80",
    category: "Back",
    sets: 3,
    reps: "10-12",
    rest: "60s",
  },
  {
    id: "lunges",
    name: "Walking Lunges",
    targetMuscles: ["Quads", "Glutes", "Hamstrings"],
    difficulty: "Beginner",
    instructions: [
      "Stand tall with feet together",
      "Step forward with one leg into a lunge",
      "Lower until both knees are at 90 degrees",
      "Push off the front foot to step forward",
      "Alternate legs as you walk forward",
    ],
    image: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=800&q=80",
    category: "Legs",
    sets: 3,
    reps: "12 each",
    rest: "60s",
  },
  {
    id: "plank",
    name: "Plank Hold",
    targetMuscles: ["Core", "Shoulders", "Glutes"],
    difficulty: "Beginner",
    instructions: [
      "Get into a forearm plank position",
      "Keep your body in a straight line",
      "Engage your core and squeeze glutes",
      "Breathe normally throughout",
      "Hold for the prescribed time",
    ],
    image: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=800&q=80",
    category: "Core",
    sets: 3,
    reps: "30-60s",
    rest: "45s",
  },
  {
    id: "bicep-curls",
    name: "Dumbbell Bicep Curls",
    targetMuscles: ["Biceps", "Forearms"],
    difficulty: "Beginner",
    instructions: [
      "Stand with a dumbbell in each hand",
      "Keep elbows close to your torso",
      "Curl the weights up by contracting biceps",
      "Squeeze at the top for a brief pause",
      "Lower slowly to the starting position",
    ],
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80",
    category: "Arms",
    sets: 3,
    reps: "12-15",
    rest: "45s",
  },
  {
    id: "lat-pulldown",
    name: "Lat Pulldown",
    targetMuscles: ["Lats", "Biceps", "Rear Delts"],
    difficulty: "Beginner",
    instructions: [
      "Sit at the lat pulldown machine",
      "Grip the bar wider than shoulder-width",
      "Pull the bar down to your upper chest",
      "Squeeze your lats at the bottom",
      "Return the bar up with control",
    ],
    image: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800&q=80",
    category: "Back",
    sets: 3,
    reps: "10-12",
    rest: "60s",
  },
  {
    id: "leg-press",
    name: "Leg Press",
    targetMuscles: ["Quads", "Glutes", "Hamstrings"],
    difficulty: "Beginner",
    instructions: [
      "Sit in the leg press machine",
      "Place feet shoulder-width on the platform",
      "Release the safety locks",
      "Lower the platform until knees are at 90 degrees",
      "Press back up without locking knees",
    ],
    image: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=800&q=80",
    category: "Legs",
    sets: 4,
    reps: "10-15",
    rest: "90s",
  },
  {
    id: "tricep-dips",
    name: "Tricep Dips",
    targetMuscles: ["Triceps", "Chest", "Shoulders"],
    difficulty: "Intermediate",
    instructions: [
      "Position hands on a bench behind you",
      "Extend legs forward or bend knees",
      "Lower your body by bending elbows",
      "Go down until elbows are at 90 degrees",
      "Push back up to full arm extension",
    ],
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80",
    category: "Arms",
    sets: 3,
    reps: "10-15",
    rest: "60s",
  },
];

export const workoutGoals = [
  { id: "muscle", label: "Muscle Gain", icon: "💪", description: "Build lean muscle mass with progressive overload" },
  { id: "fat-loss", label: "Fat Loss", icon: "🔥", description: "Burn calories and shed body fat effectively" },
  { id: "strength", label: "Strength", icon: "🏋️", description: "Increase your maximal strength and power" },
  { id: "general", label: "General Fitness", icon: "⚡", description: "Stay active, healthy, and balanced" },
];

export const fitnessLevels = [
  { id: "beginner", label: "Beginner", description: "New to fitness or returning after a long break" },
  { id: "intermediate", label: "Intermediate", description: "6+ months of consistent training experience" },
  { id: "advanced", label: "Advanced", description: "2+ years of dedicated training experience" },
];

export function generateWorkoutPlan(
  age: number,
  weight: number,
  height: number,
  goal: string,
  level: string
): WorkoutPlan {
  const daysPerWeek = level === "beginner" ? 3 : level === "intermediate" ? 4 : 5;

  const splits: Record<string, WorkoutDay[]> = {
    "3": [
      { day: "Monday", focus: "Full Body", exercises: [exercises[0], exercises[1], exercises[5], exercises[7]], isRestDay: false },
      { day: "Tuesday", focus: "Rest Day", exercises: [], isRestDay: true },
      { day: "Wednesday", focus: "Full Body", exercises: [exercises[3], exercises[4], exercises[6], exercises[8]], isRestDay: false },
      { day: "Thursday", focus: "Rest Day", exercises: [], isRestDay: true },
      { day: "Friday", focus: "Full Body", exercises: [exercises[0], exercises[1], exercises[9], exercises[10]], isRestDay: false },
      { day: "Saturday", focus: "Rest Day", exercises: [], isRestDay: true },
      { day: "Sunday", focus: "Rest Day", exercises: [], isRestDay: true },
    ],
    "4": [
      { day: "Monday", focus: "Upper Body", exercises: [exercises[0], exercises[3], exercises[4], exercises[11]], isRestDay: false },
      { day: "Tuesday", focus: "Lower Body", exercises: [exercises[1], exercises[6], exercises[10], exercises[7]], isRestDay: false },
      { day: "Wednesday", focus: "Rest Day", exercises: [], isRestDay: true },
      { day: "Thursday", focus: "Push", exercises: [exercises[0], exercises[3], exercises[11], exercises[8]], isRestDay: false },
      { day: "Friday", focus: "Pull & Legs", exercises: [exercises[4], exercises[5], exercises[1], exercises[6]], isRestDay: false },
      { day: "Saturday", focus: "Rest Day", exercises: [], isRestDay: true },
      { day: "Sunday", focus: "Rest Day", exercises: [], isRestDay: true },
    ],
    "5": [
      { day: "Monday", focus: "Chest & Triceps", exercises: [exercises[0], exercises[11], exercises[8], exercises[7]], isRestDay: false },
      { day: "Tuesday", focus: "Back & Biceps", exercises: [exercises[4], exercises[5], exercises[9], exercises[8]], isRestDay: false },
      { day: "Wednesday", focus: "Legs", exercises: [exercises[1], exercises[6], exercises[10], exercises[7]], isRestDay: false },
      { day: "Thursday", focus: "Rest Day", exercises: [], isRestDay: true },
      { day: "Friday", focus: "Shoulders & Arms", exercises: [exercises[3], exercises[8], exercises[11], exercises[7]], isRestDay: false },
      { day: "Saturday", focus: "Full Body", exercises: [exercises[1], exercises[4], exercises[0], exercises[6]], isRestDay: false },
      { day: "Sunday", focus: "Rest Day", exercises: [], isRestDay: true },
    ],
  };

  const adjustedExercises = splits[String(daysPerWeek)] || splits["3"];

  if (goal === "fat-loss") {
    adjustedExercises.forEach((day) => {
      if (!day.isRestDay) {
        day.exercises = day.exercises.map((ex) => ({
          ...ex,
          sets: 3,
          reps: "15-20",
          rest: "30s",
        }));
      }
    });
  } else if (goal === "strength") {
    adjustedExercises.forEach((day) => {
      if (!day.isRestDay) {
        day.exercises = day.exercises.map((ex) => ({
          ...ex,
          sets: 5,
          reps: "3-6",
          rest: "180s",
        }));
      }
    });
  }

  return {
    id: `plan-${Date.now()}`,
    name: `${goal.charAt(0).toUpperCase() + goal.slice(1).replace("-", " ")} Program`,
    goal,
    level,
    days: adjustedExercises,
    createdAt: new Date().toISOString(),
  };
}
