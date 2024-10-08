import { Socket } from 'socket.io-client'
import { GameState } from '~/shared/GameState'

const WIDTH = 500
const HEIGHT = 500

const FPS: number = 60 // target frames per second
const MS_PER_FRAME: number = 1000 / FPS // frame duration in milliseconds

export class Game {
    private gameState: GameState = {
        players: [],
    }

    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D

    private socket: Socket

    private keys: { [id: string]: boolean } = {}

    private lastFrameTime: number = 0

    constructor(socket: Socket) {
        this.canvas = document.getElementById('game') as HTMLCanvasElement
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D

        this.socket = socket

        this.frame = this.frame.bind(this)
    }

    public start() {
        this.canvas.width = WIDTH
        this.canvas.height = HEIGHT

        // listen for keys
        window.addEventListener('keydown', (event) => {
            this.keys[event.key] = true
        })

        window.addEventListener('keyup', (event) => {
            this.keys[event.key] = false
        })

        // subscribe to game state from the server and update it on the client whenever we get it from the server
        this.socket.on('game-state', (updatedGameState: GameState) => {
            this.gameState = updatedGameState
        })

        requestAnimationFrame(this.frame)
    }

    private frame(timestamp: number) {
        const deltaTime = timestamp - this.lastFrameTime

        if (deltaTime >= MS_PER_FRAME) {
            this.render()
            this.update()

            this.lastFrameTime = timestamp
        }

        requestAnimationFrame(this.frame)
    }

    private render() {
        // clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        // draw each player
        this.gameState.players.forEach((player) => {
            this.ctx.fillRect(player.x, player.y, player.width, player.height)
        })
    }

    private update() {
        // if (this.keys['ArrowRight']) {
        //     this.player.x += PLAYER_SPEED * dtInSeconds
        // }
        // if (this.keys['ArrowLeft']) {
        //     this.player.x -= PLAYER_SPEED * dtInSeconds
        // }
        // if (this.keys['ArrowUp']) {
        //     this.player.y -= PLAYER_SPEED * dtInSeconds
        // }
        // if (this.keys['ArrowDown']) {
        //     this.player.y += PLAYER_SPEED * dtInSeconds
        // }
    }
}
