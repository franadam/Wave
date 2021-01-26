import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LightBox from '../UI/LightBox/LightBox';

export class GuitarImage extends Component {
  state = {
    lightbox: false,
    imagePos: 0,
    lightboxImages: []
  } 

  componentDidMount() {
    const {images} = this.props.detail;
    if (images.length > 0) {
      const lightboxImages = images.map(img => img.url)
      this.setState({lightboxImages})
    }
  }

  getImageURL = (images) => {
    if(images.length > 0) {
      return images[0].url
    } else {
      return '/images/image_not_availble.png'
    }
  }

  lightboxHandler = (imagePos) => {
    if (this.state.lightboxImages.length > 0) {
      this.setState({lightbox: true, imagePos})
    }
  }

  lightboxClosingHandler = () => {
    this.setState({lightbox: false})
  }

  showThumbs = () => (
    this.state.lightboxImages.map((img, idx) =>(
      idx > 0
      ? (
        <div 
          key={idx} 
          className="thumb"
          onClick={() => this.lightboxHandler(idx)}
          style={{ background:`url(${img}) no-repeat`}}
        ></div>
      )
      : null
    ))
  )

  render() {
    const {detail} = this.props;
    const {lightbox, imagePos, open, lightboxImages} = this.state
    return (
      <div className="product_image_container" >
        <div className="main_pic">
          <div
            style={{
              background: `url(${this.getImageURL(detail.images)}) no-repeat`
            }}
            onClick={() => this.lightboxHandler(0)}
          >

            </div>
          </div>
          <div className="main_thumbs">
            {this.showThumbs()}
          </div>
          {
            lightbox
            ? <LightBox 
              id={detail.id}
              images={lightboxImages}
              open={open}
              pos={imagePos}
              onClose={()=> this.lightboxClosingHandler()}
            />
            : null
          }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

GuitarImage.propTypes = {
  detail: PropTypes.object
}

export default connect(mapStateToProps)(GuitarImage)
