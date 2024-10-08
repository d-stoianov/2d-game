import { Player } from "@/game/Player"

const FPS: number = 60 // target frames per second
const MS_PER_FRAME: number = 1000 / FPS // frame duration in milliseconds

export class Game {
    private gameState: GameState

    private lastFrameTime: number = 0
    private gameTime: number = 0

    private lastLogTime: number = 0

    constructor() {
        this.gameState = new GameState()
    }

    public start(): void {
        // game loop
        setTimeout(() => {
            this.frame()
        }, MS_PER_FRAME)
    }

    public addPlayer(p: Player): void {
        this.gameState.players.push(p)
    }

    public removePlayer(id: string): void {
        const playerIndex = this.gameState.players.findIndex((p) => p.id === id)
        if (playerIndex !== -1) {
            this.gameState.players.splice(playerIndex, 1)
        }
    }

    private frame(): void {
        this.gameTime = performance.now()
        const dt = this.gameTime - this.lastFrameTime
        this.lastFrameTime = this.gameTime

        this.update(dt)
        this.render()
        this.log()

        setTimeout(() => {
            this.frame()
        }, MS_PER_FRAME)
    }

    private render() {}

    private update(dt: number) {}

    private log() {
        const LOG_INTERVAL = 1000

        if (this.gameTime - this.lastLogTime >= LOG_INTERVAL) {
            console.log("Game state players: ", this.gameState.players)

            this.lastLogTime = this.gameTime
        }
    }
}

class GameState {
    public players: Player[] = []
}
