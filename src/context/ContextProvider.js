import React, {useState} from 'react';
import { createContext } from 'react';


export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [ state, setState ] = useState({
        name: "name",
        photoURL: "",
        email: "example@gmail.com",
        role: "manager"
    })
    
    return (
        <Context.Provider value={ [ state, setState ] }>
            {children}
        </Context.Provider>
    );
};
export default ContextProvider;

