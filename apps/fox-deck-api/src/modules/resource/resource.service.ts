import {Injectable, Logger} from "@nestjs/common";
import {v4 as uuidv4} from "uuid";
import {SqliteProvider} from "../database/sqlite-provider.service";
import {CreateResourceRequestDto} from "./dto/create-resource.dto";

/**
 * A service class for managing resources.
 */
@Injectable()
export class ResourceService {
    private readonly logger = new Logger(ResourceService.name);

    constructor(private readonly databaseProvider: SqliteProvider) {}

    /**
     * Creates a resource for a given user.
     *
     * @param {CreateResourceRequestDto} resource - The resource to be created.
     * @param {string} userId - The ID of the user creating the resource.
     *
     * @returns The ID of the created resource.
     * */
    public async createResource(resource: CreateResourceRequestDto, userId: string): Promise<string> {
        try {
            await this.databaseProvider.run("BEGIN TRANSACTION");
            const createdFolder = await this.insertResourceIntoResourceTable(resource);
            await this.insertResourceIntoAssociationTable(userId, createdFolder);
            await this.databaseProvider.run("COMMIT");

            this.logger.debug("Folder created successfully");
            return createdFolder;
        } catch (e) {
            await this.databaseProvider.run("ROLLBACK");
            this.logger.debug("(createFolder) => Error while creating resource", e.stack);
            throw e;
        }
    }

    /**
     * Inserts a resource into the resource table.
     *
     * @param {CreateResourceRequestDto} resource - The resource to be inserted.
     * @returns {Promise<string>} - The UUID of the inserted resource.
     * @private
     */
    private async insertResourceIntoResourceTable(resource: CreateResourceRequestDto): Promise<string> {
        try {
            const folderName = resource.name;
            const resourceType = resource.type;
            const uuid = uuidv4();
            const content = resource.content;
            const createdAt = new Date().toISOString();

            await this.databaseProvider.insert("resource", {
                resourceId: uuid,
                name: folderName,
                type: resourceType,
                content,
                createdAt
            });
            return uuid;
        } catch (e) {
            this.logger.debug(`(createResource) => error while creating resource: ${e.message}`);
            throw e;
        }
    }

    /**
     * Inserts a resource into the association table for a specific user.
     *
     * @param {string} userId - The ID of the user.
     * @param {string} resourceId - The ID of the resource.
     * @return {Promise<void>} - A promise that resolves with no value when the insertion is successful.
     * @private
     */
    private async insertResourceIntoAssociationTable(userId: string, resourceId: string): Promise<void> {
        try {
            const uuid = uuidv4();

            await this.databaseProvider.insert("UserResourceAssociation", {
                id: uuid,
                userId,
                resourceId
            });
        } catch (e) {
            this.logger.debug(`(insertResourceIntoAssociationTable) => error while inserting into table: ${e.message}`);
            throw e;
        }
    }
}