import {Test, TestingModule} from '@nestjs/testing'
import {HttpStatus, INestApplication} from "@nestjs/common";
import * as request from "supertest";
import {QuestionModule} from "./question.module";
import {setupDatabase} from "../../../prisma/setup-test-db";

describe('QuestionController', () => {
  let app: INestApplication;

  beforeEach(async () => {

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [QuestionModule]
    }).compile();

    await setupDatabase();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe("GET /question",() => {
    it('should return a list of 10 questions', async () => {
      const req = await request(app.getHttpServer())
        .get("/question")
        .expect(HttpStatus.OK)

      expect(req.body.length).toEqual(10);
    });

    it('should return a list of public questions', async () => {
      const req = await request(app.getHttpServer())
        .get("/question")
        .query({
          visibility: ["public"]
        })
        .expect(HttpStatus.OK)

      const body: any[] = req.body;

      body.forEach((question) => {
        expect(question.isPublic).toBeTruthy();
      })
      expect(req.body.length).toEqual(10);
    });

    it('should return a list of private questions', async () => {
      const req = await request(app.getHttpServer())
        .get("/question")
        .query({
          visibility: ["private"]
        })
        .expect(HttpStatus.OK)

      const body: any[] = req.body;

      body.forEach((question) => {
        expect(!question.isPublic).toBeTruthy();
      })
      expect(req.body.length).toEqual(10);
    });
  })
});