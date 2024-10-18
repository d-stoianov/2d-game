import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react'
import { io, Socket } from 'socket.io-client'

interface UserContextI {
    socket: Socket | null
    isAuthorized: boolean
    setIsAuthorized: (value: boolean) => void
}

export const UserContext = createContext<UserContextI>({
    socket: null,
    isAuthorized: false,
    setIsAuthorized: () => {},
})

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null)
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false)

    useEffect(() => {
        const newSocket = io(import.meta.env.VITE_API_URL)

        newSocket.on('connect', () => {
            console.log(`You connected with socket ID: ${newSocket.id}`)
        })

        setSocket(newSocket)

        return () => {
            newSocket.disconnect()
        }
    }, [])

    return (
        <UserContext.Provider
            value={{
                socket,
                isAuthorized,
                setIsAuthorized,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const user = useContext(UserContext)

    return user
}
