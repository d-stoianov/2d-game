import { createBrowserRouter } from 'react-router-dom'

import HomePage from '@/pages'
import CreatePage from '@/pages/Create'
import JoinPage from '@/pages/Join'
import GamePage from '@/pages/Game'

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/create',
        element: <CreatePage />,
    },
    {
        path: '/join/:roomId?',
        element: <JoinPage />,
    },
    {
        path: '/game/:roomId?',
        element: <GamePage />,
    },
])

export default router
