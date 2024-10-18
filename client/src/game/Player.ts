import { GameObject } from '@/game/GameObject'
import { PlayerInterface } from '~/shared/Player'

export class Player extends GameObject implements PlayerInterface {
    public id: string
    public speed: number
    public nickname: string

    constructor(
        id: string = '',
        x: number = 0,
        y: number = 0,
        width: number = 0,
        height: number = 0,
        speed: number = 0,
        nickname: string = ''
    ) {
        super(x, y, width, height)
        this.id = id
        this.speed = speed
        this.nickname = nickname
    }

    // future methods
}
