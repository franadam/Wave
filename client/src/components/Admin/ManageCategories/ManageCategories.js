import React from 'react'
import PropTypes from 'prop-types'
import UserLayout from '../../../hoc/Layout/UserLayout'
import ManageBrands from './ManageBrands'
import ManageWoods from './ManageWoods'

const ManageCategories = props => {
  return (
    <UserLayout>
      <ManageBrands />
      <ManageWoods />
    </UserLayout>
  )
}

ManageCategories.propTypes = {

}

export default ManageCategories
