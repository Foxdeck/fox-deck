import {RunResult} from "sqlite3";

export interface DatabaseProvider {
    /**
     * Insert method is used to add a new record into the specified table with the given data.
     *
     * @param {string} table - The name of the table in which the record will be inserted.
     * @param {Record<string, any>} data - The data object that contains the values of the record fields.
     *
     * @example
     * ```ts
     * const result = await databaseProvider.insert('users', { id: '1', name: 'John Doe', age: '30' });
     * console.log(result);
     * ```
     *
     * @returns {Promise<RunResult>} - A promise that resolves with the result of the insert operation.
     */
    insert(table: string, data: Record<string, any>): Promise<RunResult>;


    /**
     * Executes the specified query asynchronously and returns a Promise that resolves with the result.
     *
     * @param {string} query - The query to execute.
     *
     * @example
     * ```ts
     * await this.databaseProvider.run('BEGIN TRANSACTION');
     * [...]
     * await this.databaseProvider.run('COMMIT');
     * ```
     *
     * @return {Promise<RunResult>} A Promise that resolves with the RunResult.
     */
    run(query: string): Promise<RunResult>
}