import { Game } from "@/game/Game"
import { Player } from "@/game/Player"
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

io.on("connection", (socket: Socket) => {
    console.log(`New player connected: ${socket.id}`)

    game.addPlayer(new Player(socket.id, 0, 0, 50, 50))

    socket.on("disconnect", () => {
        game.removePlayer(socket.id)
        console.log(`Player disconnected: ${socket.id}`)
    })
})

const game = new Game()
game.start()
