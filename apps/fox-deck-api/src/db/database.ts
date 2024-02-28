import { DB } from './types' // this is the Database interface we defined earlier
import * as SQLite from "better-sqlite3"
import { Kysely, SqliteDialect } from 'kysely'

const dialect = new SqliteDialect({
    database: new SQLite("./prisma/dev.db"),
})

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<DB>({
    dialect,
})