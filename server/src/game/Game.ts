import { GameState } from "@/game/GameState"
import { Player } from "@/game/Player"
import { UUID } from "crypto"
import { Server as SocketIOServer } from "socket.io"

const FPS: number = 60 // target frames per second
const MS_PER_FRAME: number = 1000 / FPS // frame duration in milliseconds

const GAME_WIDTH = 1280
const GAME_HEIGHT = 720

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
        this.gameState.players.forEach((p) => {
            const inputArray = this.inputMap.get(p.id)
            if (inputArray) {
                p.update(dt, inputArray)
                this.checkWallCollision(p)
            }
        })
        this.checkPlayerCollisions()
    }

    private checkWallCollision(player: Player): void {
        const { x, y, width, height } = player

        if (x < 0) {
            player.x = 0
        } else if (x + width > GAME_WIDTH) {
            player.x = GAME_WIDTH - width
        }

        if (y < 0) {
            player.y = 0
        } else if (y + height > GAME_HEIGHT) {
            player.y = GAME_HEIGHT - height
        }
    }

    private checkPlayerCollisions(): void {
        const players = this.gameState.players

        for (let i = 0; i < players.length; i++) {
            for (let j = i + 1; j < players.length; j++) {
                const p1 = players[i]
                const p2 = players[j]

                if (this.isColliding(p1, p2)) {
                    this.resolvePlayerCollision(p1, p2)
                }
            }
        }
    }

    private isColliding(p1: Player, p2: Player): boolean {
        return (
            p1.x < p2.x + p2.width &&
            p1.x + p1.width > p2.x &&
            p1.y < p2.y + p2.height &&
            p1.y + p1.height > p2.y
        )
    }

    private resolvePlayerCollision(p1: Player, p2: Player): void {
        const overlapX = Math.min(
            p1.x + p1.width - p2.x,
            p2.x + p2.width - p1.x
        )
        const overlapY = Math.min(
            p1.y + p1.height - p2.y,
            p2.y + p2.height - p1.y
        )

        if (overlapX < overlapY) {
            if (p1.x < p2.x) {
                p1.x -= overlapX / 2
                p2.x += overlapX / 2
            } else {
                p1.x += overlapX / 2
                p2.x -= overlapX / 2
            }
        } else {
            if (p1.y < p2.y) {
                p1.y -= overlapY / 2
                p2.y += overlapY / 2
            } else {
                p1.y += overlapY / 2
                p2.y -= overlapY / 2
            }
        }
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
