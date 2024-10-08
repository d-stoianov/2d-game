import { GameObject } from "@/game/GameObject"
import { PlayerInterface } from "~/shared/Player"

export class Player extends GameObject implements PlayerInterface {
    public id: string

    constructor(
        id: string = "",
        x: number = 0,
        y: number = 0,
        width: number = 0,
        height: number = 0
    ) {
        super(x, y, width, height)
        this.id = id
    }
}
