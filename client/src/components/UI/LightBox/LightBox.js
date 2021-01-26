import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LightBox from 'react-images'

export class ImageLightBox extends Component {
  state = {
    lightboxIsOpen: true,
    currentImage:this.props.pos,
    images: []
  }

  static getDerivedStateFromProps(props, state) {
    if (props.images) {
      const images = props.images.map(img => ({src: `${img}`}))
      return state = {images}
    }
    return false;
  }

  goToPrevious = () => {
    this.setState(prevState => ({
      currentImage: prevState.currentImage - 1 
    }))
  }

  goToNext = () => {
    this.setState(prevState => ({
      currentImage: prevState.currentImage + 1
    }))}

  render() {
    const {lightboxIsOpen, currentImage, images} = this.state
    return (
      <LightBox 
        currentImage={currentImage}
        images={images}
        isOpen={lightboxIsOpen}
        onClickPrev={() => this.goToPrevious()}
        onClickNext={() => this.goToNext()}
        onClose={() => this.props.onClose()}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

ImageLightBox.propTypes = {
  id: PropTypes.string,
  images: PropTypes.array,
  open: PropTypes.bool,
  pos: PropTypes.number,
  onClose: PropTypes.func
}

export default connect(mapStateToProps)(ImageLightBox)
