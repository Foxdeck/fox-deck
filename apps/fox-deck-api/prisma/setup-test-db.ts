import {v4 as uuidv4} from 'uuid';
import * as process from "process";
import {PrismaService} from "../src/shared/services/prisma.service";

const prisma = new PrismaService();
let userId1 = "";
let userId2 = "";

function getRandomBoolean() {
  return Math.random() < 0.5;
}

function getRandomUserId(): string {
  return Math.random() < 0.5 ? userId1 : userId2;
}


export async function setupDatabase() {
  async function createUsers() {
    const user1 = await prisma.user.create({
      data: {
        email: "john@mail.com",
        password: "testpassword",
        username: "John Doe",
        firstname: "John",
        secondname: "Doe",
      }
    });
    userId1 = user1.id;

    const user2 = await prisma.user.create({
      data: {
        email: "max@mail.com",
        password: "testpassword",
        username: "Max Muster",
        firstname: "Max",
        secondname: "Muster",
      }
    });
    userId2 = user2.id;
  }

  async function createQuestions() {
    for (let i = 0; i < 50; i++) {
      const question = {
        question: `Question ${i + 1}`,
        average: 0,
        authorId: getRandomUserId(),
        goodAt: 0,
        isPublic: getRandomBoolean(),
        id: uuidv4(),
        lastAnswered: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
        notGoodAt: 0,
        solution: `Solution for question ${i + 1}`,
      };
      await prisma.question.create({
        data: question
      });
    }
  }

  await createUsers();
  await createQuestions();
}

if (process.env.NODE_ENV === 'test') {
  setupDatabase()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

