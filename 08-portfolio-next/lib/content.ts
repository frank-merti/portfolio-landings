export type Language = 'es' | 'en';

export const content = {
  es: {
    nav_about: 'Sobre mí',
    nav_skills: 'Skills',
    nav_projects: 'Proyectos',
    nav_exp: 'Experiencia',
    nav_contact: 'Contacto',
    hero_eb: 'Hola, soy Francisco 👋',
    hero_t: 'Desarrollador Full-Stack creando experiencias digitales.',
    hero_s: 'Especializado en React, Next.js, Tailwind y Node. Construyo productos web rápidos, accesibles y hermosos.',
    hero_c1: 'Ver proyectos',
    hero_c2: 'Contactar',
    hero_note: 'Disponible para proyectos freelance y full-time',
    about_title: 'Sobre mí',
    about_p: 'Soy desarrollador apasionado por el diseño y el código. Me gusta unir UX/UI con arquitecturas sólidas. He construido landing pages, dashboards, e-commerce headless y apps móviles. Trabajo con React, Next.js, Tailwind, Node y bases de datos SQL/NoSQL.',
    skills_title: 'Stack técnico',
    skills_sub: 'Herramientas con las que construyo día a día.',
    projects_title: 'Proyectos destacados',
    projects_sub: 'Una selección de landings y apps que he desarrollado.',
    exp_title: 'Experiencia',
    exp_sub: 'Mi trayectoria profesional.',
    blog_title: 'Blog & Artículos',
    blog_sub: 'Lo que comparto con la comunidad.',
    contact_title: 'Trabajemos juntos',
    contact_sub: 'Envíame un mensaje y te respondo en 24h.',
    contact_cta: 'Enviar mensaje',
    view_project: 'Ver proyecto →',
    ft: '© 2026 Francisco M. · MIT License'
  },
  en: {
    nav_about: 'About',
    nav_skills: 'Skills',
    nav_projects: 'Projects',
    nav_exp: 'Experience',
    nav_contact: 'Contact',
    hero_eb: "Hi, I'm Francisco 👋",
    hero_t: 'Full-Stack Developer crafting digital experiences.',
    hero_s: 'Specialized in React, Next.js, Tailwind and Node. I build fast, accessible and beautiful web products.',
    hero_c1: 'View projects',
    hero_c2: 'Contact',
    hero_note: 'Open to freelance and full-time opportunities',
    about_title: 'About me',
    about_p: 'I am a developer passionate about design and code. I love merging UX/UI with solid architectures. I have built landing pages, dashboards, headless e-commerce and mobile apps. I work with React, Next.js, Tailwind, Node and SQL/NoSQL databases.',
    skills_title: 'Tech stack',
    skills_sub: 'Tools I build with every day.',
    projects_title: 'Featured projects',
    projects_sub: 'A selection of landings and apps I have developed.',
    exp_title: 'Experience',
    exp_sub: 'My professional journey.',
    blog_title: 'Blog & Articles',
    blog_sub: 'What I share with the community.',
    contact_title: "Let's work together",
    contact_sub: 'Send me a message and I reply within 24h.',
    contact_cta: 'Send message',
    view_project: 'View project →',
    ft: '© 2026 Francisco M. · MIT License'
  }
} satisfies Record<Language, Record<string, string>>;

export type Project = {
  title: string;
  description: string;
  technologies: string[];
  gradient: string;
  href: string;
};

