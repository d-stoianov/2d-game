import { Game } from '@/game/Game'
import { useEffect } from 'react'

const App = () => {
    // wait for canvas to be created in html
    useEffect(() => {
        const game = new Game()
        game.start()
    }, [])

    return (
        <main className="flex h-screen flex-col items-center">
            <h1 className="mb-[3rem] mt-[1rem] text-center text-3xl font-bold underline">
                2d game
            </h1>
            <canvas id="game" className="flex border-2 border-black"></canvas>
        </main>
    )
}

export default App
