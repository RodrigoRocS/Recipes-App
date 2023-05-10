import React from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

// const recipes = getRecipes();

export default function SearchDoneRecipes() {
  return (
    <div>
      {Array.isArray(recipes) && recipes
        .map((recipe, index) => (
          <div
            key={ recipe.id }
          >
            <Link
              to={ recipe.type === 'meals' ? `/meals/${recipe.id}`
                : `/drinks/${recipe.id}` }
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ recipe.image }
                alt={ recipe.name }
              />
              <p
                data-testid={ `${index}-card-name` }
              >
                { recipe.name }
              </p>
            </Link>

            <p>{recipe.doneDate}</p>
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {recipe.type === 'meals' ? `${recipe.nationality} - ${recipe.category}`
                : `${recipe.alcoholicOrNot} `}
            </p>
            <button>
              <img src={ shareIcon } alt="Share Icon" />
            </button>
          </div>
        ))}

    </div>
  );
}
