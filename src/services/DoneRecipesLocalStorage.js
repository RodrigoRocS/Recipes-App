export const getDoneRecipes = () => {
  const localDoneRecipes = localStorage.getItem('doneRecipes');
  if (!localDoneRecipes) return [];
  return JSON.parse(localDoneRecipes);
};

export const setDoneRecipes = (recipe) => {
  const localDoneRecipes = getDoneRecipes();
  const newDoneRecipes = [
    ...localDoneRecipes,
    recipe,
  ];
  localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
};

export const removeDoneRecipes = (id) => {
  const localDoneRecipes = getDoneRecipes();
  const newRecipes = localDoneRecipes.filter((recipe) => recipe.id !== id);
  const newDoneRecipes = [...newRecipes];
  localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
};
