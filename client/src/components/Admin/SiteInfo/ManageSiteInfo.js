import React from 'react'
import EditSiteInfo from './EditSiteInfo'
import UserLayout from '../../../hoc/Layout/UserLayout'

const ManageSiteInfo = () => {
  return (
    <UserLayout>
      <h1>Manage Site Info</h1>
      <EditSiteInfo />
    </UserLayout>
  )
}

export default ManageSiteInfo
