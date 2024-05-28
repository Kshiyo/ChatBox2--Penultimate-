import React from "react";
import { Routes , Route , Navigate } from "react-router-dom";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Home from "./components/Home.jsx";
import MessagePage from "./components/MessagePage.jsx";
import Chat from "./components/Chat.jsx"
import { useAuth } from "./context/UserContextProvider.jsx";



const App = () => {

    const { user } = useAuth()

    return(
        <Routes>
            <Route
             path="/"
             element={ user.userId && user.token ? <MessagePage/> : <Home/>}
            ></Route>

            <Route
             path="/login"
             element={<Login/>}
            ></Route>

            <Route
             path="/register"
             element={<Register/>}
            ></Route>

            <Route
             path="/message"
             element={ user.userId && user.token ? <MessagePage/> : <Navigate to="/login" />}
            ></Route>

            <Route
             path="/chat"
             element={ <Chat/> }
            ></Route>


        </Routes>
    )
}

export default App;