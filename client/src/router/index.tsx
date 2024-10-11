import GamePage from '@/pages/Game'
import HomePage from '@/pages/Home'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/game',
        element: <GamePage />,
    },
])

export default router
