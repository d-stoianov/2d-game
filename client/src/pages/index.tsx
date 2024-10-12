import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const navigate = useNavigate()

    return (
        <main className="mt-[10rem] flex flex-col items-center gap-4">
            <button
                onClick={() => {
                    navigate('create')
                }}
                className={
                    'h-[3rem] w-[16rem] cursor-pointer rounded-xl bg-green-400 text-center hover:bg-green-300'
                }
            >
                Create Game
            </button>
            <button
                onClick={() => {
                    navigate('join')
                }}
                className={
                    'h-[3rem] w-[16rem] cursor-pointer rounded-xl bg-green-400 text-center hover:bg-green-300'
                }
            >
                Join Game
            </button>
        </main>
    )
}

export default HomePage
