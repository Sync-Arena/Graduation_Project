import axios from "axios"
export async function login(userNameOrEmail, password) {
    try{
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/users/signin`,
            JSON.stringify({ userNameOrEmail, password }),
            {
                headers: { 'Content-Type': 'application/json' },
            })
            return res.data
    }
    catch(err){
        return err
    }
}