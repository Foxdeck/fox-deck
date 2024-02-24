import { Injectable, Logger } from "@nestjs/common";
import { CreateFolderRequestDto } from "./dto/create-folder.dto";
import { PrismaService } from "../../shared/services/prisma.service";
import { Prisma, Resource } from "@prisma/client";
import { ResourceTypes } from "./resource-types.enum";

/**
 * Service class for managing resources.
 */
@Injectable()
export class ResourceService {
    private readonly logger = new Logger(ResourceService.name);

    constructor(private readonly prisma: PrismaService) { }

    /**
     * Creates a folder with the given information.
     *
     * @param folder - The folder information to create.
     * @param userId - The ID of the user creating the folder.
     * @returns A Promise that resolves to the created folder.
     */
    public async createFolder(folder: CreateFolderRequestDto, userId: string): Promise<Resource> {
        const createdAt = new Date();
        const folderCreateInput: Prisma.ResourceCreateInput = this.generateFolderCreationInput(folder, createdAt);

        try {
            const createdFolder = await this.createResource(folderCreateInput);
            await this.associateUserToResource(userId, createdFolder.resourceId);

            this.logger.debug("Folder created successfully");
            return createdFolder;
        } catch (error) {
            this.logger.error("Error while creating folder", error.stack);
        }
    }

    /**
     * Generates the input for creating a folder resource.
     *
     * @param {CreateFolderRequestDto} folder - The folder object containing the name of the folder.
     * @param {Date} createdAt - The creation date of the folder.
     * @returns {Prisma.ResourceCreateInput} - The input object for creating a folder resource.
     * @private
     */
    private generateFolderCreationInput(folder: CreateFolderRequestDto, createdAt: Date): Prisma.ResourceCreateInput {
        return {
            name: folder.name,
            type: ResourceTypes.FOLDER,
            createdAt,
        };
    }

    /**
     * Creates a resource.
     *
     * @param {Prisma.ResourceCreateInput} resourceCreateInput - The input data to create the resource.
     * @returns {Promise<Resource>} A promise that resolves with the created resource.
     * @private
     */
    private async createResource(resourceCreateInput: Prisma.ResourceCreateInput): Promise<Resource> {
        return this.prisma.resource.create({ data: resourceCreateInput });
    }

    /**
     * Associates a user to a resource.
     *
     * @param {string} userId - The ID of the user.
     * @param {string} resourceId - The ID of the resource.
     *
     * @return {Promise<any>} - A promise that resolves with the created user resource association.
     *
     * @private
     */
    private async associateUserToResource(userId: string, resourceId: string) {
        return this.prisma.userResourceAssociation.create({
            data: {
                userId,
                resourceId
            },
        });
    }
}