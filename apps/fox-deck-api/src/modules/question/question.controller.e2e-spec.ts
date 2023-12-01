import {Test, TestingModule} from '@nestjs/testing'
import {HttpStatus, INestApplication} from "@nestjs/common";
import * as request from "supertest";
import {QuestionModule} from "./question.module";
import {setupDatabase} from "../../../prisma/setup-test-db";
import {PrismaClient} from "@prisma/client";

// these parameters are passed at every request to the database.
const defaultQueryArgs = {
  take: 10, include: {
    author: {
      select: {
        username: true,
      },
    },
  }
};

describe('QuestionController', () => {
  let app: INestApplication;
  let prisma: PrismaClient;

  beforeEach(async () => {

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [QuestionModule]
    }).compile();

    prisma = await setupDatabase();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe("GET /question", () => {
    it('should return a list of 10 questions', async () => {
      const expected = await prisma.question.findMany(defaultQueryArgs);

      await request(app.getHttpServer())
        .get("/question")
        .expect(HttpStatus.OK)
        .expect(expected);
    });

    it('should return the 3rd page of questions', async () => {
      const expected = await prisma.question.findMany({...defaultQueryArgs, skip: 20});
      await request(app.getHttpServer())
        .get("/question")
        .query({
          page: 3
        })
        .expect(HttpStatus.OK)
        .expect(expected);
    });

    it('should return an empty list if page is to high', async () => {
      await request(app.getHttpServer())
        .get("/question")
        .query({
          page: 100
        })
        .expect(HttpStatus.OK)
        .expect([]);
    });

    it('should return a list of public questions', async () => {
      const expected = await prisma.question.findMany({ ...defaultQueryArgs, where: { isPublic: true } });
      await request(app.getHttpServer())
        .get("/question")
        .query({
          visibility: ["public"]
        })
        .expect(HttpStatus.OK)
        .expect(expected);
    });

    it('should return a list of private questions', async () => {
      const expected = await prisma.question.findMany({ ...defaultQueryArgs, where: { isPublic: false } });
      await request(app.getHttpServer())
        .get("/question")
        .query({
          visibility: ["private"]
        })
        .expect(HttpStatus.OK)
        .expect(expected);
    });

    it('should find exact one question', async () => {
      const expected = await prisma.question.findMany({ ...defaultQueryArgs, where: { question: "Question 20" } });
      await request(app.getHttpServer())
        .get("/question")
        .query({
          search: "Question 20"
        })
        .expect(HttpStatus.OK)
        .expect(expected);
    });

    it('should find all private questions starting with "Question 2"', async () => {
      const expected = await prisma.question.findMany({ ...defaultQueryArgs,
        where: { question: { contains: "Question 2" }, isPublic: false } });
      await request(app.getHttpServer())
        .get("/question")
        .query({
          search: "Question 2",
          visibility: ["private"]
        })
        .expect(HttpStatus.OK)
        .expect(expected);
    });
  })
});