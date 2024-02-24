import {CreateFolderRequestDto, CreateFolderResponseDto} from "./dto/create-folder.dto";
import {AuthenticatedRequest} from "../../shared/interfaces/authenticated-request.interface";

/**
 * Resource Controller Interface
 */
export interface ResourceControllerInterface {

    /**
     * Creates a new folder with the given details.
     *
     * @param {CreateFolderRequestDto} body - The details of the folder to be created.
     * @param {AuthenticatedRequest} request - The authenticated request object.
     *                                         Used for retrieving the user-object via 'request.user'.
     *
     * @return {Promise<CreateFolderResponseDto>} - A promise that resolves with the response details of the created folder.
     */
    createFolder(
        body: CreateFolderRequestDto,
        request: AuthenticatedRequest
    ): Promise<CreateFolderResponseDto>;
}