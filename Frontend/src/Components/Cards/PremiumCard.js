import React from 'react'
import img from '../../Assets/Images/avatar.png' // de hatetshal lma n3ml el database
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown } from '@fortawesome/free-solid-svg-icons'
function PremiumCard() {
    return (
        <div className='bg-second_bg_color_dark p-5 rounded-2xl mb-5 border-2 border-main_border_color_dark'>
            <p className='text-main_font_color_dark mb-3'>Get a <span className='text-yellow_font_color'>premium</span> experience and try the premium account for free <span className='text-yellow_font_color'>once</span>,
                and you will have access to all the paid courses and problemsets.
            </p>
            <div className='flex flex-col justify-center items-center mb-5'>
                <FontAwesomeIcon icon={faCrown} className='text-yellow_font_color text-3xl ' />
                <img
                    src={img}
                    className="w-16 h-16 rounded-full border border-yellow_font_color"
                    alt=""
                />
            </div>
            <div className='flex justify-center '>
                <button className='inline-block bg-yellow_font_color font-bold px-8 py-1 rounded-3xl'>Try Free</button>
            </div>
        </div>
    )
}

export default PremiumCard
