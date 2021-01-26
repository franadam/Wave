import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Button from '../Button/Button'

import {addGuitarToBasket} from '../../../store/actions';

export class Card extends Component {

  renderCardImage(images) {
    if (images.length > 0) {
      return images[0].url
    }
    else {
      return '/images/image_not_availble.png'
    }
  }

  render() {
    const props = this.props
    return (
      <div className={`card_item_wrapper ${props.grid}`} >
        <div className="image"
        style={{
          background: `url(${this.renderCardImage(props.images)}) no-repeat`
        }}></div>
        <div className="action_container">
          <div className="tags">
            <div className="brand">{props.brand.name}</div>
            <div className="name">{props.name}</div>
            <div className="name">€{props.price}</div>
          </div>
          {
            props.grid
            ? <div className="description">{props.description}</div>
            : null
          }
          <div className="actions">
            <div className="button_wrapp">
              <Button
                type="default"
                altClass="card_link"
                title="View Products"
                linkTo={`/guitar/${props._id}`}
                addStyles={{
                  margin: "10px 0 0 0"
                }}
              />
            </div>
            <div className="button_wrapp">
              <Button 
                type="bag_link"
                runAction={()=> {
                  props.user.info.isAuth
                  ? props.onAddGuitarToBasket(props._id)
                  :
                  console.log('added to cart')
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({user}) => ({
  user
})

const mapDispatchToProps = dispatch => ({
  onAddGuitarToBasket : (id) => dispatch(addGuitarToBasket(id))
}
)

Card.propTypes = {
  _id: PropTypes.string,
  grid: PropTypes.string, 
  images: PropTypes.array,
  brand: PropTypes.object,
  user: PropTypes.object,
  name: PropTypes.string,
  price: PropTypes.number,
  description: PropTypes.string,
  onAddGuitarToBasket: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(Card)
