export const projects = [
  {
    id: 1,
    title: "Daniel Galvin's Trichology Clinic",
    description:
      "A high-conversion landing page for a premium hair clinic, featuring a clean, medical-grade aesthetic, treatment overviews, and optimized appointment CTAs.",
    tags: ["React", "Conversion-Focused", "Premium Design"],
    link: "https://v0-daniel-galvin-hair-clinic.vercel.app/",
    desktopMockup: "/assets/mockups/hairclinic_desktop.png",
    mobileMockup: "/assets/mockups/hairclinic_mobile.png",
  },
  {
    id: 2,
    title: "Trichology Demo",
    description:
      "Conversion-focused marketing site with modal CTAs, anchor-based navigation, and a dedicated contact page, built to turn visitors into leads.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Shadcn UI"],
    link: "https://trichology-demo.vercel.app/",
    desktopMockup: "/assets/mockups/trichology_desktop.png",
    mobileMockup: "/assets/mockups/trichology_mobile.png",
  },
  {
    id: 3,
    title: "Studify AI",
    description:
      "AI-powered study system that transforms uploaded documents into flashcards and quizzes for university students — built as a personal project.",
    tags: ["Next.js", "TypeScript", "Tailwind", "AI"],
    link: "https://studifyai.online",
    desktopMockup: "/assets/mockups/studify_desktop.png",
    mobileMockup: "/assets/mockups/studify_mobile.png",
  },
];

export const profile = {
  name: "Mahmoud Moustafa",
  profileImage: "/profile.jpg",
  birthDate: "2000-07-30",
  locations: ["Giza, Egypt", "Riyadh, Saudi Arabia"],
  availability: "Available for remote projects worldwide.",
  summary:
    "I specialize in building conversion-focused websites for service businesses. My focus is on what happens after someone lands on your page — do they book, call, or buy? That's what I optimize for.",
  why: "Most businesses lose clients before they ever speak to them — because their website doesn't do enough. I fix that.",
  differentiator: "I don't just build websites that look good. I build ones that earn back their cost.",
  stats: [
    // Adjust these numbers to match your actual track record
    { value: "10+", label: "Projects delivered" },
    { value: "4+",  label: "Years of experience" },
    { value: "3",   label: "Countries worked in" },
  ],
  links: {
    email: "mahmoudmoustafa.ca@gmail.com",
    linkedin: "https://www.linkedin.com/in/mahmoud-moustafa-99727122a/",
    // TODO: Replace XXXXXXXXXXX with your number, country code + digits, no + or spaces (e.g. 201234567890)
    whatsapp: "https://wa.me/966510267231",
  }
};
