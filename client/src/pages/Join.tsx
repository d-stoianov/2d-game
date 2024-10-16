import { useUser } from '@/context/UserContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const JoinPage = () => {
    const navigate = useNavigate()
    const { socket, setIsAuthorized, setNickname: setUserNickname } = useUser()

    const [nickname, setNickname] = useState<string>('')
    const [roomId, setRoomId] = useState<string>('')

    const isButtonDisabled = nickname.length === 0 || roomId.length === 0

    const onJoin = () => {
        if (socket) {
            // do validation
            socket.emit('joinRoom', nickname, roomId)

            setIsAuthorized(true)
            setUserNickname(nickname)

            navigate(`/game/${roomId}`)
        }
    }

    return (
        <main className="mt-[10rem] flex flex-col items-center gap-4">
            <input
                className="h-[3rem] w-[16rem] rounded-xl border-2 pl-3"
                type="text"
                placeholder="Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
            />
            <input
                className="h-[3rem] w-[16rem] rounded-xl border-2 pl-3"
                type="text"
                placeholder="Room id"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
            />
            <button
                onClick={onJoin}
                disabled={isButtonDisabled}
                className={`h-[3rem] w-[16rem] rounded-xl text-center ${isButtonDisabled ? 'cursor-not-allowed bg-gray-300' : 'cursor-pointer bg-green-400 hover:bg-green-300'}`}
            >
                Join
            </button>
            <button onClick={() => navigate('../')} className="text-blue-500">
                Back
            </button>
        </main>
    )
}

export default JoinPage
