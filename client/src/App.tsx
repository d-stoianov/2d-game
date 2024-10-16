import { UserProvider } from '@/context/UserContext'
import router from '@/router'
import { RouterProvider } from 'react-router-dom'

const App = () => {
    return (
        <UserProvider>
            <RouterProvider router={router} />
        </UserProvider>
    )
}

export default App
