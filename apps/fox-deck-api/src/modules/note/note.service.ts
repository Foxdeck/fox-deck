import {Injectable, Logger} from "@nestjs/common";
import {Prisma} from "@prisma/client";
import {PrismaService} from "../../shared/services/prisma.service";
import {NoteResponseDto} from "./note.dto";

/**
 * Represents the service for managing notes.
 */
@Injectable()
export class NoteService {
  logger = new Logger(NoteService.name);

  constructor(private prisma: PrismaService) {
  }

  /**
   * Retrieves a list of notes based on the given parameters.
   *
   * @param {Object} params - The parameters for filtering and sorting the notes.
   * @param {number} [params.skip] - The number of items to skip.
   * @param {number} [params.take] - The number of items to take.
   * @param {Prisma.NoteWhereUniqueInput} [params.cursor] - The unique identifier of the cursor note (optional).
   * @param {Prisma.NoteWhereInput} [params.where] - The conditions to filter the notes (optional).
   * @param {Prisma.NoteOrderByWithRelationInput} [params.orderBy] - The criteria to sort the notes (optional).
   * @return {Promise<NoteResponseDto[]>} A Promise that resolves to an array of NoteResponseDto objects representing the retrieved notes.
   */
  async notes(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.NoteWhereUniqueInput;
    where?: Prisma.NoteWhereInput;
    orderBy?: Prisma.NoteOrderByWithRelationInput;
  }): Promise<NoteResponseDto[]> {
    const {skip, take, cursor, where, orderBy} = params;
    return this.prisma.note.findMany({
      skip,
      take,
      cursor,
      where,
      include: {
        author: {
          select: {
            username: true,
          },
        },
      },
      orderBy,
    });
  }

  /**
   * Creates a new note.
   *
   * @param {Prisma.NoteCreateInput} data - The data to create the note.
   *
   * @returns {Promise<NoteResponseDto>} - The newly created note.
   * @throws {Error} - If there was an error creating the note.
   */
  async createNote(data: Prisma.NoteCreateInput): Promise<NoteResponseDto> {
    try {
      return this.prisma.note.create({
        data
      })
    } catch (e) {
      this.logger.error(e.message);
      throw new Error(e.message);
    }
  }
}
