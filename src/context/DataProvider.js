import { createContext, useState } from "react";
import React from 'react';

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
    const [ account, setAccount ] = useState({ name: '', username: '' });
        
    return (
        <DataContext.Provider value={{ 
            account, 
            setAccount 
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;