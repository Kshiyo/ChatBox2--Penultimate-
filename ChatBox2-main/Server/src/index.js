import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";
import { Server } from 'socket.io'
import { createServer } from 'http'

dotenv.config({
    path: "./.env"
})

const server = createServer(app)
const io = new Server(server , {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
        }
})

const roomCreators = {}
const rooms = {}

connectDB()
.then( () => {
    app.on("error" , (error) => {
        console.log("Errror: ", error);
        throw error
    })

    io.on('connection',(socket) => {

        socket.on('createRoom',(roomCode) => {
            if(!rooms[roomCode]){
                rooms[roomCode] = new Set();
            }
            roomCreators[roomCode] = socket.id;
            rooms[roomCode].add(socket);
            socket.join(roomCode);
            console.log(`Room created: ${roomCode} by ${socket.id}`)
            
            const clients = io.sockets.adapter.rooms.get(roomCode);
            console.log(`Clients in room ${roomCode} after creating room:`, clients ? Array.from(clients) : []);
        })

        socket.on('joinRoom',(roomCode) => {
            if (rooms[roomCode]) {
                rooms[roomCode].add(socket);
                socket.join(roomCode)
                console.log(`User ${socket.id} joined room: ${roomCode}`)
                io.to(roomCode).emit('message' , 'A new user has joined the room')
            }else{
                console.log(`Room ${roomCode} does not exist`)
            }

            // Log all clients in the room
            const clients = io.sockets.adapter.rooms.get(roomCode);
            console.log(`Clients in room ${roomCode} after joining:`, clients ? Array.from(clients) : []);
        })

        socket.on('chatMessage',({roomCode , message}) => {
            if(rooms[roomCode]){
                console.log(`Server recieved message: ${message} for room: ${roomCode}`)
                rooms[roomCode].forEach((socket) => {
                    socket.emit('message', message)
                });
                console.log(`Message sent to room ${roomCode} : ${message}`)
            }else{
                console.log(`Room ${roomCode} does not exist.`)
            }
        })

        socket.on('leaveRoom',() => {
            console.log("User disconnected: " , socket.id);
            
            for (const [roomCode , creatorId] of Object.entries(roomCreators)) {
                if(creatorId === socket.id){
                    io.to(roomCode).emit('message','The room creator has left. The room is closed.')
                    Object.entries(rooms).forEach(([roomCode , sockets]) => {
                        if(sockets.has(socket)){
                            sockets.delete(socket)
                            if(sockets.size == 0){
                                delete rooms[roomCode]
                                console.log(`Room ${roomCode} has been destroyed`)
                            }
                        }
                    })
                }
            }
        })
    })



    server.listen(process.env.PORT || 8000 , () => {
        console.log(`Server is running on port: ${process.env.PORT}`);
    })
})
.catch( ( err ) => {
    console.log("MongoDb connection failed !!!", err)
})
