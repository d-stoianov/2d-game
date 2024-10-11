import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const navigate = useNavigate()

    const [nickname, setNickname] = useState<string>('')

    const isButtonDisabled = nickname.length === 0

    return (
        <main className="flex h-screen flex-col items-center justify-center gap-4">
            <input
                className="h-[3rem] w-[16rem] rounded-xl border-2 text-center"
                type="text"
                placeholder="Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
            />
            <button
                onClick={() => {
                    navigate('game')
                }}
                disabled={isButtonDisabled}
                className={`h-[3rem] w-[16rem] rounded-xl text-center ${isButtonDisabled ? 'cursor-not-allowed bg-gray-300' : 'cursor-pointer bg-green-400 hover:bg-green-300'}`}
            >
                Play
            </button>
        </main>
    )
}

export default HomePage
