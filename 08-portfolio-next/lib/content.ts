export type Language = 'es' | 'en';

export const content = {
  es: {
    nav_about: 'Sobre mí',
    nav_skills: 'Skills',
    nav_projects: 'Proyectos',
    nav_exp: 'Experiencia',
    nav_school: 'Escolares',
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
    school_title: 'Proyectos escolares',
    school_sub: 'Trabajos de asignaturas, prácticas y equipos de desarrollo.',
    ft: '© 2026 Francisco M. · MIT License'
  },
  en: {
    nav_about: 'About',
    nav_skills: 'Skills',
    nav_projects: 'Projects',
    nav_exp: 'Experience',
    nav_school: 'School',
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
    school_title: 'School projects',
    school_sub: 'Coursework, labs and team projects built during my degree.',
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
  { title: 'Taskboard', description: 'Kanban full-stack: API REST, auth con scrypt, sesiones en base de datos, Prisma + SQLite y 21 tests.', technologies: ['Next.js', 'Prisma', 'SQLite', 'Zod'], gradient: 'from-indigo-500 to-blue-700', href: '../15-taskboard-fullstack' },
  { title: 'Taskboard API', description: 'REST API con ASP.NET Core 8, EF Core, JWT y 12 tests de integración.', technologies: ['C#', 'ASP.NET Core', 'EF Core', 'SQLite'], gradient: 'from-blue-600 to-indigo-700', href: '../17-dotnet-taskboard-api' },
  { title: 'Algorithms CLI (.NET)', description: 'Merge Sort, Quick Sort, búsqueda binaria, Dijkstra, BFS y caché LRU en C#.', technologies: ['C#', '.NET 8', 'xUnit'], gradient: 'from-purple-600 to-fuchsia-700', href: '../16-dotnet-algorithms' },
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

export type SchoolProject = {
  name: string;
  description: Record<Language, string>;
  technologies: string[];
  url: string;
};

export const schoolProjects: SchoolProject[] = [
  {
    name: 'VitaBot',
    description: {
      es: 'Bot de Discord multifunción: comandos de audio, análisis y entretenimiento, con despliegue en Docker.',
      en: 'Multipurpose Discord bot: audio, analytics and entertainment commands, deployed with Docker.'
    },
    technologies: ['Node.js', 'Discord.js', 'Docker'],
    url: 'https://github.com/frank-merti/VitaBot'
  },
  {
    name: 'CheckNews',
    description: {
      es: 'API Flask que analiza noticias con un modelo de machine learning para detectar contenido falso.',
      en: 'Flask API that analyzes news with a machine learning model to detect fake content.'
    },
    technologies: ['Python', 'Flask', 'scikit-learn', 'Pandas'],
    url: 'https://github.com/frank-merti/CheckNews'
  },
  {
    name: 'PV Restaurante',
    description: {
      es: 'Sistema de punto de venta para restaurante: roles, inventario, reportes PDF y gráficas.',
      en: 'Restaurant point of sale system: roles, inventory, PDF reports and charts.'
    },
    technologies: ['Python', 'PyQt5', 'Matplotlib', 'MySQL'],
    url: 'https://github.com/frank-merti/PV-Restaurante-TDS'
  },
  {
    name: 'GalactiQuest',
    description: {
      es: 'Videojuego shoot-em-up en Python con Pygame, POO y efectos de video con OpenCV.',
      en: 'Shoot-em-up game in Python with Pygame, OOP and OpenCV video effects.'
    },
    technologies: ['Python', 'Pygame', 'OpenCV', 'OOP'],
    url: 'https://github.com/frank-merti/VideojuegoGalactiQuest'
  },
  {
    name: 'OpenGL Java',
    description: {
      es: 'Videojuego 3D en Java con OpenGL y LWJGL, con stages y sistema de audio.',
      en: '3D game in Java with OpenGL and LWJGL, including stages and an audio system.'
    },
    technologies: ['Java', 'OpenGL', 'LWJGL'],
    url: 'https://github.com/frank-merti/VideojuegoOpenGLJava'
  },
  {
    name: 'PDF a TIFF',
    description: {
      es: 'Microservicio en Spring Boot que convierte documentos PDF a imágenes TIFF.',
      en: 'Spring Boot service that converts PDF documents into TIFF images.'
    },
    technologies: ['Java', 'Spring Boot', 'Maven'],
    url: 'https://github.com/frank-merti/Converidor-pdf-a-tiff'
  },
  {
    name: 'Punto de venta',
    description: {
      es: 'Sistema de gestión de tienda: usuarios, proveedores y productos con PyQt5 y MySQL.',
      en: 'Store management system: users, suppliers and products built with PyQt5 and MySQL.'
    },
    technologies: ['Python', 'PyQt5', 'MySQL'],
    url: 'https://github.com/frank-merti/topicos-desarollo'
  },
  {
    name: 'Gestión de tutorías',
    description: {
      es: 'Aplicación de escritorio para administrar sesiones, áreas y usuarios de tutorías.',
      en: 'Desktop app to manage tutoring sessions, areas and users.'
    },
    technologies: ['Python', 'Tkinter', 'tkcalendar'],
    url: 'https://github.com/frank-merti/tutorias_app'
  },
  {
    name: 'CRUD Mobile',
    description: {
      es: 'App móvil en React Native con autenticación de Firebase y operaciones CRUD.',
      en: 'React Native mobile app with Firebase authentication and CRUD operations.'
    },
    technologies: ['React Native', 'Firebase', 'Expo'],
    url: 'https://github.com/frank-merti/ProyectoAppReactNative'
  },
  {
    name: 'Heladería',
    description: {
      es: 'App móvil de heladería con React Native, Firebase y panel de administración.',
      en: 'Ice cream shop mobile app with React Native, Firebase and an admin panel.'
    },
    technologies: ['React Native', 'Firebase'],
    url: 'https://github.com/frank-merti/Heladeria'
  },
  {
    name: 'CheckNews Web',
    description: {
      es: 'Portal web en PHP y MySQL para registrar, reportar y verificar noticias.',
      en: 'PHP and MySQL web portal to submit, report and verify news.'
    },
    technologies: ['PHP', 'MySQL'],
    url: 'https://github.com/frank-merti/CheckNewsPHP'
  },
  {
    name: 'Página Web IS',
    description: {
      es: 'Tienda en línea con catálogo, carrito y gestión de clientes en PHP y MySQL.',
      en: 'Online store with catalog, cart and customer management in PHP and MySQL.'
    },
    technologies: ['PHP', 'MySQL', 'XAMPP'],
    url: 'https://github.com/frank-merti/pagina-web-is'
  }
];

export type ContentKey = keyof typeof content.es;

export function translate(language: Language, key: ContentKey): string {
  return content[language][key] ?? key;
}
