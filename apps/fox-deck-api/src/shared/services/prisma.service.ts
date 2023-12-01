import {Injectable, OnModuleInit} from "@nestjs/common";
import {PrismaClient} from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {

  constructor() {
    super({
      // if the api runs e2e tests, we use the test database instead of the develop database.
      datasourceUrl: process.env.NODE_ENV === 'test' ? process.env.DATABASE_URL_TEST : process.env.DATABASE_URL
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
