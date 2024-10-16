import { Server as SocketIOServer } from "socket.io"
import { randomUUID, UUID } from "crypto"

import { Game } from "@/game/Game"
import { User } from "~/shared/User"

type Rooms = {
    [roomId: UUID]: {
        game: Game
        users: User[]
    }
}

export class RoomService {
    private rooms: Rooms = {}

    private userToRoomMap: Map<string, UUID> = new Map()
    private roomToGameMap: Map<UUID, Game> = new Map()

    public createRoom(creator: User, io: SocketIOServer): UUID {
        const roomId = randomUUID()
        const game = new Game(io, roomId)

        this.rooms[roomId] = {
            game,
            users: [creator],
        }

        this.userToRoomMap.set(creator.socketId, roomId)
        this.roomToGameMap.set(roomId, game)

        game.start()
        game.addPlayer(creator.socketId)

        return roomId
    }

    public joinRoom(roomId: UUID, user: User): void {
        const room = this.rooms[roomId]
        if (room) {
            room.users.push(user)
            this.userToRoomMap.set(user.socketId, roomId)
            room.game.addPlayer(user.socketId)
        }
    }

    public leaveRoom(roomId: UUID, user: User): void {
        const room = this.rooms[roomId]
        if (room) {
            room.users = room.users.filter((u) => u.socketId !== user.socketId)
            this.userToRoomMap.delete(user.socketId)

            room.game.removePlayer(user.socketId)

            // delete room if its empty
            if (room.users.length === 0) {
                this.deleteRoom(roomId)
            }
        }
    }

    private deleteRoom(roomId: UUID): void {
        delete this.rooms[roomId]
        this.roomToGameMap.delete(roomId)
    }

    public findGameByRoom(roomId: UUID): Game | null {
        return this.roomToGameMap.get(roomId) || null
    }

    public findRoomByUser(socketId: string): UUID | null {
        return this.userToRoomMap.get(socketId) || null
    }

    public findUserBySocketId(socketId: string): User | null {
        const roomId = this.userToRoomMap.get(socketId)
        if (roomId) {
            const room = this.rooms[roomId]
            return room?.users.find((u) => u.socketId === socketId) || null
        }
        return null
    }
}
