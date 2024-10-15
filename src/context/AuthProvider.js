import React, { useContext, useState } from 'react'
import { createContext } from "react";

const Context = createContext();

export { Context };

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState('light');

    return (
        <Context.Provider value={{ user, setUser, theme, setTheme }}>
            {children}
        </Context.Provider>
    )
}

export default AuthProvider

