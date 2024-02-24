import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, IsString} from "class-validator";

/**
 * Represents the data transfer object for creating a new folder.
 */
export class CreateFolderRequestDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    parentResourceId: string;

    @ApiProperty()
    @IsString()
    name: string;
}

/**
 * Represents the response DTO for creating a folder.
 */
export class CreateFolderResponseDto {
    @ApiProperty()
    @IsString()
    createdResourceId: string;
}