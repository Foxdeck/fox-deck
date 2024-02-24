import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export interface SelectResourceByUserIdResponseInterface {
    resourceId: string
    parentResourceId: string
    type: string
    name: string
    content: string
    createdAt: string
}

export class SelectResourceByUserIdResponseDto implements SelectResourceByUserIdResponseInterface {
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