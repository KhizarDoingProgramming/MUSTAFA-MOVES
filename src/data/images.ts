export const images = {
  hero: {
    gym: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400&q=80",
    cta: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80",
    preview: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80",
    about: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1000&q=80",
  },
  exercises: {
    "bench-press": "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
    squat: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=800&q=80",
    deadlift: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=80",
    "overhead-press": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80",
    "pull-ups": "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800&q=80",
    "dumbbell-row": "https://images.unsplash.com/photo-1581009137042-b5422489b831?w=800&q=80",
    lunges: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=800&q=80",
    plank: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=800&q=80",
    "bicep-curls": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80",
    "lat-pulldown": "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800&q=80",
    "leg-press": "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=800&q=80",
    "tricep-dips": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80",
  },
  guide: {
    hero: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400&q=80",
  },
  auth: {
    login: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&q=80",
    signup: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80",
  },
} as const;

export function getExerciseImage(id: string): string {
  return images.exercises[id as keyof typeof images.exercises] || images.hero.gym;
}
