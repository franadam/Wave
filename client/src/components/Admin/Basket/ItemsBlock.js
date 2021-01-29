import React from 'react'
import PropTypes from 'prop-types'

const ItemsBlock = ({items,  removeItem}) => {

  const renderCardImage = (images) => {
    if (images.length > 0) {
      return images[0].url
    }
    else {
      return '/images/image_not_availble.png'
    }
  }

  const renderItems = () =>
    items.basket
      ? items.basket.map((guitar) => (
          <div key={guitar._id} className="user_product_block">
            <div className="item">
              <div
                className="image"
                style={{
                  background: `url(${renderCardImage(
                    guitar.images
                  )}) no-repeat`,
                }}
              ></div>
            </div>
            <div className="item">
              <h4>Guitar name</h4>
              <div>
                {guitar.brand.name} {guitar.name}
              </div>
            </div>
            <div className="item">
              <h4>Quantity</h4>
              <div>{guitar.quantity}</div>
            </div>
            <div className="item">
              <h4>Price</h4>
              <div>€ {guitar.price}</div>
            </div>
            <div className="item btn">
              <div
                className="cart_remove_btn"
                onClick={() => removeItem(guitar._id)}
              >
                Remove
              </div>
            </div>
          </div>
        ))
      : null;
  return (
    <div>
      {renderItems()}
    </div>
  )
}

ItemsBlock.propTypes = {
  items : PropTypes.object,
  type : PropTypes.string,
  removeItem : PropTypes.func,
}

export default ItemsBlock
