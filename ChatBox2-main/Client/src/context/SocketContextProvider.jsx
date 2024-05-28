import React , { createContext , useContext , useState , useEffect } from 'react'
import { io } from 'socket.io-client'

const getSocket = () => {
    const token = localStorage.getItem("userToken")

    return io("http://localhost:5000" , {
        withCredentials: true,
        auth: {token}
    })
}



const SocketContext = createContext({socket: null});

const useSocket = () => useContext(SocketContext);

const SocketProvider = ({children}) => {

    const [socket , setSocket] = useState(null)
    useEffect(() => {
        setSocket(getSocket())
    },[])

    return(
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}

export {useSocket , SocketProvider}
