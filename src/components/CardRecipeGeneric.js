import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/CardRecipeGeneric.css';

function CardRecipeGeneric({ item, index, type }) {
  const { idMeal, idDrink, strMeal, strDrink, strMealThumb, strDrinkThumb } = item;

  return (
    <div className="card-generic-container">
      <Link
        to={ `/${type}/${idMeal || idDrink}` }
        data-testid={ `${index}-recipe-card` }
        className="link-card"
      >
        <img
          className="img"
          id={ index }
          src={ strMealThumb || strDrinkThumb }
          alt={ `str${type}Thumb` }
          data-testid={ `${index}-card-img` }
        />
        <p data-testid={ `${index}-card-name` }>{strMeal || strDrink}</p>
      </Link>
    </div>
  );
}

CardRecipeGeneric.propTypes = {
  item: PropTypes.shape({
    idMeal: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    idDrink: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default CardRecipeGeneric;
