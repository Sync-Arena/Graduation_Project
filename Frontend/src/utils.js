import { redirect } from "react-router-dom"

export async function requireAuth(request){
    const pathname = new URL(request.url).pathname
    const isLoggedIn = false
    if(!isLoggedIn){
        throw redirect(`/enter?message=You must log in first&redirectTo=${pathname}`)
    }
}