import React from 'react'
import { Outlet } from 'react-router-dom'
import VisitorNavBar from "../NavBar/VisitorNavBar/VisitorNavBar";

function Layout() {
    return (
        <>
            <div className="App bg-main_bg_color_dark p-4 h-full min-h-screen flex flex-col">
                <VisitorNavBar />
                <div className="lg:container lg:mx-auto mt-4 flex-1 container mx-auto">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Layout
