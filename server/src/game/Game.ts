const FPS: number = 60 // target frames per second
const MS_PER_FRAME: number = 1000 / FPS // frame duration in milliseconds

export class Game {
    private lastFrameTime: number = 0
    private gameTime: number = 0

    public start(): void {
        // game loop
        setTimeout(() => {
            this.frame()
        }, MS_PER_FRAME)
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

    private render() {}

    private update(dt: number) {
        console.log(dt)
    }
}
