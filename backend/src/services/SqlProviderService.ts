/**
 * I decided to use a sqlite in memory database to keep things simple but
 * still try to emulate Empower's stack somewhat.
 *
 * This file is where all database operations happens and acts as a DAO.
 */


import connect, { sql } from '@databases/sqlite';

// data typing
import { CanvassingNote } from '../../../shared/typing/CanvassingNote';

/**
 * Provides the database and database operations.
 */
export class SqlProviderService {

    private databaseCreated: boolean = false;
    private dbInstance = connect();

    // Create the database in memory
    public prepare = async (): Promise<void> => {
        await this.dbInstance.query(sql`
        CREATE TABLE IF NOT EXISTS Canvassing (
          id INTEGER PRIMARY KEY,
          firstName VARCHAR NOT NULL,
          lastName VARCHAR NOT NULL,
          notes VARCHAR NOT NULL,
          email VARCHAR NOT NULL
        );
      `);

        this.databaseCreated = true;
    }

    /**
     * Saves notes in the Canvassing table.
     * @param data
     * @returns
     */
    public saveNotes = async (data: CanvassingNote): Promise<CanvassingNote[]> => {
        try {
            if (!this.databaseCreated) {
                await this.prepare();
            }
            return await this.dbInstance.query(sql`INSERT INTO Canvassing (firstName, lastName, email, notes) VALUES (${data.firstName}, ${data.lastName}, ${data.email}, ${data.notes}) RETURNING *;`);
        }
        catch (e) {
            console.log('error in saveNotes', e);
            throw (e);
        }
    }


    /**
     * @param data Updates an existing note in the Canvassing table.
     * @returns
     */
    public updateNote = async (data: CanvassingNote): Promise<CanvassingNote[]> => {
        try {
            if (!this.databaseCreated) {
                await this.prepare();
            }
            return await this.dbInstance.query(sql`UPDATE Canvassing SET firstName = ${data.firstName}, lastName = ${data.lastName}, email = ${data.email}, notes = ${data.notes} WHERE id = ${data.id} RETURNING *;`);
        }
        catch (e) {
            console.log('error in updateNote', e);
            throw (e);
        }
    }

    /**
     * Gets all notes from the database.
     * @returns
     */
    public getAll = async (): Promise<CanvassingNote[] | null> => {
        try {
            if (!this.databaseCreated) {
                await this.prepare();
            }
            const results = await this.dbInstance.query(sql`SELECT * FROM Canvassing;`);
            if (results.length) {
                return results;
            }
            else {
                return null;
            };

        }
        catch (e) {
            console.log('error in getAll', e);
            throw (e);
        }
    }


    /**
     * Gets a specific note from the database.
     * @returns
     */
    public getNote = async (id: string): Promise<CanvassingNote | null> => {
        try {

            if (!this.databaseCreated) {
                await this.prepare();
            }

            const note = await this.dbInstance.query(sql`SELECT * FROM Canvassing WHERE id = ${id};`);
            if (note.length) {
                return note[0];
            }
            else {
                return null;
            };

        }
        catch (e) {
            console.log('error in getNote', e);
            throw (e);
        }

    }

}
