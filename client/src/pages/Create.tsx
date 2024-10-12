import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreatePage = () => {
    const navigate = useNavigate()

    const [nickname, setNickname] = useState<string>('')

    const isButtonDisabled = nickname.length === 0

    return (
        <main className="mt-[10rem] flex flex-col items-center gap-4">
            <input
                className="h-[3rem] w-[16rem] rounded-xl border-2 pl-3"
                type="text"
                placeholder="Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
            />
            <button
                onClick={() => {
                    navigate('/game')
                }}
                disabled={isButtonDisabled}
                className={`h-[3rem] w-[16rem] rounded-xl text-center ${isButtonDisabled ? 'cursor-not-allowed bg-gray-300' : 'cursor-pointer bg-green-400 hover:bg-green-300'}`}
            >
                Create
            </button>
            <button onClick={() => navigate('../')} className="text-blue-500">
                Back
            </button>
        </main>
    )
}

export default CreatePage
