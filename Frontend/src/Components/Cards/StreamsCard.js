import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullhorn, faAnglesRight, faXmark, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons'
import img from '../../Assets/Images/avatar.png' // de hatetshal lma n3ml el database

function StreamsCard() {
    return (
        <div className='bg-second_bg_color_dark  p-5 rounded-2xl mb-6 border-2 border-main_border_color_dark'>
            <div className='flex items-center mb-5'>
                <div className='text-main_font_color_dark mr-2 text-xl'>Streams</div>
                <FontAwesomeIcon icon={faCirclePlay} className='text-[#F63737] text-2xl' />
            </div>
            <div className='px-3'>
                <div className='flex items-center mb-5'>
                    <img
                        src={img} // blog.author.img
                        className="w-10 h-10 rounded-full mr-4"
                        alt="Ahmed-Hamdy"
                    />
                    <div class="text_sm">
                        <p className='leading-none text-main_font_color_dark'>Ahmed-Hamdy</p>
                    </div>
                </div>
                <div className='flex flex-col justify-center text-main_font_color_dark items-center'>
                    <div className='mb-5 text-sm'>
                        The 2023 ICPC Asia Jakarta Regional Mirror
                        Contest stream by jonathanirvings, wiwitrifai,
                        and Luqman
                    </div>
                    <div className='flex justify-center items-center'>
                        <div className='mb-3 text-sm text-second_font_color_dark font-bold mr-4'>Running</div>
                        <div className='mb-3 text-lg text-yellow_font_color font-bold'>01 : 30 : 20</div>
                    </div>
                </div>
            </div>
            <button className='block rounded-md text-blue_font_color mt-3 ml-auto'>
                View All
                <FontAwesomeIcon icon={faArrowRight} className='pl-3' />
            </button>
        </div>
    )
}

export default StreamsCard
