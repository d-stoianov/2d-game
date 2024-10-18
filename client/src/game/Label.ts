import { GameObject } from '@/game/GameObject'

export class Label extends GameObject {
    public text: string

    private ctx: CanvasRenderingContext2D

    constructor(
        ctx: CanvasRenderingContext2D,
        x: number = 0,
        y: number = 0,
        text: string = ''
    ) {
        super(x, y)

        this.ctx = ctx
        this.text = text
    }

    public measureText() {
        return this.ctx.measureText(this.text).width
    }

    public draw() {
        const originalFillStyle = this.ctx.fillStyle

        this.ctx.fillStyle = '#000000'

        this.ctx.fillText(this.text, this.x, this.y)

        // Restore original fill style
        this.ctx.fillStyle = originalFillStyle
    }
}
