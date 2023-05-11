import { useEffect, useState } from 'react';
import { getDoneRecipes } from '../services/DoneRecipesLocalStorage';

export default function useDoneRecipes() {
  const [updatedList, setupdatedList] = useState([]);
  const [listAll, setListAll] = useState([]);
  const [isSpanw, setisSpanw] = useState(false);

  useEffect(() => {
    const recipes = getDoneRecipes();
    setupdatedList(recipes);
    setListAll(recipes);
  }, []);

  const handleShare = (id, type) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
      setisSpanw(!isSpanw);
    } else {
      console.log('Clipboard não suportado');
    }
  };

  const handleButton = (type) => {
    console.log('chamou');
    if (type === 'all') {
      return setupdatedList(listAll);
    }
    setupdatedList(listAll.filter((item) => item.type === type));
  };
  return {
    handleShare,
    handleButton,
    updatedList,
    isSpanw,
  };
}
