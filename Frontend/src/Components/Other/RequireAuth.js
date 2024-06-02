import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Outlet, useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import AuthContext from '../../Context/AuthProvider'

const RequireAuth = () => {
    const location = useLocation();
    const {pathname} = location
    const {auth} = useContext(AuthContext)
    // console.log("require")
    if(!auth.signedIn){
        // console.log(auth)
        return <Navigate to={`/enter?message=You must log in first&redirectTo=${pathname}`}/>
    }
    return <Outlet />
}

export default RequireAuth
