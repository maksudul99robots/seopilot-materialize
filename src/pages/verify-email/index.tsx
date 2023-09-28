'use client'
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "src/hooks/useAuth";

const VerifyEmail = () => {
    const auth = useAuth()
    const paramString = useSearchParams();
    const [param, setParam] = useState(paramString.get('token'));
    useEffect(() => {
        if (paramString.get('token')) {
            setParam(paramString.get('token'));
        }
    }, [paramString.get('token')])

    useEffect(() => {
        if (param) {
            if (param?.length > 8) {
                auth.verifyEmail({ token: param })
            }
        }

    }, [param])

    return (
        <></>
    )
}

export default VerifyEmail;