import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/UserContextProvider.jsx'

function MessagePage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [join , setJoin] = useState(false)
  const [joinedRoomCode , setJoinedRoomCode] = useState("")
  
  const handleCreateRoom = (e) => {
    e.preventDefault()

    const min = 100000;
    const max = 999999;
    const randomCode = Math.floor(Math.random() * (max - min + 1)) + min;
    
    user.roomCode = randomCode
    navigate('/chat')
  
  }
  const handleJoinRoomforDialogueBox = (e) => {
    e.preventDefault()
    setJoin(true)
  }

  const handleRoomCode = (e) => {
    setJoinedRoomCode(e.target.value)
  }

  const handleJoinRoom = (e) => {
    e.preventDefault()
    user.roomCode = joinedRoomCode
    user.joined = true
    navigate('/chat')
  }

  const handleHomeClick = (e) => {
    e.preventDefault()
    navigate('/')

  }

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center">
      <button onClick={handleHomeClick} className='ml-[500px] text-black text-xl mt-[-550px] hover:cursor-pointer rounded-full w-[100px] h-[40px] bg-white active:scale-[.98] active:duration-75  transition-all hover:scale-[1.10] ease-in-out cursor-pointer animate-appear'>Home</button>
      <div className="bg-white rounded-lg shadow-md p-8 justify-center ml-[-600px] animate-appear">
        {!join ? (
          <div className="flex flex-col items-center animate-appear">
            <h1 className="text-3xl font-bold mb-6">Welcome to ChatApp</h1>
            <button
              onClick={handleJoinRoomforDialogueBox}
              className="bg-indigo-500 text-white py-2 px-4 rounded-md mb-4 hover:bg-indigo-600 transition-all active:duration-300 active:scale-[.98] hover:scale-[1.10] ease-in-out cursor-pointer animate-appear"
            >
              Join Room
            </button>
            <button
              onClick={handleCreateRoom}
              className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition-all active:duration-300 active:scale-[.98]  hover:scale-[1.10] ease-in-out cursor-pointer animate-appear"
            >
              Create Room
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center animate-appear">
            <h2 className="text-2xl font-bold mb-4 animate-appear ">Join Room</h2>
            <input
              type="text"
              onChange={handleRoomCode}
              value={joinedRoomCode}
              placeholder="Enter Room Code"
              className="bg-gray-200 py-2 px-4 rounded-md mb-4 w-full animate-appear"
            />
            <button
              className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition-all active:scale-[.98] active:duration-300 hover:scale-[1.10] ease-in-out cursor-pointer animate-appear"
              onClick={handleJoinRoom}
            >
              Join Room
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessagePage;