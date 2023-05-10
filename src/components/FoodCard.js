import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function FoodCard(props) {
  const history = useHistory();
  const location = history.location.pathname;
  console.log(props);
  const { data, id } = props;
  return (
    <div>
      {
        location === '/meals' ? (
          <div>
            <img
              id={ id }
              src={ data.strMealThumb }
              alt="strMealThumb"
              data-testid={ `${id}-meal-card-img` }
            />
            <div data-testid={ `${id}-meal-card-name` }>{data.strMeal}</div>
          </div>
        ) : (
          <div>
            <img
              id={ id }
              src={ data.strDrinkThumb }
              alt="strDrinkThumb"
              data-testid={ `${id}-drink-card-img` }
            />
            <div data-testid={ `${id}-drink-card-name` }>{data.strDrink}</div>
          </div>
        )
      }
    </div>
  );
}

FoodCard.propTypes = {
  data: PropTypes.objectOf(PropTypes.shape({
    strMealThumb: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
  })).isRequired,
  id: PropTypes.number.isRequired,
};

export default FoodCard;
