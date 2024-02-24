import {Injectable} from "@nestjs/common";
import {AsyncDatabase} from "promised-sqlite3";


/**
 * Represents a service class for interacting with the database.
 *
 * The DatabaseService class provides methods to connect to the database, check if tables are loaded, and perform various database operations.
 */
@Injectable()
export class DatabaseService {
    public db: AsyncDatabase;

    constructor() {
        (async () => {
            this.db = await AsyncDatabase.open("./prisma/dev.db")
        })();
    }
}