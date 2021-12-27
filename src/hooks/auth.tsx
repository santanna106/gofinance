import React, { ReactNode,createContext, useContext } from 'react';
import AuthSession from 'expo-auth-session';

interface AuthProviderProps {
    children: ReactNode;
}

interface User {
    id:string;
    name:string;
    email:string;
    photo?:string;
}

interface IAuthContextData {
    user: User;
    signInWithGoogle(): Promise<void>;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({children}:AuthProviderProps){
    const user = {
        id: 'e2131231',
        name:'Gabriel Andrade',
        email:'gabriel.satna@gmail.com'
    }

    async function signInWithGoogle(){
        try{
            const CLIENT_ID='1016420575854-ma0u6sn0vsemirkga2dvgojam0q6ro7o.apps.googleusercontent.com';
            const REDIRECT_URI='https://auth.expo.io/@gabriel.ensinoeaprendizado/gofinance';
            const RESONSE_TYPE='token';
            const SCOPE=encodeURI('profile email');

            const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESONSE_TYPE}&scope=${SCOPE}`;
            console.log(authUrl);
            const response = await AuthSession.startAsync({authUrl});

            console.log("Response",response);
        }catch (error){
            throw new Error(error as string);
        }

    }

    return (
        <AuthContext.Provider value={{
            user,
            signInWithGoogle
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext);
    return context;
}

export {AuthProvider,useAuth}