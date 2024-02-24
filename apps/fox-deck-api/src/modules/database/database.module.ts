import {Module} from "@nestjs/common";
import {SqliteProvider} from "./sqlite-provider.service";
import {DatabaseService} from "./database.service";

/**
 * @module DatabaseModule
 * @description Represents a module for database operations.
 *
 * @requires {@link DatabaseService}
 */
@Module({
    providers: [DatabaseService, SqliteProvider],
    exports: [SqliteProvider]
})
export class DatabaseModule {}