import {Note} from "@prisma/client";
import {ApiProperty} from "@nestjs/swagger";
import {IsBase64, IsString} from "class-validator";

export class CreateNoteDto {
  @ApiProperty()
  @IsBase64()
  content: string;

  @ApiProperty()
  @IsString()
  title: string;
}

export class NoteResponseDto implements Note {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  authorId: string;

  @ApiProperty()
  @IsBase64()
  content: string;

  @ApiProperty()
  @IsBase64()
  title: string;
}