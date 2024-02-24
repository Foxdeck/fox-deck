import {AuthenticatedRequest} from "../../shared/interfaces/authenticated-request.interface";
import {CreateResourceRequestDto, CreateResourceResponseDto} from "./dto/create-resource.dto";

/**
 * Resource Controller Interface
 */
export interface ResourceControllerInterface {

    /**
     * Creates a new resource with the given details.
     *
     * @param {CreateResourceRequestDto} body - The details of the resource to be created.
     * @param {AuthenticatedRequest} request - The authenticated request object.
     *                                         Used for retrieving the user-object via 'request.user'.
     *
     * @return {Promise<CreateResourceResponseDto>} - A promise that resolves with the response details of the created resource.
     */
    createResource(
        body: CreateResourceRequestDto,
        request: AuthenticatedRequest
    ): Promise<CreateResourceResponseDto>;
}