import { useUser } from '@/context/UserContext'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const JoinPage = () => {
    const navigate = useNavigate()
    const { state: roomIdFromParams } = useLocation()

    const { socket, setIsAuthorized } = useUser()

    const [nickname, setNickname] = useState<string>('')
    const [roomId, setRoomId] = useState<string>(roomIdFromParams ?? '')

    const [errorMsg, setErrorMsg] = useState<string>('')

    const isButtonDisabled = nickname.length === 0 || roomId.length === 0

    const onJoin = () => {
        if (socket) {
            // do validation
            socket.emit('joinRoom', nickname, roomId)

            socket.on('roomExists', (value: boolean) => {
                if (value) {
                    setIsAuthorized(true)
                    navigate(`/game/${roomId}`)
                } else {
                    setErrorMsg('Room not found')
                }
            })
        }
    }

    return (
        <main className="mt-[10rem] flex flex-col items-center gap-4">
            <input
                className="h-[3rem] w-[16rem] rounded-xl border-2 pl-3"
                type="text"
                placeholder="Nickname"
                maxLength={15}
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
            {errorMsg.length > 0 && <p className="text-red-500">{errorMsg}</p>}
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
