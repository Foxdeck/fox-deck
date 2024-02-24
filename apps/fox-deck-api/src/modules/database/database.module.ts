import {DatabaseService} from "./database.service";
import {Module} from "@nestjs/common";

/**
 * @module DatabaseModule
 * @description Represents a module for database operations.
 *
 * @requires {@link DatabaseService}
 */
@Module({
    providers: [DatabaseService],
    exports: [DatabaseService]
})
export class DatabaseModule {}