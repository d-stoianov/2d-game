import { useUser } from '@/context/UserContext'
import { ReactNode, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { isAuthorized } = useUser()

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthorized) {
            const roomId = location.pathname.split('game')[1].replace('/', '')

            if (roomId) {
                navigate('/join', { state: roomId })
            } else {
                navigate('/')
            }
        }
    }, [isAuthorized, location])

    return children
}

export default ProtectedRoute
