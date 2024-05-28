import React , { createContext , useContext, useState } from 'react'

const UserContext = createContext();

const useAuth = () => useContext(UserContext)

const MyProvider = ({children}) => {
    const [user, setUser] = useState({
        userId: null,
        token: null,
        userName: null,
        roomCode: null,
        joined: null
    });

    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export { MyProvider , UserContext , useAuth }