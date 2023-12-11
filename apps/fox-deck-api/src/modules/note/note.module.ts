import {Module} from "@nestjs/common";
import {PrismaService} from "../../shared/services/prisma.service";
import {NoteService} from "./note.service";
import {NoteController} from "./note.controller";

@Module({
  providers: [PrismaService, NoteService],
  controllers: [NoteController],
})
export class NoteModule {}
