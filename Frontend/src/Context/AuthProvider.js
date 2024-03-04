import { createContext, useState } from "react";

const AuthContext = createContext({})
export const AuthProvider = ({ children }) => {
    // userData => all singed in user data
    const [auth, setAuth] = useState({userData: {}, signedIn: false})
    return (
        <div>
            <AuthContext.Provider value={{auth, setAuth}}>
                {children}
            </AuthContext.Provider>
    </div>
    )
}

export default AuthContext;
