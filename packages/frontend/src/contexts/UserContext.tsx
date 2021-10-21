import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

type User = {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
}

type AuthResponse = {
    token: string;
    user: User;
}

type UserContextData = {
    user: User | null;
    signInUrl: string;
    signOut: () => void;
}

type UserProvider = {
    children: React.ReactNode;
}

const UserContext = createContext({} as UserContextData);

export function UserProvider(props: UserProvider) {
    const [user, setUser] = useState<User | null>(null);

    // This Client ID is from the github oauth app
    const clientID = `c057ba61f2dd280d7f3d`
    const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${clientID}`

    function signOut() {
        setUser(null);
        localStorage.removeItem('@heat:token');
    }

    useEffect(() => {
        const token = localStorage.getItem('@heat:token');

        if (token) {
            api.defaults.headers.common.authorization = `Bearer ${token}`;

            api.get<User>('profile')
                .then(({ data }) => setUser(data));
        }
    }, [])

    useEffect(() => {
        const url = window.location.href;
        const urlHasGithubCode = url.includes('?code=');

        if (urlHasGithubCode) {
            const [urlWithoutCode, githubCode] = url.split('?code=');

            window.history.pushState({}, '', urlWithoutCode);
            api.post<AuthResponse>('/authenticate', { code: githubCode })
                .then(({ data }) => {
                    api.defaults.headers.common.authorization = `Bearer ${data.token}`;

                    localStorage.setItem('@heat:token', data.token);
                    setUser(data.user);
                })
        }
    }, [])

    return (
        <UserContext.Provider value={{
            user,
            signInUrl,
            signOut,
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext);