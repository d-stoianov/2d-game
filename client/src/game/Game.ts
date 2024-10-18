import { Socket } from 'socket.io-client'

import { GameStateInterface as GameState } from '~/shared/GameState'
import { Player } from '@/game/Player'
import { Label } from '@/game/Label'
import { PlayerInterface } from '~/shared/Player'

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
        this.gameState.players.forEach((p: PlayerInterface) => {
            const textYPadding = 5

            const player = Object.assign(new Player(), p)

            const label = new Label(
                this.ctx,
                player.x,
                player.y - textYPadding,
                player.nickname
            )

            const textWidth = label.measureText()
            label.x = label.x + player.width / 2 - textWidth / 2
            label.draw()

            this.ctx.fillRect(player.x, player.y, player.width, player.height)
        })
    }

    private update() {
        // pass input array to the backend
        const inputArray: string[] = []

        Object.keys(this.keys).forEach((key: string) => {
            if (this.keys[key]) {
                inputArray.push(key)
            }
        })

        this.socket.emit('input', inputArray)
    }
}
