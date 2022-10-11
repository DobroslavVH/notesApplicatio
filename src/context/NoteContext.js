import React from "react";
import { createContext, useReducer } from "react";
import jsonServer from "../api/jsonServer";

const NoteContext = createContext();

const noteReducer = (state, action) => {
    switch (action.type) {
        case 'get_notes':
            return action.payload;
        case 'delete_note':
            return state.filter((note) => note.id !== action.payload);
        case 'edit_note':
            return state.map((note) => {
                return note.id === action.payload.id 
                ? action.payload
                : note;
            });
        default:
            return state;
    }
};

export const NoteProvider = ({ children }) => {
    
    const [notes , dispatch] = useReducer(noteReducer, []);

    const getNotes = async () => {
        const response = await jsonServer.get('/notes');
        dispatch ({type: 'get_notes', payload: response.data });
    };

    const addNote = async (tag, date, title, content, callback) => {
        await jsonServer.post('/notes', {tag, date, title, content});
        if (callback) {
            callback();
        }
    };

    const deleteNote = async (id) => {
        await jsonServer.delete(`/notes/${id}`)
        dispatch({type: 'delete_note', payload: id})
    };

    const editNote = async (id, date, title, content, callback) => {
        await jsonServer.put(`/notes/${id}`, {date, title, content})
        //dispatch({type: 'edit_note', payload: {id, date, title, content}});
        callback();
    };

    return (
        <NoteContext.Provider value={{data: notes, addNote, deleteNote, editNote, getNotes}}>
            {children}
        </NoteContext.Provider>
    );
};

export default NoteContext;