import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({})
export const AuthProvider = ({ children }) => {
    // userData => all singed in user data
    const [auth, setAuth] = useState({ userData: {}, signedIn: false })
    const [check, sc] = useState(false)
    useEffect(() => {
        const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
        console.log(userInfo)
        console.log(auth)
        if (userInfo) {
            console.log("in")
            setAuth({ userData: userInfo, signedIn: true })
            console.log(auth)
            console.log(check)
            sc((prv) => true)
        }
        // console.log(auth)
    }, [check])
    console.log("provider")
    return (
        <div>
            <AuthContext.Provider value={{ auth, setAuth }}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}

export default AuthContext;
