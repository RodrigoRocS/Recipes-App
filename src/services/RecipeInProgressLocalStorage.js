export const getRecipesInProgress = () => {
  const localRecipes = localStorage.getItem('inProgressRecipes');
  if (!localRecipes) return {};
  return JSON.parse(localRecipes);
};

export const setRecipesInProgress = (recipeId, recipeStates) => {
  const localRecipes = getRecipesInProgress();
  const newRecipes = {
    ...localRecipes,
    [recipeId]: recipeStates,
  };
  localStorage.setItem('inProgressRecipes', JSON.stringify(newRecipes));
};

export const removeRecipesInProgress = (id) => {
  const localRecipesInProgress = getRecipesInProgress();

  delete localRecipesInProgress[id];

  localStorage.setItem('inProgressRecipes', JSON.stringify(localRecipesInProgress));
};
