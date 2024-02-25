import {Injectable, Logger} from "@nestjs/common";
import {v4 as uuidv4} from "uuid";
import {SqliteProvider} from "../database/sqlite-provider.service";
import {CreateResourceRequestDto} from "./dto/create-resource.dto";
import {SelectResourceByUserIdResponseInterface} from "./dto/select-resource-by-user-id.dto";

/**
 * A service class for managing resources.
 */
@Injectable()
export class ResourceService {
    private readonly logger = new Logger(ResourceService.name);

    constructor(private readonly databaseProvider: SqliteProvider) {
    }

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
            const createdResource = await this.insertResourceIntoResourceTable(resource);
            await this.insertResourceIntoAssociationTable(userId, createdResource);
            await this.databaseProvider.run("COMMIT");

            this.logger.debug("Resource created successfully");
            return createdResource;
        } catch (e) {
            await this.databaseProvider.run("ROLLBACK");
            this.logger.debug("(createResource) => Error while creating resource", e.stack);
            throw e;
        }
    }

    /**
     * Retrieves all resources associated with a given user ID.
     *
     * @param {string} userId - The ID of the user.
     * @returns {Array} - An array of resources associated with the user.
     * @throws {Error} - If there was an error while retrieving resources.
     */
    public getAllResourcesByUserId(userId: string): Promise<SelectResourceByUserIdResponseInterface> {
        try {
            return this.databaseProvider.select<SelectResourceByUserIdResponseInterface>({
                table: "Resource",
                columns: [
                    "Resource.resourceId",
                    "Resource.parentResourceId",
                    "Resource.type",
                    "Resource.name",
                    "Resource.content",
                    "Resource.createdAt"
                ],
                joins: [
                    "UserResourceAssociation ON UserResourceAssociation.resourceId = Resource.resourceId",
                    "User ON User.id = UserResourceAssociation.userId"
                ],
                where: `main.User.id = '${userId}'`
            });
        } catch (e) {
            this.logger.debug("(getAllResourcesByUserId) => Error while getting resources by user ID", e.stack);
            throw e;
        }
    }

    /**
     * Retrieves all root level resources associated with a given user ID.
     *
     * Root level resources has no parentResourceId (IS NULL)
     *
     * @param {string} userId - The ID of the user.
     *
     * @returns {Promise<SelectResourceByUserIdResponseInterface>} A Promise that resolves to the list of root level resources.
     *
     * @throws {Error} If there is an error while fetching the resources.
     */
    public getAllRootLevelResourcesByUserId(userId: string): Promise<SelectResourceByUserIdResponseInterface> {
        try {
            return this.databaseProvider.select<SelectResourceByUserIdResponseInterface>({
                table: "Resource",
                columns: [
                    "Resource.resourceId",
                    "Resource.parentResourceId",
                    "Resource.type",
                    "Resource.name",
                    "Resource.content",
                    "Resource.createdAt"
                ],
                joins: [
                    "UserResourceAssociation ON UserResourceAssociation.resourceId = Resource.resourceId",
                    "User ON User.id = UserResourceAssociation.userId"
                ],
                where: `main.User.id = '${userId}' AND Resource.parentResourceId IS NULL`
            });
        } catch (e) {
            this.logger.debug("(getAllResourcesByUserId) => Error while getting resources by user ID", e.stack);
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
            const resourceName = resource.name;
            const resourceType = resource.type;
            const uuid = uuidv4();
            const content = resource.content;
            const createdAt = new Date().toISOString();

            await this.databaseProvider.insert("resource", {
                resourceId: uuid,
                name: resourceName,
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