import {createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(() => {
        const storedUser = localStorage.getItem("work_flow_token");
        try {
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) { 
            console.error("Failed to parse user data:", error);
            return null;
        }
    });

    const updateUser = (data) => {
        setCurrentUser(data)
    }

    useEffect(()=> {
        localStorage.setItem("work_flow_token", JSON.stringify(currentUser));
    },[currentUser])

    return (
        <AuthContext.Provider value={{currentUser, updateUser}}>
            {children} 
        </AuthContext.Provider>
    )
} 