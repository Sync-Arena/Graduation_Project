import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullhorn, faAnglesRight, faXmark, faArrowRight } from '@fortawesome/free-solid-svg-icons'
function ContestsCard() {
  return (
    <div>
      <div className='bg-second_bg_color_dark  p-5 rounded-2xl mb-6 border-2 border-main_border_color_dark'>
        <div className='flex items-center mb-5'>
          <div className='text-main_font_color_dark mr-2 text-xl'>Contests</div>
          <FontAwesomeIcon icon={faBullhorn} className='text-yellow_font_color text-2xl' />
        </div>
        <div className='flex flex-col justify-center text-main_font_color_dark items-center mb-8 pb-8 border-b-2 border-main_border_color_dark '>
          <div className='mb-3 text-sm text-second_font_color_dark font-bold'>Running</div>
          <div className='mb-3 text-lg text-yellow_font_color font-bold'>01 : 30 : 20</div>
          <div className='text-center mb-5 text-sm'>The 2023 ICPC Asia Jakarta Regional Mirror
            Contest stream by jonathanirvings, wiwitrifai,
            and Luqman</div>
          <button className='bg-[#B02A24] font-bold px-4 py-2 rounded-md text-sm'>
            Register Now&nbsp;
            <FontAwesomeIcon icon={faAnglesRight} />
          </button>
        </div>
        <div className='flex flex-col justify-center text-main_font_color_dark items-center mb-8 pb-8 border-b-2 border-main_border_color_dark'>
          <div className='mb-3 text-sm text-second_font_color_dark font-bold'>Before Contest</div>
          <div className='mb-3 text-lg text-yellow_font_color font-bold'>01 : 30 : 20</div>
          <div className='text-center mb-5 text-sm'>The 2023 ICPC Asia Jakarta Regional Mirror
            Contest stream by jonathanirvings, wiwitrifai,
            and Luqman</div>
          <button className='bg-[#1D304A] font-bold px-4 py-2 rounded-md text-sm flex items-center'>
            Cancel Registeration&nbsp;&nbsp;
            <FontAwesomeIcon icon={faXmark} className='text-[#FF0000] text-2xl' />
          </button>
        </div>
        <div className='flex flex-col justify-center text-main_font_color_dark items-center'>
          <div className='mb-3 text-sm text-second_font_color_dark font-bold'>Before Contest</div>
          <div className='mb-3 text-lg text-yellow_font_color font-bold'>01 : 30 : 20</div>
          <div className='text-center mb-5 text-sm'>The 2023 ICPC Asia Jakarta Regional Mirror
            Contest stream by jonathanirvings, wiwitrifai,
            and Luqman</div>
          <button className='inline-block rounded-md text-blue_font_color mt-3 ml-auto'>
            View All
            <FontAwesomeIcon icon={faArrowRight} className='pl-3' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContestsCard
