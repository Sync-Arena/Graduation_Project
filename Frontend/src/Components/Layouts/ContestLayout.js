import React from 'react'
import { NavLink, Outlet, useParams } from 'react-router-dom'

function ContestLayout() {
    const params = useParams();
    const activeStyles={
        backgroundColor: "#007AFF",
        color: "#FFFFFF",
    }
    
    return (
        <div className=''>
            <nav className='flex justify-around border-b-2 border-main_border_color_dark mb-10 pt-6 pb-10 text-second_font_color_dark'>
                <NavLink to="" end className='inline-block basis-1/4 align-center mr-8 text-center p-2 rounded-md' style={({isActive}) => isActive ? activeStyles: null}>Problems</NavLink>
                <NavLink to="mySubmission" className='inline-block basis-1/4 align-center mx-8 text-center p-2 rounded-md' style={({isActive}) => isActive ? activeStyles: null}>My Submission</NavLink>
                <NavLink to="status" className='inline-block basis-1/4 align-center mx-8 text-center p-2 rounded-md' style={({isActive}) => isActive ? activeStyles: null}>Status</NavLink>
                <NavLink to="standing" className='inline-block basis-1/4 align-center mx-8 text-center p-2 rounded-md' style={({isActive}) => isActive ? activeStyles: null}>Standing</NavLink>
            </nav>
            <Outlet />
        </div>

    )
}

export default ContestLayout
