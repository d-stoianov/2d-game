import { Game } from "@/game/Game"
import { RoomService } from "@/RoomService"
import { UUID } from "crypto"
import { createServer } from "http"
import { Server as SocketIOServer, Socket } from "socket.io"

const PORT = 8080

const server = createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" })
    res.write("Server is live")
    res.end()
})

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})

const io = new SocketIOServer(server, {
    cors: {
        origin: "*",
    },
})

type User = {
    socketId: string
    nickname: string
}

const roomService = new RoomService()

const socketIdToUser: { [socketId: string]: User } = {}

io.on("connection", (socket: Socket) => {
    console.log(`New user connected: ${socket.id}`)

    socket.on("createRoom", (nickname: string) => {
        const creator: User = { nickname: nickname, socketId: socket.id }
        socketIdToUser[socket.id] = creator
        const roomId = roomService.createRoom(creator)

        const game = new Game(io)
        game.start()

        game.addPlayer(socket.id)

        socket.on("input", (inputArray: string[]) => {
            game.registerPlayerInput(socket.id, inputArray)
        })

        socket.emit("roomId", roomId)
    })

    socket.on("joinRoom", (nickname: string, roomId: UUID) => {
        const user: User = { nickname: nickname, socketId: socket.id }
        socketIdToUser[socket.id] = user
        roomService.joinRoom(roomId, user)
    })

    socket.on("leaveRoom", (roomId: UUID) => {
        const user = socketIdToUser[socket.id]
        if (user) {
            roomService.leaveRoom(roomId, user)
            delete socketIdToUser[socket.id]
        }
    })

    socket.on("disconnect", () => {
        const user = socketIdToUser[socket.id]
        if (user) {
            const roomId = roomService.findRoomByUser(socket.id)
            if (roomId) {
                roomService.leaveRoom(roomId, user)
            }
            delete socketIdToUser[socket.id]
        }

        console.log(`User disconnected: ${socket.id}`)
    })
})
