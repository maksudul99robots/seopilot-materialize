import { useEffect } from "react"
import { useRouter } from 'next/router'
import { useAuth } from "src/hooks/useAuth";

const GoToLogin = () => {
    const { logout } = useAuth()
    const router = useRouter();
    useEffect(() => {
        logout();
    }, [])

    return (
        <>
        </>
    )
}
export default GoToLogin