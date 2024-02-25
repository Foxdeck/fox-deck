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
            const result = await this.databaseService.db.run(query);
            this.logger.debug(`(run) => successfully ran query`);
            return result;
        } catch (e) {
            this.logger.error(`(run) => Error while running query: ${e.message}`);
            throw e;
        }
    }

    async select<T>(params: {
        table: string;
        columns: string[];
        joins?: string[];
        where?: string;
        singleSelect?: boolean;
    }): Promise<T> {
        try {
            let query = `SELECT ${params.columns.join(', ')}
                         FROM ${params.table}`;


            if (params.joins && params.joins.length > 0) {
                params.joins.forEach(join => {
                    query += ` JOIN ${join}`;
                });
            }

            if (params.where) {
                query += ` WHERE ${params.where}`;
            }


            let result;
            if (params.singleSelect) {
                result = await this.databaseService.db.get(query) as T;
            } else {
                result = await this.databaseService.db.all(query) as T;
            }

            // if the result is an array with only 1 item, we return the single object
            if (Array.isArray(result) && result.length === 1) {
               result = result[0];
            }
            this.logger.debug(`(select) => successfully selected from database`);
            return result;
        } catch (e) {
            this.logger.error(`(select) => Error while selecting from database: ${e.message}`);
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

            const result = await this.databaseService.db.run(query, values);
            this.logger.debug(`(insert) => successfully inserted into database`);
            return result;
        } catch (e) {
            this.logger.error(`(insert) => Error while inserting into database: ${e.message}`);
            throw e;
        }

    }
}