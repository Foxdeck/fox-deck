import {Injectable, Logger} from "@nestjs/common";
import {CreateFolderRequestDto} from "./dto/create-folder.dto";
import {ResourceTypes} from "./resource-types.enum";
import {v4 as uuidv4} from "uuid";
import {SqliteProvider} from "../database/sqlite-provider.service";

/**
 * A service class for managing resources.
 */
@Injectable()
export class ResourceService {
    private readonly logger = new Logger(ResourceService.name);

    constructor(
        private readonly databaseProvider: SqliteProvider
    ) {}

    /**
     * Creates a folder for a given user.
     *
     * @param {CreateFolderRequestDto} folder - The folder to be created.
     * @param {string} userId - The ID of the user creating the folder.
     *
     * @returns The ID of the created folder.
     * */
    public async createFolder(folder: CreateFolderRequestDto, userId: string): Promise<string> {
        const createdAt = new Date();

        try {
            await this.databaseProvider.run('BEGIN TRANSACTION');
            const createdFolder = await this.createResource(folder, createdAt);
            await this.insertResourceIntoAssociationTable(userId, createdFolder);
            await this.databaseProvider.run('COMMIT');

            this.logger.debug("Folder created successfully");
            return createdFolder;
        } catch (e) {
            await this.databaseProvider.run('ROLLBACK');
            this.logger.error("(createFolder) => Error while creating folder", e.stack);
        }
    }

    private async createResource(folder: CreateFolderRequestDto, createdAt: Date): Promise<string> {
        try {
            const folderName = folder.name;
            const resourceType = ResourceTypes.FOLDER;
            const uuid = uuidv4();

            await this.databaseProvider.insert("resource", {
                resourceId: uuid,
                name: folderName,
                type: resourceType,
                createdAt: createdAt.toISOString()
            });
            return uuid;
        } catch (e) {
            this.logger.error(`(createResource) => error while creating resource: ${e.message}`);
            throw e;
        }
    }

    private async insertResourceIntoAssociationTable(userId: string, resourceId: string): Promise<void> {
        try {
            const uuid = uuidv4();

            await this.databaseProvider.insert("UserResourceAssociation", {
                id: uuid,
                userId,
                resourceId
            });
        } catch (e) {
            this.logger.error(`(insertResourceIntoAssociationTable) => error while inserting into table: ${e.message}`);
            throw e;
        }
    }
}