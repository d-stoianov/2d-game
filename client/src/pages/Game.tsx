import { useUser } from '@/context/UserContext'
import { Game } from '@/game/Game'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const GamePage = () => {
    const user = useUser()
    const { roomId } = useParams()

    const { socket, setIsAuthorized } = user

    useEffect(() => {
        if (socket && roomId) {
            const game = new Game(socket)
            game.start()

            return () => {
                game.stop()

                setIsAuthorized(false)
                socket.emit('leaveRoom', roomId)
            }
        }
    }, [])

    return (
        <main className="flex h-screen flex-col items-center justify-center">
            <canvas id="game" className="flex border-2 border-black"></canvas>
        </main>
    )
}

export default GamePage
