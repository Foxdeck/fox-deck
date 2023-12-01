import {PrismaService} from "../src/shared/services/prisma.service";
import {v4 as uuidv4} from 'uuid';

const prisma = new PrismaService();
let userId1 = "";
let userId2 = "";

function isEven(num: number): boolean {
  return num % 2 === 0;
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
      const questionNumber = i + 1;
      const question = {
        question: `Question ${questionNumber}`,
        average: 0,
        authorId: getRandomUserId(),
        goodAt: 0,
        isPublic: isEven(i),
        id: uuidv4(),
        notGoodAt: 0,
        solution: `Solution for question ${questionNumber}`,
      };
      await prisma.question.create({
        data: question
      });
    }
  }

  await prisma.$executeRawUnsafe("DELETE FROM main.Question;")
  await prisma.$executeRawUnsafe("DELETE FROM main.User;")
  await createUsers();
  await createQuestions();

  return prisma;
}