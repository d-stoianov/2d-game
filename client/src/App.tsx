import { Game } from '@/game/Game'
import { useEffect } from 'react'
import { io } from 'socket.io-client'

const App = () => {
    // wait for canvas to be created in html
    useEffect(() => {
        const socket = io(import.meta.env.VITE_API_URL)

        socket.on('connect', () => {
            console.log(`You connected with a ${socket.id}`)
        })

        const game = new Game(socket)
        game.start()

        return () => {
            socket.disconnect()
        }
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
