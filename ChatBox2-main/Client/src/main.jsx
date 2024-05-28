import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { MyProvider } from './context/UserContextProvider.jsx'
import { SocketProvider } from './context/SocketContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <MyProvider>
        <SocketProvider>
          <App/>
        </SocketProvider>
      </MyProvider>
    </BrowserRouter>,
)
