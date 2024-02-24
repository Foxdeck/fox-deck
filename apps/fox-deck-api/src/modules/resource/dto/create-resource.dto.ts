import {ApiProperty} from "@nestjs/swagger";
import {IsBase64, IsEnum, IsOptional, IsString, ValidateIf} from "class-validator";
import {ResourceTypes} from "../resource-types.enum";

/**
 * Represents the data transfer object for creating a new resource.
 */
export class CreateResourceRequestDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    parentResourceId: string;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @ValidateIf(o => o.type === ResourceTypes.NOTE)
    @IsBase64()
    content: string;

    @ApiProperty({enum: ResourceTypes})
    @IsEnum(ResourceTypes)
    type: ResourceTypes;
}

/**
 * Represents the response DTO for creating a resource.
 */
export class CreateResourceResponseDto {
    @ApiProperty()
    @IsString()
    createdResourceId: string;
}