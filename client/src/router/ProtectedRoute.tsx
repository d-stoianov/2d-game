import { useUser } from '@/context/UserContext'
import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { isAuthorized } = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthorized) {
            navigate('/')
        }
    }, [isAuthorized])

    return children
}

export default ProtectedRoute
