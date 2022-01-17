import { PrismaClient } from '.prisma/client';

const prisma = new PrismaClient();

async function seed() {
  await prisma.user.create({
    data: {
      firstName: 'Benedikt',
      lastName: 'Schnatterbeck',
      email: 'ben@example.com',
      passwordHash:
        '$argon2i$v=19$m=4096,t=3,p=1$rc3B3lzJld07Yg$Gt2V0PipGL5xq8U7nRu5g+WiG/H5gMxgwjoTjLfU7NI',
    },
  });
}

seed();
