import { GameObject } from '@/game/GameObject'

const WIDTH = 500
const HEIGHT = 500

const FPS: number = 60 // target frames per second
const MS_PER_FRAME: number = 1000 / FPS // frame duration in milliseconds

const PLAYER_SPEED = 200

export class Game {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D

    private keys: { [id: string]: boolean } = {}

    private lastFrameTime: number = 0

    private player: GameObject = new GameObject(
        WIDTH / 2 - 50 / 2,
        HEIGHT / 2 - 50 / 2,
        50,
        50
    )

    constructor() {
        this.canvas = document.getElementById('game') as HTMLCanvasElement
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D

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

        requestAnimationFrame(this.frame)
    }

    private frame(timestamp: number) {
        const deltaTime = timestamp - this.lastFrameTime

        if (deltaTime >= MS_PER_FRAME) {
            this.render()
            this.update(deltaTime)

            this.lastFrameTime = timestamp
        }

        requestAnimationFrame(this.frame)
    }

    private render() {
        // clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.fillRect(
            this.player.x,
            this.player.y,
            this.player.width,
            this.player.height
        )
    }

    private update(dt: number) {
        const dtInSeconds = dt / 1000

        if (this.keys['ArrowRight']) {
            this.player.x += PLAYER_SPEED * dtInSeconds
        }
        if (this.keys['ArrowLeft']) {
            this.player.x -= PLAYER_SPEED * dtInSeconds
        }
        if (this.keys['ArrowUp']) {
            this.player.y -= PLAYER_SPEED * dtInSeconds
        }
        if (this.keys['ArrowDown']) {
            this.player.y += PLAYER_SPEED * dtInSeconds
        }
    }
}
