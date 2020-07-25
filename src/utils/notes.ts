// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import * as Notes from '../database/models/note';
import moment from 'moment';

export const getNotes = async (userId: number): Promise<Notes.Note[]> => await Notes.model.find({userId}, (notes: []) => notes);

export const deleteNote = async (userId: number, noteId: number): Promise<Notes.Note | null> => await Notes.model.findOneAndDelete({userId, noteId});

export const create = async (userId: number, user: string, noteValue: string): Promise<Notes.Note | null> => {
  try {
    const noteId = Math.floor(Math.random() * (10000));
    const note: Notes.Note = new Notes.model({userId, user, note: noteValue, noteId, date: moment().locale('es').format('LLLT')});
    
    await note.save();
    return note;
  } catch (error) {
    await Promise.reject(error);
    return null;
  }
};

export const remove = async (notesPage: Notes.Note[], userId: number, id: number): Promise<void> => {
  try {
    notesPage.forEach(async (note, i) => {
      if((i + 1) === id) {
        await deleteNote(userId, note.noteId);
      }
    });   
  } catch (error) {
    await Promise.reject(error);
  }
};