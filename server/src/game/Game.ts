import { GameState } from "@/game/GameState"
import { Player } from "@/game/Player"
import { UUID } from "crypto"
import { Server as SocketIOServer } from "socket.io"

const FPS: number = 60 // target frames per second
const MS_PER_FRAME: number = 1000 / FPS // frame duration in milliseconds

export class Game {
    private io: SocketIOServer
    private roomId: UUID
    private gameState: GameState = {
        players: [],
    }

    private inputMap: Map<string, string[]> = new Map<string, string[]>()

    private lastFrameTime: number = 0
    private gameTime: number = 0

    private lastLogTime: number = 0

    constructor(io: SocketIOServer, roomId: UUID) {
        this.io = io
        this.roomId = roomId
    }

    public start(): void {
        // game loop
        setTimeout(() => {
            this.frame()
        }, MS_PER_FRAME)
    }

    public addPlayer(id: string, nickname: string): void {
        this.inputMap.set(id, [])

        const player = new Player(id, 0, 0, 50, 50, 250, nickname)
        this.gameState.players.push(player)
    }

    public removePlayer(id: string): void {
        const playerIndex = this.gameState.players.findIndex((p) => p.id === id)
        if (playerIndex !== -1) {
            this.gameState.players.splice(playerIndex, 1)
        }
    }

    public registerPlayerInput(id: string, inputArray: string[]): void {
        this.inputMap.set(id, inputArray)
    }

    private frame(): void {
        this.gameTime = performance.now()
        const dt = this.gameTime - this.lastFrameTime
        this.lastFrameTime = this.gameTime

        this.update(dt)
        this.render()

        setTimeout(() => {
            this.frame()
        }, MS_PER_FRAME)
    }

    private render() {
        this.io
            .to(this.roomId)
            .emit("game-state", this.gameState, new Date().getTime())
    }

    private update(dt: number) {
        // update each player in game state
        this.gameState.players.forEach((p) => {
            const inputArray = this.inputMap.get(p.id)
            if (inputArray) {
                p.update(dt, inputArray)
            }
        })
    }

    private log() {
        const LOG_INTERVAL = 1000

        if (this.gameTime - this.lastLogTime >= LOG_INTERVAL) {
            console.log("Game state players: ", this.gameState.players)
            console.log("Input map: ", this.inputMap)

            this.lastLogTime = this.gameTime
        }
    }
}
