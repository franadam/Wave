import React from 'react'
import PropTypes from 'prop-types'
import Card from '../Card/Card'

const CradsBlock = ({list, title}) => {
  const renderCards = (cards=[]) => (
    cards.length
    ? cards.map((card, idx) => 
    (
      <Card
      key = {idx}
      {...card}
      />
    ))
    : null
  )

  return (
    <div className='card_block'>
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

CradsBlock.propTypes = {
  title: PropTypes.string,
  list: PropTypes.array
}

export default CradsBlock
