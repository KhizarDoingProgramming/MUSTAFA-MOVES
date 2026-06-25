export const images = {
  hero: {
    gym: "/images/hero/gym.jpg",
    cta: "/images/hero/cta.jpg",
    preview: "/images/hero/preview.jpg",
    about: "/images/hero/about.jpg",
  },
  exercises: {
    "bench-press": "/images/exercises/bench-press.jpg",
    squat: "/images/exercises/squat.jpg",
    deadlift: "/images/exercises/deadlift.jpg",
    "overhead-press": "/images/exercises/overhead-press.jpg",
    "pull-ups": "/images/exercises/pull-ups.jpg",
    "dumbbell-row": "/images/exercises/dumbbell-row.jpg",
    lunges: "/images/exercises/lunges.jpg",
    plank: "/images/exercises/plank.jpg",
    "bicep-curls": "/images/exercises/bicep-curls.jpg",
    "lat-pulldown": "/images/exercises/lat-pulldown.jpg",
    "leg-press": "/images/exercises/leg-press.jpg",
    "tricep-dips": "/images/exercises/tricep-dips.jpg",
  },
  guide: {
    hero: "/images/guide/hero.jpg",
  },
  auth: {
    login: "/images/auth/login.jpg",
    signup: "/images/auth/signup.jpg",
  },
} as const;

export function getExerciseImage(id: string): string {
  return images.exercises[id as keyof typeof images.exercises] || images.hero.gym;
}
