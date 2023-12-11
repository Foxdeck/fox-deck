import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  Post,
  Req,
} from "@nestjs/common";
import {ApiBearerAuth, ApiExtraModels, ApiOkResponse, ApiOperation, ApiTags,} from "@nestjs/swagger";
import {Security, SecurityType} from "../../shared/decorators/security.decorator";
import {NoteService} from "./note.service";
import {Prisma} from "@prisma/client";
import {AuthenticatedRequest} from "../../shared/interfaces/authenticated-request.interface";
import {CreateNoteDto, NoteResponseDto} from "./note.dto";

/**
 * Controller which handles CRUD operations for notes.
 */
@ApiTags("Notes")
@Controller("note")
export class NoteController {
  logger = new Logger(NoteController.name);

  constructor(private readonly noteService: NoteService) {}

  /**
   * Retrieves a list of notes for the authenticated user.
   *
   * @param {AuthenticatedRequest} request - The authenticated request object.
   * @returns {Promise<any>} - A Promise that resolves with an array of NoteResponseDto objects.
   */
  @ApiBearerAuth("access-token")
  @ApiOkResponse({
    description: "Returns a list of notes.",
    type: NoteResponseDto,
    isArray: true
  })
  @ApiExtraModels(NoteResponseDto)
  @Security(SecurityType.JWT_VALID)
  @HttpCode(HttpStatus.OK)
  @Get("")
  async getAllNotes(
    @Req() request: AuthenticatedRequest,
  ): Promise<any> {
    try {
      const user = request.user;
      const whereCondition: Prisma.NoteWhereInput = {
        authorId: user.id
      };
      const skip = 0;
      const take = 10;

      return await this.noteService.notes({
        where: whereCondition,
        skip,
        take
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  /**
   * Create a new note.
   *
   * @param {AuthenticatedRequest} request - The authenticated request object.
   * @param {CreateNoteDto} createNoteDto - The data required to create a note.
   * @returns {Promise<NoteResponseDto>} - A promise containing the created note response.
   */
  @ApiBearerAuth("access-token")
  @ApiOperation({
    summary: "Create a new note"
  })
  @ApiOkResponse({
    description: "Note successfully created.",
    type: NoteResponseDto,
  })
  @Security(SecurityType.JWT_VALID)
  @HttpCode(HttpStatus.CREATED)
  @Post("")
  async createNote(
    @Req() request: AuthenticatedRequest,
    @Body() createNoteDto: CreateNoteDto
  ): Promise<NoteResponseDto> {
    try {
      const user = request.user;
      return await this.noteService.createNote({
        ...createNoteDto,
        author: {
          connect: {
            id: user.id
          }
        }
      });
    } catch (e) {
      this.logger.error(e.message);
      throw new InternalServerErrorException(e);
    }
  }
}