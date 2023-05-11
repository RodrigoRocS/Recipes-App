import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import DoneRecipesContext from '../contexts/useDoneRecipesContext';
import '../styles/CardDoneRecipes.css';

export default function CardDoneRecipes() {
  const {
    updatedList,
    isSpanw,
    handleShare,
  } = useContext(DoneRecipesContext);

  return (
    <div>
      {Array.isArray(updatedList) && updatedList
        .map((recipe, index) => (
          <div
            key={ recipe.id }
          >
            { isSpanw ? <span>Link copied!</span> : <p />}
            <Link
              to={ `/${recipe.type}s/${recipe.id}` }
            >
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
              />
              <h4
                data-testid={ `${index}-horizontal-name` }
              >
                { recipe.name }
              </h4>
            </Link>
            <h4
              data-testid={ `${index}-horizontal-done-date` }
            >
              {recipe.doneDate}

            </h4>

            <h4
              data-testid={ `${index}-horizontal-top-text` }
            >
              {recipe.type === 'meal' ? `${recipe.nationality} - ${recipe.category}`
                : `${recipe.alcoholicOrNot} `}
            </h4>
            {recipe.tags.map((tag) => (
              <h4
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </h4>
            ))}
            <button
              onClick={ () => handleShare(recipe.id, recipe.type) }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="Share Icon"
              />
              Compartilhar
            </button>
          </div>
        ))}

    </div>
  );
}
