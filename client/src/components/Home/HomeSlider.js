import React from 'react';
import Slider from 'react-slick';
import Button from '../UI/Button/Button';

const HomeSlider = (props) => {
  const slides = [
    {
      src: '/images/featured/featured_home.jpg',
      tilte: 'Fender',
      subtilte: 'Custom shop',
      linkTilte: 'Shop now',
      linkTo: '/shop',
    },
    {
      src: '/images/featured/featured_home_2.jpg',
      tilte: 'B-Stock',
      subtilte: 'Awsome discount',
      linkTilte: 'View offers',
      linkTo: '/shop',
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const generateSlides = () =>
    slides
      ? slides.map((slide, idx) => (
          <div key={idx}>
            <div
              className="featured_image"
              style={{
                background: `url(${slide.src})`,
                height: `${window.innerHeight}px`,
              }}
            >
              <div className="featured_action">
                <div className="tag title">{slide.tilte}</div>
                <div className="tag low_title">{slide.subtilte}</div>
                <div>
                  <Button
                    type="default"
                    title={slide.linkTilte}
                    linkTo={slide.linkTo}
                    addStyles={{ margin: '10px 0 0 0' }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))
      : null;

  return (
    <div className="featured_container">
      <Slider {...settings}>{generateSlides()}</Slider>
    </div>
  );
};

export default HomeSlider;
