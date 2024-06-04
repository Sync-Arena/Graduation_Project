import React from 'react'
import ProfileDetails from './ProfileDetails'
import ProfilePlan from './ProfilePlan'

const ProfileLeftSide = () => {
  return (
    <div className='w-[30%]'>
      <ProfileDetails />
      <ProfilePlan />
    </div>
  )
}

export default ProfileLeftSide
