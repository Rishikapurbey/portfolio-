// All site content lives here, so updating the portfolio means editing data, not markup.

export const profile = {
  name: 'Rishika Purbey',
  role: 'Software Developer',
  tagline: 'I’m a full-stack developer who thinks a few moves ahead, from data models to the details users feel.',
  location: 'Siliguri, India',
  email: 'rishikapurbey712@gmail.com',
  links: {
    github: 'https://github.com/Rishikapurbey',
    linkedin: 'https://www.linkedin.com/in/rishika-purbey-464a4025b',
    x: 'https://x.com/RishikaPurbey',
  },
  // Drop the PDF into public/ and set its path here, e.g. '/Rishika-Purbey-Resume.pdf'.
  resume: '/Rishika-Purbey-Resume.pdf' as string | null,
  photo: '/images/profile.jpg',
}

export const contacts = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'LinkedIn', value: 'in/rishika-purbey', href: profile.links.linkedin },
  { label: 'GitHub', value: 'github.com/Rishikapurbey', href: profile.links.github },
  { label: 'X', value: '@RishikaPurbey', href: profile.links.x },
]

export const about = {
  paragraphs: [
    'I’m a software developer at Ralakde Enterprise and a 2026 Computer Science graduate from Siliguri Institute of Technology.',
    'I like owning a feature end to end: modelling the data, writing the API, building the interface, and testing the parts that would hurt if they broke. Strong fundamentals in data structures and algorithms keep the code honest.',
  ],
  offScreen: ['Chess', 'Badminton', 'DSA puzzles'],
}

export type Project = {
  title: string
  genre: string
  logline: string
  highlights: string[]
  stack: string[]
  live?: string
  source: string
  theme: 'emerald' | 'crimson'
}

export const projects: Project[] = [
  {
    title: 'Money Mitra',
    genre: 'Personal finance',
    logline: 'A finance companion for everyday people in India: track money, learn how investing works, and split costs with friends.',
    highlights: [
      'Budgets, goals and monthly insights with charts',
      'Plain-language guides to SIPs, mutual funds, FDs and LIC',
      'Discussion board with anonymous posting',
      'Group expense splitting with settle-up',
    ],
    stack: ['React', 'TypeScript', 'Node', 'Express', 'PostgreSQL', 'Prisma', 'Tailwind'],
    live: 'https://money-mitra-three.vercel.app',
    source: 'https://github.com/Rishikapurbey/Money-Mitra',
    theme: 'emerald',
  },
  {
    title: 'ShowTime',
    genre: 'Movie discovery',
    logline: 'A cinematic movie app: browse, search, rate what you watch, and share your watchlist with a public link.',
    highlights: [
      'Live search with URL-synced filters and paging',
      'Watchlist, ratings and stats synced across devices',
      'Public share links for watchlists',
      'Firestore security rules tested in CI',
    ],
    stack: ['React 19', 'Vite', 'Firebase', 'TanStack Query', 'Vitest'],
    live: 'https://show-time-chi.vercel.app',
    source: 'https://github.com/Rishikapurbey/ShowTime',
    theme: 'crimson',
  },
]

export type Role = {
  title: string
  company: string
  period: string
}

export const experience: Role[] = [
  { title: 'Software Development Engineer', company: 'Ralakde Enterprise', period: 'Oct 2026 — Present' },
  { title: 'Full Stack Developer Intern', company: 'Ralakde Enterprise', period: 'Jul 2026 — Oct 2026' },
]

export const openSource = {
  stats: [
    { value: '37', label: 'Merged pull requests' },
    { value: '12', label: 'Open-source projects' },
    { value: '#49', label: 'NSoC ’26, of 1,139' },
    { value: 'Top 3%', label: 'GSSoC ’26, 1,144 of 47,923' },
  ],
  repos: [
    { name: 'Vector Social Media', prs: 14 },
    { name: 'RankerHub', prs: 9 },
    { name: 'LinkID', prs: 5 },
  ],
  remainder: '9 more PRs across 9 other projects',
  highlights: [
    {
      kind: 'Security',
      text: 'Closed an email-verification bypass: credential signups were auto-verified, so anyone could claim an email they didn’t own. Built a token-based verification flow.',
      project: 'LinkID',
      pr: 'https://github.com/vishnukothakapu/linkid/pull/329',
    },
    {
      kind: 'Reliability',
      text: 'Capped links per user with an atomic check inside a Prisma transaction, so concurrent requests can’t race past the limit.',
      project: 'LinkID',
      pr: 'https://github.com/vishnukothakapu/linkid/pull/343',
    },
    {
      kind: 'Performance',
      text: 'Removed a database query that ran on every authenticated request by fixing an undefined-vs-null check in the JWT callback.',
      project: 'LinkID',
      pr: 'https://github.com/vishnukothakapu/linkid/pull/342',
    },
  ],
}

export const skills: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'SQL', 'HTML', 'CSS'] },
  { group: 'Frameworks', items: ['React', 'Node.js', 'Express', 'Django', 'Tailwind CSS'] },
  { group: 'Data', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Firebase', 'Prisma'] },
  { group: 'Tools', items: ['Git', 'GitHub Actions', 'Docker', 'Vitest'] },
]

export const education = {
  degree: 'B.Tech, Computer Science & Engineering',
  school: 'Siliguri Institute of Technology',
  year: '2026',
  cgpa: '7.58',
}
