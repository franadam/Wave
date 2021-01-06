import React from 'react';
import PropTypes from 'prop-types';
import Button from '../UI/Button/Button';

const HomePromotion = (props) => {
  const promotion = {
    src: '/images/featured/featured_home_3.jpg',
    tilte: 'Up to 40% off',
    subtilte: 'In second hand guitars',
    linkTilte: 'Shop now',
    linkTo: '/shop',
  };

  const renderPromotion = () =>
    promotion ? (
      <div
        className="home_promotion_img"
        style={{ background: `url(${promotion.src})` }}
      >
        <div className="tag title">{promotion.tilte}</div>
        <div className="tag low_title">{promotion.subtilte}</div>
        <div>
          <Button
            type="default"
            title={promotion.linkTilte}
            linkTo={promotion.linkTo}
            addStyles={{ margin: '10px 0 0 0' }}
          />
        </div>
      </div>
    ) : null;

  return <div className="home_promotion">{renderPromotion()}</div>;
};

HomePromotion.propTypes = {};

export default HomePromotion;
