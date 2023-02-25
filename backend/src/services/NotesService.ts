
/**
 * I could have just had the routes call the database provider service directly, but
 * I typically follow a pattern of having the route controller call a service which
 * then calls the DAO, so I kept that pattern here.
 */

// services
import { SqlProviderService } from './SqlProviderService';

// data typing
import { CanvassingNote } from '../../../shared/typing/CanvassingNote';

export class NotesService {

    private sqlProviderService:SqlProviderService = new SqlProviderService();

    constructor() {
    }

    /**
     * Gets all notes in the database.
     * @returns
     */
    public getCanvassingNotes = async (): Promise<CanvassingNote[]> => {
        const allNotes = await this.sqlProviderService.getAll();
        if (allNotes) {
            return allNotes;
        }
        return [];
    }


    /**
     * Gets all notes in the database.
     * @returns
     */
    public getNote = async (id: string): Promise<CanvassingNote | null> => {
        const note = await this.sqlProviderService.getNote(id);
        if (note) {
            return note;
        }
        return null;
    }

    /**
     * Saves notes in the database.
     * @param data
     * @returns
     */
    public saveCanvassingNotes = async (data: CanvassingNote): Promise<CanvassingNote[]> => {
        const saved = await this.sqlProviderService.saveNotes(data);
        return saved;
    }

    /**
     * Saves notes in the database.
     * @param data
     * @returns
     */
    public updateCanvassingNote = async (data: CanvassingNote): Promise<CanvassingNote> => {
        const saved = await this.sqlProviderService.updateNote(data);
        return saved[0];
    }
}
