import React, { useRef } from 'react';
import PropTypes from 'prop-types';

function Navigation({ handleTabClick }) {
  const boxRef = useRef(null);

  const scrollToCategory = (category) => {
    handleTabClick(category);

    if (boxRef.current) {
      boxRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <button onClick={() => scrollToCategory('buns')}>Булки</button>
      <button onClick={() => scrollToCategory('sauces')}>Соусы</button>
      <button onClick={() => scrollToCategory('fillings')}>Начинки</button>
      <div ref={boxRef}>
      </div>
    </div>
  );
}

Navigation.propTypes = {
  handleTabClick: PropTypes.func.isRequired,
};

export default Navigation;