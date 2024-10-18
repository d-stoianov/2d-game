import { Player } from '@/game/Player'
import { GameStateInterface } from '~/shared/GameState'

export class GameState implements GameStateInterface {
    public players: Player[]

    constructor() {
        this.players = []
    }
}
