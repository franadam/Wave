import React from 'react'
import UserLayout from '../../../hoc/Layout/UserLayout'
import EditProfilePersonalInfo from './EditProfilePersonalInfo'

const EditProfile = () => {
  return (
    <UserLayout>
      <h1>Edit Profile</h1>
      <EditProfilePersonalInfo/>
    </UserLayout>
  )
}

export default EditProfile
