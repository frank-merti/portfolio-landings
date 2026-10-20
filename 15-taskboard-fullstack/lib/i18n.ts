import { cookies } from 'next/headers';
import { LANGUAGE_COOKIE } from './constants';

export { LANGUAGE_COOKIE };
import { prisma } from './db';
import { SESSION_COOKIE } from './auth';

export type Language = 'es' | 'en';

export const dictionaries = {
  es: {
    app_name: 'Taskboard',
    nav_boards: 'Tableros',
    nav_login: 'Iniciar sesión',
    nav_register: 'Crear cuenta',
    nav_logout: 'Cerrar sesión',
    hero_title: 'Un tablero, cero caos.',
    hero_subtitle:
      'Crea tableros, organiza tareas por estado y prioridad, y trabaja con tu equipo en tiempo real.',
    hero_cta: 'Crear cuenta gratis',
    hero_secondary: 'Iniciar sesión',
    features_title: 'Lo que incluye',
    f1: 'Tableros por equipo',
    f1d: 'Crea tantos tableros como necesites, cada uno con su contexto.',
    f2: 'Tareas con prioridad',
    f2d: 'Baja, media o alta: el equipo sabe siempre qué va primero.',
    f3: 'Sesiones seguras',
    f3d: 'Contraseñas con scrypt y sesiones con expiración en la base de datos.',
    f4: 'API REST',
    f4d: 'Cada acción del producto está expuesta en endpoints JSON.',
    auth_email: 'Correo electrónico',
    auth_password: 'Contraseña',
    auth_name: 'Nombre',
    auth_login_title: 'Inicia sesión',
    auth_login_subtitle: 'Entra a tus tableros y sigue donde lo dejaste.',
    auth_register_title: 'Crea tu cuenta',
    auth_register_subtitle: 'Empieza a organizar el trabajo en menos de un minuto.',
    auth_submit_login: 'Entrar',
    auth_submit_register: 'Crear cuenta',
    auth_no_account: '¿No tienes cuenta?',
    auth_have_account: '¿Ya tienes cuenta?',
    boards_title: 'Mis tableros',
    boards_empty: 'Todavía no tienes tableros. Crea el primero.',
    board_new: 'Nuevo tablero',
    board_name: 'Nombre del tablero',
    board_description: 'Descripción',
    board_create: 'Crear tablero',
    board_tasks: 'Tareas',
    task_new: 'Nueva tarea',
    task_title: 'Título de la tarea',
    task_notes: 'Notas',
    task_priority: 'Prioridad',
    task_create: 'Añadir tarea',
    task_move: 'Mover',
    task_delete: 'Eliminar',
    status_todo: 'Por hacer',
    status_doing: 'En curso',
    status_done: 'Hecho',
    priority_low: 'Baja',
    priority_medium: 'Media',
    priority_high: 'Alta',
    error_generic: 'Algo salió mal. Inténtalo de nuevo.',
    logout: 'Cerrar sesión',
    language: 'Idioma',
    footer: 'Taskboard · Proyecto de portafolio · MIT License'
  },
  en: {
    app_name: 'Taskboard',
    nav_boards: 'Boards',
    nav_login: 'Sign in',
    nav_register: 'Create account',
    nav_logout: 'Sign out',
    hero_title: 'One board, zero chaos.',
    hero_subtitle:
      'Create boards, organize tasks by status and priority, and work with your team in real time.',
    hero_cta: 'Create a free account',
    hero_secondary: 'Sign in',
    features_title: 'What you get',
    f1: 'Boards per team',
    f1d: 'Create as many boards as you need, each one with its own context.',
    f2: 'Tasks with priority',
    f2d: 'Low, medium or high: the team always knows what goes first.',
    f3: 'Secure sessions',
    f3d: 'scrypt password hashing and database backed sessions with expiry.',
    f4: 'REST API',
    f4d: 'Every action in the product is exposed as a JSON endpoint.',
    auth_email: 'Email',
    auth_password: 'Password',
    auth_name: 'Name',
    auth_login_title: 'Sign in',
    auth_login_subtitle: 'Open your boards and pick up where you left off.',
    auth_register_title: 'Create your account',
    auth_register_subtitle: 'Start organizing the work in under a minute.',
    auth_submit_login: 'Sign in',
    auth_submit_register: 'Create account',
    auth_no_account: 'Do not have an account?',
    auth_have_account: 'Already have an account?',
    boards_title: 'My boards',
    boards_empty: 'No boards yet. Create the first one.',
    board_new: 'New board',
    board_name: 'Board name',
    board_description: 'Description',
    board_create: 'Create board',
    board_tasks: 'Tasks',
    task_new: 'New task',
    task_title: 'Task title',
    task_notes: 'Notes',
    task_priority: 'Priority',
    task_create: 'Add task',
    task_move: 'Move',
    task_delete: 'Delete',
    status_todo: 'To do',
    status_doing: 'In progress',
    status_done: 'Done',
    priority_low: 'Low',
    priority_medium: 'Medium',
    priority_high: 'High',
    error_generic: 'Something went wrong. Please try again.',
    logout: 'Sign out',
    language: 'Language',
    footer: 'Taskboard · Portfolio project · MIT License'
  }
} as const;

export type Dictionary = (typeof dictionaries)['en'];

export function getLanguage(): Language {
  const value = cookies().get(LANGUAGE_COOKIE)?.value;
  return value === 'en' ? 'en' : 'es';
}

export function getDictionary(language: Language = getLanguage()): Dictionary {
  return dictionaries[language] as unknown as Dictionary;
}
