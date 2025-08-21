import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import getAccessToken from '../services/getAccessToken'

export const AccessTokenContext = createContext<string | undefined>(undefined)

export function AccessTokenProvider({ children }: { children: ReactNode }) {
    const [accessToken, setAccessToken] = useState<string>()

    useEffect(() => {
        getAccessToken()
            .then(token => setAccessToken(token))
    }, [])

    return (
        <AccessTokenContext.Provider value={ accessToken }>
            {children}
        </AccessTokenContext.Provider>
    )
}

export function useAccessToken() {
    const context = useContext(AccessTokenContext)

    return context
}