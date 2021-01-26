import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addGuitarToBasket, fetchGuitars } from '../../store/actions';
import GuitarInfo from './GuitarInfo';
import GuitarImage from './GuitarImage';
import GuitarHeader from '../UI/PageTop/PageTop'

export class Guitar extends Component {

  componentDidMount() {
    this.props.onFetchGuitars()
  }

  addToBasketHandler = (id) => {
    console.log('id :>> ', id);
    this.props.onAddGuitarToBasket(id)
  }

  pageNotFound = () => {
    setTimeout(() => {
      this.props.history.push('/home')
    }, 1000);
    return 'Not found'
  }

  render() {
    const {id} = this.props.match.params;
    const {guitars} = this.props.products;
    return (
      <div>
      <GuitarHeader 
        title="Guitar Info"
      />
        <div className="container">
          {
            guitars.byId[id] && guitars.byId[id].name
            ? (
              <div className="product_detail_wrapper">
                <div className="left">
                  <div style={{width:'500px'}}>
                    <GuitarImage
                      addToBasket={(id) => this.addToBasketHandler(id)}
                      detail={guitars.byId[id]}
                    />
                  </div>
                </div>
                <div className="right">
                  <GuitarInfo
                    addToBasket={(id) => this.addToBasketHandler(id)}
                    detail={guitars.byId[id]}
                  />
                </div>
              </div>
              )
            : guitars.allIds.findIndex(idx => idx === id) 
            ? this.pageNotFound()
            : 'Loading'
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({product}) => ({
  products: product
})

const mapDispatchToProps = dispatch => ({
  onFetchGuitars: () => dispatch(fetchGuitars()),
  onAddGuitarToBasket : (id) => dispatch(addGuitarToBasket(id))
})

Guitar.propTypes = {
  products: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,
  onFetchGuitars: PropTypes.func,
  onAddGuitarToBasket: PropTypes.func
}

export default connect(mapStateToProps,mapDispatchToProps)(Guitar)
