import React, { useContext } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import SearchContext from '../contexts/SearchContext';

export default function SearchCard() {
  const {
    recipes,
    fetchRequest,
  } = useContext(SearchContext) || {};

  const { path } = fetchRequest;

  const pathName = path === '/meals' ? 'meals' : 'drinks';
  const maxRecipes = 12;

  return (
    <div>
      {Array.isArray(recipes[pathName]) && recipes[pathName]
        .slice(0, maxRecipes)
        .map((recipe, index) => (
          <div
            key={ pathName === 'meals' ? recipe.idMeal : recipe.idDrink }
            data-testid={ `${index}-recipe-card` }
          >
            <Link
              to={ pathName === 'meals' ? `/meals/${recipe.idMeal}`
                : `/drinks/${recipe.idDrink}` }
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ pathName === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb }
                alt={ pathName === 'meals' ? `Imagem do prato ${recipe.strMeal}`
                  : `Imagem da bebida ${recipe.strDrink}` }
              />
              <h5
                data-testid={ `${index}-card-name` }
              >
                { pathName === 'meals' ? recipe.strMeal : recipe.strDrink }
              </h5>
            </Link>
          </div>
        ))}

    </div>
  );
}
