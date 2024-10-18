import { RoomService } from "@/RoomService"
import { UUID } from "crypto"
import { createServer } from "http"
import { Server as SocketIOServer, Socket } from "socket.io"
import { User } from "@/game/User"

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

const roomService = new RoomService()

io.on("connection", (socket: Socket) => {
    console.log(`New user connected: ${socket.id}`)

    socket.on("createRoom", (nickname: string) => {
        const creator: User = { nickname, socketId: socket.id }
        const roomId = roomService.createRoom(creator, io)

        socket.join(roomId)
        socket.emit("roomId", roomId)

        console.log(`User ${nickname} created room ${roomId}`)
    })

    socket.on("joinRoom", (nickname: string, roomId: UUID) => {
        const user: User = { nickname, socketId: socket.id }
        const game = roomService.findGameByRoom(roomId)

        if (game) {
            roomService.joinRoom(roomId, user)
            socket.join(roomId)

            console.log(`User ${nickname} joined room ${roomId}`)
            socket.emit("roomExists", true)
        } else {
            socket.emit("roomExists", false)
            console.log(`No room found by id ${roomId}`)
        }
    })

    socket.on("input", (inputArray: string[]) => {
        const roomId = roomService.findRoomByUser(socket.id)

        if (roomId) {
            const game = roomService.findGameByRoom(roomId)

            if (game) {
                game.registerPlayerInput(socket.id, inputArray)
            }
        }
    })

    socket.on("leaveRoom", (roomId: UUID) => {
        const user = roomService.findUserBySocketId(socket.id)

        if (user) {
            roomService.leaveRoom(roomId, user)
            socket.leave(roomId)

            console.log(`User ${user.nickname} left room ${roomId}`)
        }
    })

    socket.on("disconnect", () => {
        const roomId = roomService.findRoomByUser(socket.id)
        const user = roomService.findUserBySocketId(socket.id)

        if (roomId && user) {
            roomService.leaveRoom(roomId, user)
            socket.leave(roomId)

            console.log(`User ${user.nickname} disconnected`)
        }
    })
})
