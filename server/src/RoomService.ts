import { randomUUID, UUID } from "crypto"

type User = {
    socketId: string
    nickname: string
}

type Rooms = {
    [roomId: UUID]: User[]
}

export class RoomService {
    private rooms: Rooms = {}

    public createRoom(creator: User): UUID {
        const roomId = randomUUID()

        this.rooms[roomId] = []
        this.rooms[roomId].push(creator)

        console.log(
            `New room created: ${roomId} by user: ${JSON.stringify(creator)}`
        )

        return roomId
    }

    public joinRoom(roomId: UUID, user: User) {
        if (this.rooms[roomId]) {
            this.rooms[roomId].push(user)
            console.log(
                `User: ${JSON.stringify(user)} joined the room: ${roomId}`
            )
        }
    }

    public leaveRoom(roomId: UUID, user: User) {
        const userIndex = this.rooms[roomId].indexOf(user)
        this.rooms[roomId].splice(userIndex, 1)

        console.log(`User: ${JSON.stringify(user)} left the room: ${roomId}`)

        console.log("THIS ROOMS:", JSON.stringify(this.rooms))

        // delete room if its empty
        if (this.rooms[roomId].length === 0) {
            console.log(`Room: ${roomId} was cleared, because it's empty`)
            delete this.rooms[roomId]
        }
    }

    public findRoomByUser(socketId: string): UUID | null {
        for (const [roomId, users] of Object.entries(this.rooms)) {
            if (users.some((user) => user.socketId === socketId)) {
                return roomId as UUID
            }
        }
        return null
    }
}
