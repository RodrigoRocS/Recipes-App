export const getFavoriteRecipes = () => {
  const localFavoriteRecipes = localStorage.getItem('favoriteRecipes');
  if (!localFavoriteRecipes) return [];
  return JSON.parse(localFavoriteRecipes);
};

export const setFavoriteRecipes = (recipe) => {
  const localFavoriteRecipes = getFavoriteRecipes();
  const newFavoriteRecipes = [
    ...localFavoriteRecipes,
    recipe,
  ];
  localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
};

export const removeFavoriteRecipes = (id) => {
  const localRecipes = getFavoriteRecipes();
  const newRecipes = localRecipes.filter((recipe) => recipe.id !== id);
  const newFavoriteRecipes = [...newRecipes];
  localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
};
