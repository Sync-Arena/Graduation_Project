import React, { useEffect, useState } from 'react'
import img from '../../Assets/Images/avatar.png' // de hatetshal lma n3ml el database
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { } from '@fortawesome/free-brands-svg-icons'
import { faThumbsUp, faThumbsDown, faComment, faStar, faShareFromSquare, faCircleQuestion } from '@fortawesome/free-regular-svg-icons'
import { faStar as solidFaStart, faArrowRight } from '@fortawesome/free-solid-svg-icons'
function Blog({ blog }) {
    const [liked, setLiked] = useState(false)
    const [unLiked, setUnLiked] = useState(false)
    const [favorite, setFavorite] = useState(false)
    function toggleLikes() {
        blog.likes = liked ? blog.likes - 1 : blog.likes + 1
        setLiked(!liked)
    }
    function toggleUnLikes() {
        blog.unLikes = unLiked ? blog.unLikes - 1 : blog.unLikes + 1
        setUnLiked(!unLiked)
    }
    function toggleFavorite() {
        setFavorite(!favorite)
    }
    function formatNumber(n) {
        return n >= 1000000 ?
            `${Math.floor(n / 1000000)}M` :
            ((n >= 1000) ? `${Math.floor(n / 1000)}K` :
                n)
    }

    function blogSharedSince() {
        let millis = new Date() - new Date(blog.date) + 7200000;
        let seconds = Math.floor(millis / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);
        let months = Math.floor(days / 30);
        let years = Math.floor(months / 12);
        let finNum = years > 0 ? `${years} year` : (months > 0 ? `${months} month` :
            (days > 0 ? `${days} day` : (hours > 0 ? `${hours} hour` : (minutes > 0 ?
                `${minutes} minute` : `${seconds} second`))))
        return parseInt(finNum) > 1 ? `${finNum}s` : finNum
    }

    return (
        <div className='mb-6 p-10 bg-second_bg_color_dark border-2 border-main_border_color_dark rounded-2xl'>
            <div className='flex items-center mb-5'>
                <img
                    src={img} // blog.author.img
                    className="w-10 h-10 rounded-full mr-4"
                    alt={`${blog.author.name}`}
                />
                <div class="text_sm">
                    <p className='leading-none text-main_font_color_dark'>{blog.author.name}</p>
                    {/* we will store the date blog created at and will calculate what to be displayed */}
                    <p className='text-second_font_color_dark'>{blogSharedSince()} ago</p>
                </div>
            </div>
            <div className='bg-third_bg_color_dark p-10 rounded-md mb-5'>
                <div class="font-bold text-xl mb-4 text-main_font_color_dark">{blog.title}</div>
                <div class="text-base text-main_font_color_dark">
                    {blog.content.split("\n").map((i, key) => {
                        return <p key={key} className='mb-2'>{i}</p>
                    })}
                </div>
                {blog.type == 'blog' ? '' :
                    <div className='flex justify-center mt-7 text-[#2CBB5D]'>
                        <button className='inline-block bg-[#283A2E] py-2 px-6 rounded-md'>
                            Applay Here
                            <FontAwesomeIcon icon={faArrowRight} className='pl-3' />
                        </button>
                    </div>
                }
            </div>
            <div className="text-main_font_color_dark">
                <div className='inline-block px-3 py-2 bg-third_bg_color_dark rounded-md mr-1 cursor-pointer' onClick={toggleLikes}>
                    <FontAwesomeIcon icon={faThumbsUp} className={liked ? 'text-blue_font_color' : ''} />
                    <span className='ml-2'>{formatNumber(blog.likes)}</span>
                </div>
                <div className='inline-block px-3 py-2 bg-third_bg_color_dark rounded-md mr-1 cursor-pointer' onClick={toggleUnLikes}>
                    <FontAwesomeIcon icon={faThumbsDown} className={unLiked ? 'text-blue_font_color' : ''} />
                    <span className='ml-2'>{formatNumber(blog.unLikes)}</span>
                </div>
                <div className='inline-block px-3 py-2  mr-1 cursor-pointer'>
                    <FontAwesomeIcon icon={faComment} />
                    <span className='ml-2'>{formatNumber(blog.comments)}</span>
                </div>
                <span>|</span>
                <span className='inline-block pl-3 pr-2 py-2  cursor-pointer'>
                    <FontAwesomeIcon icon={!favorite ? faStar : solidFaStart} className={favorite ? 'text-yellow_font_color' : ''} onClick={toggleFavorite} />

                </span>
                <span className='inline-block px-2 py-2 cursor-pointer'>
                    <FontAwesomeIcon icon={faShareFromSquare} />
                </span>
                <span className='inline-block px-2 py-2 cursor-pointer'>
                    <FontAwesomeIcon icon={faCircleQuestion} />
                </span>
            </div>

        </div>
    )
}

export default Blog
