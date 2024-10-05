const WIDTH = 500
const HEIGHT = 500

export class Game {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D

    constructor() {
        this.canvas = document.getElementById('game') as HTMLCanvasElement
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    }

    public start() {
        this.canvas.width = WIDTH
        this.canvas.height = HEIGHT

        this.ctx.fillRect(WIDTH / 2 - 50 / 2, HEIGHT / 2 - 50 / 2, 50, 50)
    }
}
