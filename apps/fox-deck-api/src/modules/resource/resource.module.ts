import {Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import {PrismaService} from "../../shared/services/prisma.service";
import {ResourceController} from "./resource.controller";

/**
 * Represents a resource module in the application.
 *
 * The resource represents "notes" and "folders" in fox-deck. This module contains controllers and services
 * which interacts with the resources from the database. This includes classical CRUD operations.
 *
 * @module ResourceModule
 */
@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: "1y" },
        }),
    ],
    providers: [PrismaService],
    controllers: [ResourceController],
})
export class ResourceModule {}