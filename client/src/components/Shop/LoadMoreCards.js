import React from 'react'
import PropTypes from 'prop-types'
import CradsBlockShop from '../UI/CradsBlockShop/CradsBlockShop'

const LoadMoreCards = ({grid, list, limit, size, loadMore}) => {
  return (
    <div>
      <div>
        <CradsBlockShop 
          grid={grid}
          list={list}
          title='Guitars'
        />
      </div>

      {
        size > 0 && size >= limit
        ? (
      <div className="load_more_container">
        <span onClick={() => loadMore()}>
          Load More
        </span>
      </div>
      )
        : null
      }
    </div>
  )
}

LoadMoreCards.propTypes = {
  grid: PropTypes.string, 
  list: PropTypes.array,
  limit: PropTypes.number,
  size: PropTypes.number,
  loadMore: PropTypes.func
}

export default LoadMoreCards
