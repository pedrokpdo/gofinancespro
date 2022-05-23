import React, { createContext, ReactNode, useContext, useState } from 'react'

import * as AuthSession from 'expo-auth-session'
import { Linking } from 'react-native';

interface AuthProviderProps {
    children: ReactNode;

}

interface AuthorizationResponse {
    params: {
        access_token: string;
    };
    type: string;

}

interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface AuthContextData {
    user: User;
    signInWithGoogle(): Promise<void>

}

export const AuthContext = createContext({})

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>({} as User)

    async function signInWithGoogle() {
        try {
            const CLIENT_ID = '42443275720-voqiuoc5t8e63749e4fi0sgn79e1e37a.apps.googleusercontent.com';
            const REDIRECT_URI = 'https://auth.expo.io/@pedrokpdo/gofinancesprozera';
            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');
            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

            const resp = await AuthSession
                .startAsync({ authUrl }) as AuthorizationResponse;

            if (resp.type === 'success') {
                const response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${resp.params.access_token}`)
                const userInfo = await response.json()
                setUser({
                    id: userInfo.id,
                    email: userInfo.email,
                    name: userInfo.give_name,
                    photo: userInfo.picture
                })

            }

        } catch (error) {

        }
    }
    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext)

    return context
}

export { AuthProvider, useAuth }