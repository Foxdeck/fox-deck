import {DatabaseProvider} from "./database-provider.interface";
import {DatabaseService} from './database.service';
import {Injectable, Logger} from "@nestjs/common";
import {RunResult} from "sqlite3";

/**
 * Provides methods for interacting with a SQLite database.
 *
 * @implements DatabaseProvider
 */
@Injectable()
export class SqliteProvider implements DatabaseProvider {
    private readonly logger = new Logger(SqliteProvider.name);

    private databaseService: DatabaseService;

    constructor(databaseService: DatabaseService) {
        this.databaseService = databaseService;
    }

    async run(query: string): Promise<RunResult> {
        try {
            return this.databaseService.db.run(query);
        } catch (e) {
            this.logger.error(`(run) => Error while running query: ${e.message}`);
            throw e;
        }
    }

    async insert(table: string, data: Record<string, any>): Promise<RunResult> {
        try {
            const keys = Object.keys(data).join(', ');
            const valuesPlaceholder = '?'.repeat(Object.values(data).length).split('').join(', ');
            const values = Object.values(data);

            const query = `INSERT INTO ${table} (${keys})
                           VALUES (${valuesPlaceholder})`;

            return this.databaseService.db.run(query, values);
        } catch (e) {
            this.logger.error(`(insert) => Error while inserting into database: ${e.message}`);
            throw e;
        }

    }
}