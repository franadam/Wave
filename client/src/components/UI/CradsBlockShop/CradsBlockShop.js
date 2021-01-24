import React from 'react'
import PropTypes from 'prop-types'
import Card from '../Card/Card'

const CradsBlockShop = ({list, title, grid}) => {
  const renderCards = (cards) => (
    cards.length
    ? cards.map((card) => 
    (
      <Card
      key = {card._id}
      {...card}
      grid={grid}
      />
    ))
    : <div className="no_result">
      Sorry, no results
    </div>
  )

  return (
    <div className='card_block_shop'>
      <div className="container">
        {
          title 
          ? (
            <div className="title">
              {
                title
              }
            </div>
          )
          : null
        }
        <div style={{
          display: 'flex',
          flexWrap:'wrap'
        }}>
          {renderCards(list)}
        </div>
      </div>
    </div>
  )
}

CradsBlockShop.propTypes = {
  title: PropTypes.string,
  grid: PropTypes.string,
  list: PropTypes.array
}

export default CradsBlockShop
