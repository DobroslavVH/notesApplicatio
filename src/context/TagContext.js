import React from "react";
import { createContext, useReducer } from "react";
import jsonServer from "../api/jsonServer";

const TagContext = createContext();

const tagReducer = ( state, action ) => {
    switch (action.type) {
        case 'get_tags':
            return action.payload;
        case 'delete_tag':
            return state.filter((tagList) => tagList.id !== action.payload);
        default:
            return state;
    }
};

export const TagProvider = ({children}) => {

    const [tags, dispatch] = useReducer(tagReducer, []);

    const getTags = async () => {
            const response = await jsonServer.get('/tags');
            dispatch({type: 'get_tags', payload: response.data});
    };
    
    const addTag = async (title, callback) => {
            await jsonServer.post('/tags', {title});
            if (callback) {
                callback();
            }
    };
    
    const deleteTag = async (id) => {
            await jsonServer.delete(`/tags/${id}`);
            dispatch ({type: 'delete_tag', payload: id});
        };
    return (
        <TagContext.Provider value={{data: tags, getTags, addTag, deleteTag}}>
            {children}
        </TagContext.Provider>
    );
};

export default TagContext;