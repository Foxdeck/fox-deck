import {Injectable, Logger} from "@nestjs/common";
import {v4 as uuidv4} from "uuid";
import {CreateResourceRequestDto} from "./dto/create-resource.dto";
import {GetResourceRootByUserIdResponseDto} from "./dto/get-resource-root-by-user-id.dto";
import {db} from "../../db/database";
import {Transaction} from "kysely";
import {DB} from "../../db/types";

/**
 * A service class for managing resources.
 */
@Injectable()
export class ResourceService {
    private readonly logger = new Logger(ResourceService.name);

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
            const createdResource = await db.transaction().execute(async (dbTransaction) => {
                const resourceId = await this.insertResource(dbTransaction, resource);
                await this.insertUserResourceAssociation(dbTransaction, userId, resourceId);

                return resourceId;
            });

            this.logger.debug("Resource created successfully");
            return createdResource;
        } catch (e) {
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
    public async getAllResourcesByUserId(userId: string): Promise<any> {
        try {
            return await db
                .selectFrom("Resource")
                .innerJoin("UserResourceAssociation", "UserResourceAssociation.resourceId", "Resource.resourceId")
                .innerJoin("User", "User.id", "UserResourceAssociation.userId")
                .select([
                    "Resource.resourceId",
                    "Resource.parentResourceId",
                    "Resource.type",
                    "Resource.name",
                    "Resource.content",
                    "Resource.createdAt"
                ])
                .where("User.id", "=", userId)
                .execute();
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
     * @returns {Promise<GetResourceByUserIdResponseInterface>} A Promise that resolves to the list of root level resources.
     *
     * @throws {Error} If there is an error while fetching the resources.
     */
    public async getAllRootLevelResourcesByUserId(userId: string): Promise<GetResourceRootByUserIdResponseDto[]> {
        try {
            return await db
                .selectFrom("Resource")
                .innerJoin("UserResourceAssociation", "UserResourceAssociation.resourceId", "Resource.resourceId")
                .innerJoin("User", "User.id", "UserResourceAssociation.userId")
                .select([
                    "Resource.resourceId",
                    "Resource.parentResourceId",
                    "Resource.type",
                    "Resource.name",
                    "Resource.content",
                    "Resource.createdAt"
                ])
                .where("User.id", "=", userId)
                .where("Resource.parentResourceId", "is", null)
                .execute();
        } catch (e) {
            this.logger.debug("(getAllResourcesByUserId) => Error while getting resources by user ID", e.stack);
            throw e;
        }
    }

    /**
     * Get the children resources of a given resource for a specific user.
     *
     * @param {string} resourceId - The ID of the resource for which to retrieve the children resources.
     * @param {string} userId - The ID of the user.
     * @returns {Promise<any[]>} - A Promise that resolves to an array of child resources.
     * @throws {Error} - If there is an error retrieving the resources.
     */
    public async getChildrenOfResource(resourceId: string, userId: string): Promise<any[]> {
        try {
            return await db
                .selectFrom("Resource")
                .innerJoin("UserResourceAssociation", "UserResourceAssociation.resourceId", "Resource.resourceId")
                .innerJoin("User", "User.id", "UserResourceAssociation.userId")
                .select([
                    "Resource.resourceId",
                    "Resource.parentResourceId",
                    "Resource.type",
                    "Resource.name",
                    "Resource.content",
                    "Resource.createdAt"
                ])
                .where("User.id", "=", userId)
                .where("Resource.parentResourceId", "=", resourceId)
                .execute();
        } catch (e) {
            this.logger.debug("(getAllResourcesByUserId) => Error while getting resources by user ID", e.stack);
            throw e;
        }
    }

    private async insertResource(trx: Transaction<DB>, resource: CreateResourceRequestDto) {
        const resourceId = uuidv4();
        const createdAt = new Date().toISOString();
        await trx.insertInto("Resource")
            .values({
                resourceId,
                name: resource.name,
                type: resource.type,
                content: resource.content,
                createdAt
            })
            .executeTakeFirstOrThrow();
        return resourceId;
    }

    private async insertUserResourceAssociation(trx: Transaction<DB>, userId: string, resourceId: string) {
        const userResourceAssociationId = uuidv4();
        await trx.insertInto("UserResourceAssociation")
            .values({
                id: userResourceAssociationId,
                userId,
                resourceId
            })
            .returningAll()
            .executeTakeFirst();
    }
}