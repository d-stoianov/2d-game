import { GameObject } from "@/game/GameObject"
import { PlayerInterface } from "~/shared/Player"

export class Player extends GameObject implements PlayerInterface {
    public id: string
    public speed: number
    public nickname: string

    constructor(
        id: string = "",
        x: number = 0,
        y: number = 0,
        width: number = 0,
        height: number = 0,
        speed: number = 0,
        nickname: string = ""
    ) {
        super(x, y, width, height)
        this.id = id
        this.speed = speed
        this.nickname = nickname
    }

    public update(dt: number, inputArray: string[]) {
        const dtInSeconds = dt / 1000

        if (inputArray.length === 0) return

        inputArray.forEach((input) => {
            switch (input) {
                case "ArrowLeft": {
                    const newX = this.x - dtInSeconds * this.speed
                    this.x = newX
                    break
                }
                case "ArrowRight": {
                    const newX = this.x + dtInSeconds * this.speed
                    this.x = newX
                    break
                }
                case "ArrowUp": {
                    const newY = this.y - dtInSeconds * this.speed
                    this.y = newY
                    break
                }
                case "ArrowDown": {
                    const newY = this.y + dtInSeconds * this.speed
                    this.y = newY
                    break
                }
                default:
                    break
            }
        })
    }
}
