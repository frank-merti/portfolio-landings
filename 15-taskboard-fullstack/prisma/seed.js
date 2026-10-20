const { PrismaClient } = require('@prisma/client');
const { randomBytes, scryptSync } = require('node:crypto');

const prisma = new PrismaClient();

function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = scryptSync(password, salt, 64);
  return `${salt}:${derivedKey.toString('hex')}`;
}

async function main() {
  const email = 'demo@taskboard.dev';

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: 'Demo User',
      password: hashPassword('taskboard123')
    }
  });

  const board = await prisma.board.create({
    data: {
      name: 'Sprint 12 — Taskboard',
      description: 'Ejemplo de tablero con tareas en distintos estados y prioridades.',
      color: 'indigo',
      ownerId: user.id,
      tasks: {
        create: [
          { title: 'Diseñar la API de tareas', priority: 'high', status: 'done' },
          { title: 'Implementar autenticación', priority: 'high', status: 'doing' },
          { title: 'Escribir tests del dominio', priority: 'medium', status: 'doing' },
          { title: 'Mejorar estados de carga', priority: 'low', status: 'todo' }
        ]
      }
    }
  });

  console.log(`Seeded board "${board.name}" for ${email} (password: taskboard123)`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
