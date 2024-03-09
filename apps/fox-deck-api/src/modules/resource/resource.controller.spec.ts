import {Test, TestingModule} from "@nestjs/testing";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {ResourceController} from "./resource.controller";
import {ResourceService} from "./resource.service";
import {v4 as uuid} from "uuid";
import {APP_INTERCEPTOR, NestApplication} from "@nestjs/core";
import {ValidationPipe} from "@nestjs/common";
import * as request from 'supertest';
import {ResourceTypes} from "./resource-types.enum";
import {SecurityInterceptor} from "../../shared/interceptors/security.interceptor";
import {JwtBody} from "../../shared/interfaces/jwt-body.interface";

describe("ResourceController", () => {
    let app: NestApplication;
    let resourceService: ResourceService;
    let authorizationHeader: string;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                JwtModule.register({
                    global: true,
                    secret: "PUT_SECRET_HERE",
                    signOptions: {expiresIn: "1y"},
                })
            ],
            controllers: [ResourceController],
            providers: [
                {
                    provide: APP_INTERCEPTOR,
                    useClass: SecurityInterceptor,
                },
                ResourceService],
        }).compile();

        const jwtPayload: JwtBody = {
            id: uuid(),
            email: "test@test.com",
            username: "test",
        };
        const jwt = new JwtService().sign(jwtPayload, {
            secret: "PUT_SECRET_HERE"
        });
        authorizationHeader = `Bearer ${jwt}`;
        resourceService = module.get<ResourceService>(ResourceService);

        app = module.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        app.enableCors({origin: "*"})
        await app.init();
    });

    describe("POST /create-resource", () => {
        it("should create a folder at the root level", async () => {
            const mockResourceId = "9c46c57e-b5b3-4517-b071-c961775cd1b6";
            jest.spyOn(resourceService, "createResource").mockResolvedValue(mockResourceId);
            const createResourceRequestDto = {
                name: uuid(),
                type: ResourceTypes.FOLDER
            };

            const response = await request(app.getHttpServer())
                .post('/create-resource')
                .send(createResourceRequestDto)
                .set("Authorization", authorizationHeader);

            expect(response.status).toBe(201);
            expect(response.body).toEqual({
                createdResourceId: mockResourceId
            })
        })

        it("should not create a folder without name at the root level", async () => {
            const mockResourceId = "9c46c57e-b5b3-4517-b071-c961775cd1b6";
            jest.spyOn(resourceService, "createResource").mockResolvedValue(mockResourceId);
            const createResourceRequestDto = {
                type: ResourceTypes.FOLDER
            };

            const response = await request(app.getHttpServer())
                .post('/create-resource')
                .send(createResourceRequestDto)
                .set("Authorization", authorizationHeader);

            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                error: "Bad Request",
                message: ["name must be a string"],
                statusCode: 400
            })
        })

        it("should create a note at the root level", async () => {
            const mockResourceId = "9c46c57e-b5b3-4517-b071-c961775cd1b6";
            jest.spyOn(resourceService, "createResource").mockResolvedValue(mockResourceId);
            const createResourceRequestDto = {
                name: uuid(),
                content: "",
                type: ResourceTypes.NOTE
            };

            const response = await request(app.getHttpServer())
                .post('/create-resource')
                .send(createResourceRequestDto)
                .set("Authorization", authorizationHeader);

            expect(response.status).toBe(201);
            expect(response.body).toEqual({
                createdResourceId: mockResourceId
            })
        })

        it("should create a note without name at the root level", async () => {
            const mockResourceId = "9c46c57e-b5b3-4517-b071-c961775cd1b6";
            jest.spyOn(resourceService, "createResource").mockResolvedValue(mockResourceId);
            const createResourceRequestDto = {
                content: "",
                type: ResourceTypes.NOTE
            };

            const response = await request(app.getHttpServer())
                .post('/create-resource')
                .send(createResourceRequestDto)
                .set("Authorization", authorizationHeader);

            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                error: "Bad Request",
                message: ["name must be a string"],
                statusCode: 400
            })
        })

        it("should create a note without content at the root level", async () => {
            const mockResourceId = "9c46c57e-b5b3-4517-b071-c961775cd1b6";
            jest.spyOn(resourceService, "createResource").mockResolvedValue(mockResourceId);
            const createResourceRequestDto = {
                name: uuid(),
                type: ResourceTypes.NOTE
            };

            const response = await request(app.getHttpServer())
                .post('/create-resource')
                .send(createResourceRequestDto)
                .set("Authorization", authorizationHeader);

            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                error: "Bad Request",
                message: ["content must be base64 encoded"],
                statusCode: 400
            })
        })

        it("should return forbidden error, if no authorization is set", async () => {
            const createResourceRequestDto = {
                name: uuid(),
                content: "",
                type: ResourceTypes.NOTE
            };

            const response = await request(app.getHttpServer())
                .post('/create-resource')
                .send(createResourceRequestDto);

            expect(response.status).toBe(403);
            expect(response.body).toEqual({
                message: "Forbidden",
                statusCode: 403
            })
        })
    })

    describe("GET /resource", () => {
        it("should get all resource of a specific user", async () => {
            const mockResources = [
                {
                    "resourceId": "4d201f4b-6d70-4c59-986b-df27c11e6bec",
                    "parentResourceId": null,
                    "type": "folder",
                    "name": "Math",
                    "content": null,
                    "createdAt": "2024-02-28T09:43:46.204Z"
                },
                {
                    "resourceId": "6ccb2bdc-5660-40db-9a63-29ef9e608981",
                    "parentResourceId": "4d201f4b-6d70-4c59-986b-df27c11e6bec",
                    "type": "note",
                    "name": "Exercises",
                    "content": null,
                    "createdAt": "2024-02-28T10:01:26.172Z"
                }
            ];
            jest.spyOn(resourceService, "getAllResourcesByUserId").mockResolvedValue(mockResources);

            const response = await request(app.getHttpServer())
              .get('/resource')
              .set("Authorization", authorizationHeader);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockResources)
        })

        it("should return an internal server error, if something unexpected happens", async () => {
            jest.spyOn(resourceService, "getAllResourcesByUserId").mockImplementation(() => {
                throw new Error("Something bad happened")
            });

            const response = await request(app.getHttpServer())
              .get('/resource')
              .set("Authorization", authorizationHeader);

            expect(response.status).toBe(500);
            expect(response.body).toEqual({
                message: "Internal server error",
                statusCode: 500
            })
        })

        it("should return forbidden error, if no authorization is set", async () => {
            const response = await request(app.getHttpServer()).get('/resource');

            expect(response.status).toBe(403);
            expect(response.body).toEqual({
                message: "Forbidden",
                statusCode: 403
            })
        })
    })

    describe("GET /resource-root", () => {
        it("should get all root-resources of a specific user", async () => {
            const mockResources = [
                {
                    "resourceId": "4d201f4b-6d70-4c59-986b-df27c11e6bec",
                    "parentResourceId": null,
                    "type": "folder",
                    "name": "Math",
                    "content": null,
                    "createdAt": "2024-02-28T09:43:46.204Z"
                },
                {
                    "resourceId": "6ccb2bdc-5660-40db-9a63-29ef9e608981",
                    "parentResourceId": null,
                    "type": "note",
                    "name": "Exercises",
                    "content": null,
                    "createdAt": "2024-02-28T10:01:26.172Z"
                }
            ];
            jest.spyOn(resourceService, "getAllRootLevelResourcesByUserId").mockResolvedValue(mockResources);

            const response = await request(app.getHttpServer())
              .get('/resource-root')
              .set("Authorization", authorizationHeader);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockResources)
        })

        it("should return an internal server error, if something unexpected happens", async () => {
            jest.spyOn(resourceService, "getAllRootLevelResourcesByUserId").mockImplementation(() => {
                throw new Error("Something bad happened")
            });

            const response = await request(app.getHttpServer())
              .get('/resource-root')
              .set("Authorization", authorizationHeader);

            expect(response.status).toBe(500);
            expect(response.body).toEqual({
                message: "Internal server error",
                statusCode: 500
            })
        })

        it("should return forbidden error, if no authorization is set", async () => {
            const response = await request(app.getHttpServer()).get('/resource-root');

            expect(response.status).toBe(403);
            expect(response.body).toEqual({
                message: "Forbidden",
                statusCode: 403
            })
        })
    })

    describe("POST /ressource-children", () => {
        it("should get all children of a resource", async () => {
            const mockResources = [
                {
                    "resourceId": "4d201f4b-6d70-4c59-986b-df27c11e6bec",
                    "parentResourceId": "b639b6e2-871c-4a55-aec1-b481e81afc3c",
                    "type": "folder",
                    "name": "Math",
                    "content": null,
                    "createdAt": "2024-02-28T09:43:46.204Z"
                },
                {
                    "resourceId": "6ccb2bdc-5660-40db-9a63-29ef9e608981",
                    "parentResourceId": "b639b6e2-871c-4a55-aec1-b481e81afc3c",
                    "type": "note",
                    "name": "Exercises",
                    "content": null,
                    "createdAt": "2024-02-28T10:01:26.172Z"
                }
            ];
            jest.spyOn(resourceService, "getChildrenOfResource").mockResolvedValue(mockResources);

            const response = await request(app.getHttpServer())
              .post('/resource-children')
              .send({
                  resourceId: "b639b6e2-871c-4a55-aec1-b481e81afc3c"
              })
              .set("Authorization", authorizationHeader);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockResources)
        })

        it("should validate 'resourceId' in the body", async () => {
            const mockResources = [
                {
                    "resourceId": "4d201f4b-6d70-4c59-986b-df27c11e6bec",
                    "parentResourceId": "b639b6e2-871c-4a55-aec1-b481e81afc3c",
                    "type": "folder",
                    "name": "Math",
                    "content": null,
                    "createdAt": "2024-02-28T09:43:46.204Z"
                },
                {
                    "resourceId": "6ccb2bdc-5660-40db-9a63-29ef9e608981",
                    "parentResourceId": "b639b6e2-871c-4a55-aec1-b481e81afc3c",
                    "type": "note",
                    "name": "Exercises",
                    "content": null,
                    "createdAt": "2024-02-28T10:01:26.172Z"
                }
            ];
            jest.spyOn(resourceService, "getChildrenOfResource").mockResolvedValue(mockResources);

            const response = await request(app.getHttpServer())
              .post('/resource-children')
              .send()
              .set("Authorization", authorizationHeader);

            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                error: "Bad Request",
                message: ["resourceId must be a string"],
                statusCode: 400
            })
        })

        it("should return an internal server error, if something unexpected happens", async () => {
            jest.spyOn(resourceService, "getChildrenOfResource").mockImplementation(() => {
                throw new Error("Something bad happened")
            });

            const response = await request(app.getHttpServer())
              .post('/resource-children')
              .send({
                  resourceId: "b639b6e2-871c-4a55-aec1-b481e81afc3c"
              })
              .set("Authorization", authorizationHeader);

            expect(response.status).toBe(500);
            expect(response.body).toEqual({
                message: "Internal server error",
                statusCode: 500
            })
        })

        it("should return forbidden error, if no authorization is set", async () => {
            const response = await request(app.getHttpServer()).post('/resource-children');

            expect(response.status).toBe(403);
            expect(response.body).toEqual({
                message: "Forbidden",
                statusCode: 403
            })
        })
    })
})