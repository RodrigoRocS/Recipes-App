import React from 'react';

export default function MealsCard() {
  return (
    <div>
      <img
        data-testid={ `${index}-horizontal-image` }
        alt="imagem da comida "
      />
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        categoria
      </p>
      <p
        data-testid={ `${index}-horizontal-name` }
      >
        nome da receita
      </p>
      <p
        data-testid={ `${index}-horizontal-done-date` }
      >
        data da receita
      </p>

      <button
        data-testid={ `${index}-horizontal-share-btn` }
      >
        compartilha`
      </button>

    </div>
  );
}
