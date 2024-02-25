import {Body, Controller, Get, HttpStatus, Logger, Post, Req} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import {FoxdeckApiRequest, FoxdeckApiResponse} from "../../shared/decorators/api.decorator";
import {SecurityType} from "../../shared/decorators/security.decorator";
import {AuthenticatedRequest} from "../../shared/interfaces/authenticated-request.interface";
import {ResourceControllerInterface} from "./resource.controller.interface";
import {ResourceService} from "./resource.service";
import {CreateResourceRequestDto, CreateResourceResponseDto} from "./dto/create-resource.dto";
import {GetResourceByUserIdResponseDto} from "./dto/get-resource-by-user-id.dto";
import {GetResourceRootByUserIdResponseDto} from "./dto/get-resource-root-by-user-id.dto";

/**
 * Controller which handles CRUD operations for resources.
 */
@ApiTags("Resources")
@Controller()
export class ResourceController implements ResourceControllerInterface {
    private readonly logger = new Logger(ResourceController.name);

    constructor(
        private readonly resourceService: ResourceService
    ) {
    }

    @FoxdeckApiRequest({securityType: SecurityType.JWT_VALID})
    @FoxdeckApiResponse({
        responseDescription: "The created resource resourceId.",
        schema: CreateResourceRequestDto,
        httpCode: HttpStatus.CREATED,
    })
    @Post("create-resource")
    public async createResource(
        @Body() body: CreateResourceRequestDto,
        @Req() request: AuthenticatedRequest
    ): Promise<CreateResourceResponseDto> {
        try {
            const user = request.user;
            const userId = user.id;

            const createdResourceId = await this.resourceService.createResource(body, userId);
            return {
                createdResourceId
            };
        } catch (e) {
            this.logger.error(`(createResource) => failed to create a resource: ${e.message}`)
            throw e;
        }
    }

    @FoxdeckApiRequest({securityType: SecurityType.JWT_VALID})
    @FoxdeckApiResponse({
        responseDescription: "The resources of the logged in user.",
        schema: GetResourceByUserIdResponseDto,
        isArray: true,
        httpCode: HttpStatus.OK,
    })
    @Get("resource")
    public async getResourceByUserId(
        @Req() request: AuthenticatedRequest
    ): Promise<GetResourceByUserIdResponseDto> {
        try {
            const user = request.user;
            const userId = user.id;

            return this.resourceService.getAllResourcesByUserId(userId);
        } catch (e) {
            this.logger.error(`(getResourceByUserId) => failed to get resources: ${e.message}`);
            throw e;
        }
    }

    @FoxdeckApiRequest({securityType: SecurityType.JWT_VALID})
    @FoxdeckApiResponse({
        responseDescription: "The root-level resources of the logged in user.",
        schema: GetResourceRootByUserIdResponseDto,
        isArray: true,
        httpCode: HttpStatus.OK,
    })
    @Get("resource-root")
    public async getRootLevelResourceByUserId(
        @Req() request: AuthenticatedRequest
    ): Promise<GetResourceRootByUserIdResponseDto[]> {
        try {
            const user = request.user;
            const userId = user.id;

            return this.resourceService.getAllRootLevelResourcesByUserId(userId);
        } catch (e) {
            this.logger.error(`(getResourceByUserId) => failed to get resources: ${e.message}`);
            throw e;
        }
    }
}