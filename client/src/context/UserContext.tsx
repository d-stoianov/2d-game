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
    nickname: string
    setNickname: (value: string) => void
}

export const UserContext = createContext<UserContextI>({
    socket: null,
    isAuthorized: false,
    setIsAuthorized: () => {},
    nickname: '',
    setNickname: () => {},
})

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null)
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
    const [nickname, setNickname] = useState<string>('')

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
                nickname,
                setNickname,
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