export const projects: Project[] = [
  { title: 'Nebula Studio', description: 'Agencia digital creativa con identidad de marca y web en Next.js.', technologies: ['Next.js', 'Tailwind', 'TypeScript'], gradient: 'from-pink-500 to-rose-500', href: '../01-agency-next' },
  { title: 'Flowboard', description: 'SaaS de gestión de proyectos: kanban, docs, automatizaciones y pricing.', technologies: ['Next.js', 'Tailwind'], gradient: 'from-lime-400 to-emerald-500', href: '../02-saas-next' },
  { title: 'La Brasa', description: 'Landing de restaurante de fuego con menú y reservas bilingüe.', technologies: ['HTML', 'Tailwind CDN'], gradient: 'from-orange-500 to-amber-500', href: '../03-restaurante' },
  { title: 'IronForge Gym', description: 'Gimnasio moderno: programas, planes y entrenadores.', technologies: ['HTML', 'Tailwind CDN'], gradient: 'from-lime-400 to-green-600', href: '../04-gimnasio' },
  { title: 'Altura Homes', description: 'Bienes raíces premium con catálogo de propiedades.', technologies: ['HTML', 'Tailwind CDN'], gradient: 'from-amber-400 to-yellow-600', href: '../05-inmobiliaria' },
  { title: 'DevConf 2026', description: 'Landing de conferencia tech: speakers, agenda y tickets.', technologies: ['HTML', 'Tailwind CDN'], gradient: 'from-cyan-400 to-violet-500', href: '../06-evento' },
  { title: 'Aether H1', description: 'Audífonos premium con ANC: React + Vite, selector de color y carrito.', technologies: ['React', 'Vite', 'Tailwind'], gradient: 'from-amber-600 to-stone-700', href: '../07-producto-react' },
  { title: 'Origen Café', description: 'Cafetería de especialidad: menú, orígenes, sucursales.', technologies: ['HTML', 'Tailwind CDN'], gradient: 'from-amber-700 to-yellow-600', href: '../09-cafe' },
  { title: 'Nomad Routes', description: 'Agencia de viajes: destinos, paquetes, cotizador.', technologies: ['HTML', 'Tailwind CDN'], gradient: 'from-sky-500 to-cyan-500', href: '../10-travel' },
  { title: 'SkillStack Academy', description: 'Plataforma educativa tech: cursos, planes, instructores.', technologies: ['HTML', 'Tailwind CDN'], gradient: 'from-violet-600 to-purple-700', href: '../11-academy' },
  { title: 'NovaClinic', description: 'Clínica médica integral: servicios, doctores, citas.', technologies: ['HTML', 'Tailwind CDN'], gradient: 'from-teal-500 to-emerald-600', href: '../12-clinic' },
  { title: 'Library CLI', description: 'Consola en Java: POO, Merge Sort, búsqueda binaria, Queue y pila LIFO.', technologies: ['Java', 'CLI'], gradient: 'from-orange-500 to-red-600', href: '../13-java-biblioteca' },
  { title: 'Logistics CLI', description: 'Consola en Python: grafo, Dijkstra, BFS, Merge Sort y cola de prioridad.', technologies: ['Python', 'CLI'], gradient: 'from-sky-600 to-blue-700', href: '../14-python-logistics' }
];

export const skills: string[] = [
  'React',
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'Node.js',
  'Express',
  'PostgreSQL',
  'MongoDB',
  'Docker',
  'Git',
  'Figma',
  'REST/GraphQL'
];

export type ExperienceEntry = {
  role: string;
  company: string;
  period: string;
  description: string;
};

export const experience: ExperienceEntry[] = [
  { role: 'Full-Stack Developer', company: 'Agencia Nebula', period: '2023 — Presente', description: 'Desarrollo de landings y apps para clientes fintech, e-commerce y SaaS.' },
  { role: 'Frontend Developer', company: 'Startup Flowboard', period: '2021 — 2023', description: 'UI/UX, design system y migración a Next.js.' },
  { role: 'Junior Developer', company: 'Freelance', period: '2019 — 2021', description: 'Sitios web y pequeñas apps para PYMES.' }
];

export type Article = {
  title: string;
  date: string;
};

export const articles: Article[] = [
  { title: 'Cómo empecé con Next.js App Router', date: 'Oct 2026' },
  { title: 'Tailwind tips para landings memorables', date: 'Sep 2026' },
  { title: 'Accesibilidad en componentes React', date: 'Aug 2026' }
];

export type ContentKey = keyof typeof content.es;

export function translate(language: Language, key: ContentKey): string {
  return content[language][key] ?? key;
}
