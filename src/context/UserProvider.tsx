"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserType } from '@/db/model/UserModel';

interface UserContextData {
    user: UserType | null;
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}

const UserContext = createContext<UserContextData>({
    user: null,
    setUser: () => {},
});

export const useUser = () => useContext(UserContext);

interface UserProviderProps {
    children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserType | null>(null);
  
    useEffect(() => {
        //See if there is a user to connect him directly
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            //  There is a user
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        if(user) localStorage.setItem('user', JSON.stringify(user));
    }, [user]);
  
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};