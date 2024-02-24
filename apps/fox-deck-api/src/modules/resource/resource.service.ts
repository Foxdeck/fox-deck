import {Injectable, Logger} from "@nestjs/common";
import {CreateFolderRequestDto} from "./dto/create-folder.dto";
import {PrismaService} from "../../shared/services/prisma.service";
import {Prisma, Resource} from "@prisma/client";
import {ResourceTypes} from "./resource-types.enum";

@Injectable()
export class ResourceService {
    private readonly logger = new Logger(ResourceService.name);
    private readonly prisma: PrismaService;

    constructor(prisma: PrismaService) {
        this.prisma = prisma;
    }

    public async createFolder(folder : CreateFolderRequestDto, userId: string): Promise<Resource> {
        try {
            const createdAt = new Date();
            const folderCreateInput: Prisma.ResourceCreateInput = {
                name: folder.name,
                type: ResourceTypes.FOLDER,
                createdAt
            };
            const createdFolder = await this.prisma.resource.create({
                data: folderCreateInput
            });

            // insert into UserResourceAssociation
            await this.prisma.userResourceAssociation.create({
                data: {
                    userId,
                    resourceId: createdFolder.resourceId
                }
            });

            this.logger.debug("Folder was created successfully");
            return createdFolder;
        } catch (error) {
            this.logger.error("Error while creating folder", error.stack);
        }
    }
}