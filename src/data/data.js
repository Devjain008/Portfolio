// =============================================================
//  src/data/data.js  —  SINGLE SOURCE OF TRUTH
//  ─────────────────────────────────────────────────────────────
//  Every string, link, and list shown on the site comes from
//  this file. Change a value here → it updates everywhere.
//
//  Admin workflow
//  1. Visit /admin (passcode below)
//  2. Edit fields through the UI — preview live in browser
//  3. Click "Export JSON" → save the file
//  4. Paste exported data back into this file
//  5. Redeploy to Vercel → changes go live for everyone
// =============================================================

// ─── SEO ─────────────────────────────────────────────────────
export const seo = {
  title: "Dev Jain | Aspiring Software Engineer & Data Science Student",
  description:
    "Portfolio of Dev Jain — B.Tech Data Science student at BIRT Bhopal, aspiring software engineer skilled in full-stack development, DSA, and distributed systems.",
  url: "https://devjain.vercel.app", // TODO: update when deployed
  ogImage: "/og-image.png",          // TODO: create a 1200×630 screenshot
};

// ─── PERSONAL ────────────────────────────────────────────────
export const personal = {
  name: "Dev Jain",
  title: "Aspiring Software Engineer & Data Science Student",
  pitch:
    "I build scalable software solutions with strong foundations in Data Structures, Algorithms, and the MERN stack, with a keen interest in distributed systems and large-scale engineering.",
  email: "devj65092@gmail.com",
  phone: "+91-7470791537",
  resume: "/resume.pdf",  // saved in /public/resume.pdf
  avatar: "/avatar.jpg",  // TODO: place your photo at /public/avatar.jpg
  socials: {
    github:      "https://github.com/Devjain008",
    leetcode:    "https://leetcode.com/devjain04",
    codeforces:  "https://codeforces.com/profile/dev_jain_008",
    linkedin:    "https://www.linkedin.com/in/dev-jain-b27786327",
    email:       "mailto:devj65092@gmail.com",
  },
};

// ─── ABOUT ───────────────────────────────────────────────────
export const about = {
  paragraphs: [
    "I'm an Aspiring Software Engineer and B.Tech Data Science student at Bansal Institute of Research & Technology (BIRT), Bhopal (2024–2028), with strong foundations in Data Structures, Algorithms, and Full-Stack Development.",
    "Proficient in C++, Python, JavaScript, REST APIs, Machine Learning/Deep Learning, and the MERN stack, with 1100+ LeetCode problems solved (Knight, rating 1845) and Codeforces Pupil (max rating 1372). Experienced in developing scalable software solutions through hackathons and projects, with a strong interest in distributed systems.",
  ],
  stats: [
    { label: "LeetCode Problems", value: "1100+" },
    { label: "LeetCode Rating",   value: "1845"  },
    { label: "Hackathons",        value: "3"     },
    { label: "Full-Stack Projects", value: "2"   },
  ],
};

// ─── SKILLS ──────────────────────────────────────────────────
// To add a skill: add a string to the relevant items array.
// To add a group: add a new object { category, items }.
export const skills = [
  {
    id: "languages",
    category: "Languages",
    icon: "⟨/⟩",
    items: ["C", "C++", "Python", "JavaScript"],
  },
  {
    id: "frontend",
    category: "Frontend",
    icon: "🖥",
    items: ["HTML", "CSS", "React.js"],
  },
  {
    id: "backend",
    category: "Backend",
    icon: "⚙",
    items: ["Node.js", "Express.js", "REST APIs", "MERN Stack", "JWT Auth"],
  },
  {
    id: "databases",
    category: "Databases",
    icon: "🗄",
    items: ["MySQL", "MongoDB"],
  },
  {
    id: "analytics",
    category: "Data Analytics & ML",
    icon: "📊",
    items: ["Power BI", "Excel", "Pandas", "NumPy", "Matplotlib", "Machine Learning", "Deep Learning"],
  },
  {
    id: "tools",
    category: "Tools",
    icon: "🛠",
    items: ["Git", "GitHub", "VS Code"],
  },
  {
    id: "cs",
    category: "CS Fundamentals",
    icon: "📚",
    items: ["Data Structures & Algorithms", "Object-Oriented Programming", "DBMS", "Operating Systems"],
  },
];

