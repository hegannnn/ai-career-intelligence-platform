export const ROLES = [
  'data scientist',
  'ai engineer',
  'backend developer',
  'frontend developer',
  'ml engineer',
  'devops engineer',
] as const;

export const CITIES = [
  'bangalore',
  'mumbai',
  'delhi',
  'hyderabad',
  'pune',
  'chennai',
  'other',
] as const;

export const TABS = [
  { id: 'resume' as const, step: 1, label: 'Resume', desc: 'Upload & score PDF' },
  { id: 'skills' as const, step: 2, label: 'Skill Gap', desc: 'Compare to a role' },
  { id: 'jobs' as const, step: 3, label: 'Job Match', desc: 'ML semantic match' },
];

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function scoreLevel(score: number): 'good' | 'mid' | 'low' {
  if (score >= 75) return 'good';
  if (score >= 50) return 'mid';
  return 'low';
}
