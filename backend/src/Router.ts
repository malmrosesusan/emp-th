
import express, { Request, Response } from 'express';
import { NotesService } from './services/NotesService';

import { CanvassingNote } from '../../shared/typing/CanvassingNote';

export const applicationRouter = express.Router();
const notesService = new NotesService();

// Create note route
applicationRouter.post(
    '/canvassing-notes/create',
    async (
        req: Request<any, any, CanvassingNote>,
        res: Response<CanvassingNote>
    ) => {
        try {
            const savedNotes = await notesService.saveCanvassingNotes(req.body);
            res.status(200).send(savedNotes[0]);
        }
        catch (e: any) {
            res.status(500).send(e.message);
        }
    }
);
// Create note route
applicationRouter.post(
    '/canvassing-notes/edit',
    async (
        req: Request<any, any, CanvassingNote>,
        res: Response<CanvassingNote>
    ) => {
        try {
            const savedNote = await notesService.updateCanvassingNote(req.body);
            res.status(200).send(savedNote);
        }
        catch (e: any) {
            res.status(500).send(e.message);
        }
    }
);

// Get notes route
applicationRouter.get(
    '/canvassing-notes/all',
    async (
        req: Request<any, any, any>,
        res: Response<CanvassingNote[]>
    ) => {
        try {
            const notes = await notesService.getCanvassingNotes();
            res.status(200).send(notes);
        }
        catch (e: any) {
            res.status(500).send(e.message);
        }
    }
);
// Get specific note route
applicationRouter.get(
    '/canvassing-notes/note/:id',
    async (
        req: Request<any, any, any>,
        res: Response<CanvassingNote | null>
    ) => {
        try {
            const note = await notesService.getNote(req.params.id);
            res.status(200).send(note);
        }
        catch (e: any) {
            res.status(500).send(e.message);
        }
    }
);
