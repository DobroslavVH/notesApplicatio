import React, {createContext, useReducer} from "react";
import jsonServer from "../api/jsonServer";

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
    }
};


export const AuthProvider = ({children}) => {
    const [ users, dispatch ] = useReducer(authReducer, []);
    
    const signup = async ( email, password, callback ) => {
        await jsonServer.post('/users', {email, password});
        if (callback) {
            callback();
        }
    };

    /*
    const signup = (dispatch) => {
        return async ({ email, password }) => {
            await jsonServer.post('/signup', { email, password });
        };
    };
    const login = (dispatch) => {
        return ({ email, password }) => {
        };
    };
    const signout = (dispatch) => {
        return () => {
        };
    };
    */

    return (
        <AuthContext.Provider value={{state: users,  signup}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;