// ─── PROJECTS ────────────────────────────────────────────────
// To add a project: append an object to this array.
// isPlaceholder: true  →  renders as "coming soon" card.
export const projects = [
  {
    id: 1,
    title: "Rural Connection",
    subtitle: "Rural & Semi-Urban Digital Platform",
    year: "2026",
    description:
      "A bilingual (Hindi/English) platform connecting rural and semi-urban users with local jobs, businesses, and retail/wholesale products.",
    longDescription:
      "Rural Connection bridges the digital divide for rural and semi-urban communities. It features role-based modules for Users, Retailers, and Admins — covering authentication, business verification, product management, job applications, and order tracking. Location-based discovery is powered by MongoDB geospatial indexing, and a Trie-based autocomplete accelerates product and job searches. The platform integrates a Hindi/English Gemini AI assistant via a secure backend service, with REST APIs, JWT auth, request validation, and centralized error handling throughout.",
    highlights: [
      "Bilingual (Hindi/English) UI and AI assistant powered by Gemini API",
      "Role-based modules: User, Retailer, Admin with full auth flow",
      "MongoDB geospatial indexing for location-based discovery",
      "Trie-based autocomplete for real-time product and job search",
      "Secure backend proxy for Gemini API — no key exposure on client",
    ],
    stack: ["React", "Vite", "Node.js", "Express.js", "MongoDB", "JWT", "Gemini API"],
    github: "https://github.com/Devjain008/RuralConnection",
    live:   "",                                            // TODO: add live URL when deployed
    image:  "/projects/ruralconnect.png",                 // TODO: add screenshot
    isPlaceholder: false,
  },
  {
    id: 2,
    title: "Jan-Seva",
    subtitle: "AI-Powered Multilingual Civic Platform",
    year: "2026",
    description:
      "An AI-powered multilingual platform with grievance management, government scheme recommendations, and role-based dashboards for citizen services.",
    longDescription:
      "Jan-Seva is an AI-powered civic-tech platform built for rural governance and citizen empowerment. Citizens can file and track grievances, discover government schemes tailored to their profile, and access agriculture assistance. Role-based dashboards serve citizens, gram panchayat officials, and administrators. REST APIs power all interactions, and the MySQL schema is designed for scalability and multilingual data.",
    highlights: [
      "AI-powered multilingual support for rural citizens",
      "Grievance management with real-time status tracking",
      "Government scheme recommendation engine",
      "Agriculture assistance and job listing modules",
      "Scalable MySQL schema for multilingual services",
    ],
    stack: ["React.js", "Node.js", "MySQL"],
    github: "https://github.com/Devjain008/Jan-Seva",
    live:   "",                                             // TODO: add live URL
    image:  "/projects/smart-village.png",                 // TODO: add screenshot
    isPlaceholder: false,
  },
];

// ─── COMPETITIVE PROGRAMMING ─────────────────────────────────
export const cp = {
  leetcode: {
    platform:    "LeetCode",
    handle:      "devjain04",
    badge:       "Knight",
    rating:      1845,
    solved:      "1100+",
    profileUrl:  "https://leetcode.com/devjain04",
    // Public stats-card — falls back to static numbers if image fails
    statsCardUrl: "https://leetcard.jacoblin.cool/devjain04?theme=dark&font=baloo_2&ext=activity",
  },
  codeforces: {
    platform:   "Codeforces",
    handle:     "dev_jain_008",
    badge:      "Pupil",
    rating:     1372,
    maxRating:  1372,
    solved:     "354",
    streak:     "67 days",
    profileUrl: "https://codeforces.com/profile/dev_jain_008",
    // Codeforces stats card via codeforces-readme-stats
    statsCardUrl: "https://codeforces-readme-stats.vercel.app/api/card?username=dev_jain_008&theme=dark",
  },
};

// ─── EDUCATION ───────────────────────────────────────────────
export const education = [
  {
    id: "btech",
    degree: "B.Tech in Data Science",
    institution: "Bansal Institute of Research & Technology (BIRT)",
    location: "Bhopal, MP",
    period: "2024 – 2028",
    score: "",
    status: "ongoing",
  },
  {
    id: "12th",
    degree: "12th — Higher Secondary",
    institution: "All Saint's English High Secondary School",
    location: "Bhopal, MP",
    period: "2024",
    score: "89.2%",
    status: "completed",
  },
  {
    id: "10th",
    degree: "10th — Secondary",
    institution: "Little Angel High Secondary School",
    location: "Bhopal, MP",
    period: "2022",
    score: "86.2%",
    status: "completed",
  },
];

export const coursework = [
  "Data Structures & Algorithms",
  "Object-Oriented Programming",
  "Database Management Systems",
  "Operating Systems",
];

// ─── ACHIEVEMENTS ────────────────────────────────────────────
export const achievements = [
  {
    id: "knight",
    title: "LeetCode Knight",
    metric: "Rating: 1845",
    description:
      "Achieved Knight rank with a 1845 rating and 1100+ problems solved across DSA patterns and algorithm optimization.",
    icon: "trophy",
  },
  {
    id: "codeforces-pupil",
    title: "Codeforces Pupil",
    metric: "Max Rating: 1372",
    description:
      "Attained Pupil rank with 354+ problems solved and maintained a peak consistency streak of 67 consecutive days.",
    icon: "award",
  },
  {
    id: "hackathons",
    title: "3× Hackathon Participant",
    metric: "3 Hackathons",
    description:
      "Delivered complete end-to-end software solutions under strict deadlines, building platforms like Rural Connection and Jan-Seva.",
    icon: "zap",
  },
];

// ─── NAV LINKS ───────────────────────────────────────────────
export const navLinks = [
  { label: "About",        href: "#about"        },
  { label: "Skills",       href: "#skills"       },
  { label: "Projects",     href: "#projects"     },
  { label: "CP",           href: "#cp"           },
  { label: "Education",    href: "#education"    },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact",      href: "#contact"      },
];

// ─── EMAILJS CONFIG ──────────────────────────────────────────
// Sign up at https://www.emailjs.com/
// Create a service + email template, then paste IDs below.
// Template variables expected: {{name}}, {{email}}, {{message}}
export const emailjsConfig = {
  serviceId:  "YOUR_SERVICE_ID",  // TODO: replace
  templateId: "YOUR_TEMPLATE_ID", // TODO: replace
  publicKey:  "YOUR_PUBLIC_KEY",  // TODO: replace
};

// ─── ADMIN CONFIG ────────────────────────────────────────────
// ⚠️  CLIENT-SIDE ONLY — not real security.
// This passcode simply prevents casual visitors from stumbling
// into the admin panel. Do NOT use a password you use elsewhere.
export const adminConfig = {
  passcode: "devjain2024", // TODO: change to something personal
};
