import React from 'react'
import ProfileLeftSide from './ProfileLeftSide/ProfileLeftSide'
import ProfileRightSide from './ProfileRightSide/ProfileRightSide'

const Profile = () => {
  return (
    <div className='text-white flex mt-2'>
        <ProfileLeftSide />
        <ProfileRightSide />
    </div>
  )
}

export default Profile
