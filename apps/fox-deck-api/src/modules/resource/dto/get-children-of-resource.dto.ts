import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class GetChildrenOfResourceRequestDto {
    @ApiProperty()
    @IsString()
    resourceId: string
}

export class GetChildrenOfResourceResponseDto {
    @ApiProperty()
    @IsString()
    resourceId: string

    @ApiProperty()
    @IsString()
    parentResourceId: string

    @ApiProperty()
    @IsString()
    type: string

    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsString()
    content: string

    @ApiProperty()
    @IsString()
    createdAt: string
}
