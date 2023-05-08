const getRecipesInProgress = () => {
  const localRecipes = localStorage.getItem('inProgressRecipes');
  if (!localRecipes) return {};
  return JSON.parse(localRecipes);
};

const setRecipesInProgress = (recipeName, recipeStates) => {
  const localRecipes = getRecipesInProgress();
  const newRecipes = {
    ...localRecipes,
    [recipeName]: recipeStates,
  };
  localStorage.setItem('inProgressRecipes', JSON.stringify(newRecipes));
};

export default setRecipesInProgress;
