import { GameObjectInterface } from "./GameObject"

export interface PlayerInterface extends GameObjectInterface {
    id: string
    speed: number
    nickname: string
}
