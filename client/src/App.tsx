import { SocketProvider } from '@/context/SocketContext'
import router from '@/router'
import { RouterProvider } from 'react-router-dom'

const App = () => {
    return (
        <SocketProvider>
            <RouterProvider router={router} />
        </SocketProvider>
    )
}

export default App
