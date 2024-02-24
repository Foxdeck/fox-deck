import {Body, Controller, HttpStatus, Post, Req} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import {FoxdeckApiRequest, FoxdeckApiResponse} from "../../shared/decorators/api.decorator";
import {SecurityType} from "../../shared/decorators/security.decorator";
import {AuthenticatedRequest} from "../../shared/interfaces/authenticated-request.interface";
import {CreateFolderRequestDto, CreateFolderResponseDto} from "./dto/create-folder.dto";
import {ResourceControllerInterface} from "./resource.controller.interface";

/**
 * Controller which handles CRUD operations for resources.
 */
@ApiTags("Resources")
@Controller()
export class ResourceController implements ResourceControllerInterface {

    @FoxdeckApiResponse({
        responseDescription: "The created folder.",
        schema: CreateFolderResponseDto
    })
    @FoxdeckApiRequest({
        httpCode: HttpStatus.CREATED,
        securityType: SecurityType.JWT_VALID
    })
    @Post("create-folder")
    public createFolder(
        @Body() body: CreateFolderRequestDto,
        @Req() request: AuthenticatedRequest
    ): Promise<CreateFolderResponseDto> {
        const user = request.user;
        const userId = user.id;
        // TODO: needs business logic implementation
        return {...body, userId} as any;
    }
}