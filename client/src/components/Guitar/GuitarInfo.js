import React from 'react'
import PropTypes from 'prop-types'
import Button from '../UI/Button/Button'
import {FaTruck, FaCheck, FaTimes} from 'react-icons/all';

const GuitarInfo = ({detail, addToBasket}) => {

  const showTags = (detail) => (
    <div className="product_tags">
      {
        detail.shipping 
        ? <div className="tag">
          <div><FaTruck/></div>
          <div className="tag_text">
            <div>Free Shipping</div>
            <div>And return</div>
          </div>
        </div>
        : null
      } 
      {
        detail.available 
        ? <div className="tag">
          <div><FaCheck/></div>
          <div className="tag_text">
            <div>Available</div>
            <div>in store</div>
          </div>
        </div>
        : (
        <div className="tag">
          <div><FaTimes/></div>
          <div className="tag_text">
            <div>Not Available</div>
            <div>preorder</div>
          </div>
        </div>)
      }
    </div>
  )

  const showActions = (detail) => (
    <div className="product_actions">
      <div className="price">€ {detail.price}</div>
      <div className="cart">
        <Button
          type="add_to_cart_link"
          runAction={()=> addToBasket(detail._id)}
        />
      </div>
    </div>
  )

  const showSpecifications = (detail) => (
    <div className="product_specifications">
      <h2>Specs:</h2>
      <div>
        <div className="item">
          <strong>Frets:</strong> {detail.frets}
        </div>
        <div className="item">
          <strong>Woods:</strong> {detail.wood.name}
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <h1>{detail.brand.name} {detail.name}</h1>
      <p>{detail.description}</p>
      {showTags(detail)}
      {showActions(detail)}
      {showSpecifications(detail)}
    </div>
  )
}

GuitarInfo.propTypes = {
  detail: PropTypes.object,
  addToBasket: PropTypes.func
}

export default GuitarInfo
