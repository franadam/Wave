import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {FaFrown,FaSmile} from 'react-icons/all';
import {fetchGuitars, fetchBasketDetails, deleteGuitarFromBasket} from '../../../store/actions'
import UserLayout from '../../../hoc/Layout/UserLayout';
import ItemsBlock from './ItemsBlock';

export class Basket extends Component {
  state = {
    loading: true,
    total: 0,
    showTotal:false,
    showSuccess:false
  }

  componentDidMount() {
    this.props.onFetchGuitars();
    setTimeout(() => {
      if (this.props.user.info.basket.length)
      this.getBasketDetails();
    } , 500);
  }

  getBasketDetails = () => {
    const info  = this.props.user.info;
    const guitars = this.props.products.guitars;
    const items = info.basket.slice()
    const detail = items.map(item => ({...guitars.byId[item.id], quantity: item.quantity}));
    this.props.onGetBasketDetails(detail);
    
    this.calculateTotalPrice(detail)
  }

  calculateTotalPrice = (basket) => {
    let total = 0;
    basket.forEach((item) => {
      total += parseInt(item.price, 10) * item.quantity
    })
    this.setState({total, showTotal: true})
  }

  removeItemFromBasket = (id) => {
    console.log('removeItemFromBasket id :>> ', id);
    this.props.onDeleteGuitarFromBasket(id)
    this.setState({loading:false})
    if (this.props.user.info.basket.length > 0)
    this.calculateTotalPrice(this.props.user.basket);
    else this.setState({showTotal: false})
  }

  render() {
    const {showTotal, total, showSuccess} = this.state
    return (
      <UserLayout>
        <h1>My Basket</h1>
        <div className="user_cart">
          <ItemsBlock
            items={this.props.user}
            type="cart"
            removeItem={(id) => this.removeItemFromBasket(id)}
          />
          {
            showTotal
            ? (
              <div>
                <div className="user_cart_sum">
                  Total amount € {total}
                </div>
              </div>
              )
            : showSuccess
            ? (
              <div className="cart_success">
                <FaSmile />
                <div>Thank you</div>
              </div>
            )
            : (
              <div className="cart_no_items">
                <FaFrown />
                <div>You have no items</div>
              </div>
            )
          }

          {
            showTotal
            ? (
              <div className="paypal_button_container">
                Paypal
              </div>
              )
            : null
          }
        </div>
      </UserLayout>
    )
  }
}

const mapStateToProps = ({user, product}) => ({
  user,
  products: product
})

const mapDispatchToProps = dispatch => ({
  onFetchGuitars: () => dispatch(fetchGuitars()),
  onGetBasketDetails: (detail) => dispatch(fetchBasketDetails(detail)),
  onDeleteGuitarFromBasket: (detail) => dispatch(deleteGuitarFromBasket(detail))
})


Basket.propTypes = {
  user: PropTypes.object,
  products: PropTypes.object,
  onFetchGuitars : PropTypes.func,
  onGetBasketDetails : PropTypes.func,
  onDeleteGuitarFromBasket : PropTypes.func,
}

export default connect(mapStateToProps,mapDispatchToProps)(Basket)
