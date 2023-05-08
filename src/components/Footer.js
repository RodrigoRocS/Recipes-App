import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

function Footer() {
  const history = useHistory();

  const handleRedirects = (e, pathname) => {
    e.preventDefault();
    history.push(pathname);
  };

  return (
    <div data-testid="footer" className="footer-container">
      <a
        data-testid="drinks-bottom-btn"
        href="/drinks"
        src={ drinkIcon }
        onClick={ (e) => handleRedirects(e, '/drinks') }
      >
        <img src={ drinkIcon } alt="redirect to drinks page" />
      </a>

      <a
        data-testid="meals-bottom-btn"
        href="/meals"
        src={ mealIcon }
        onClick={ (e) => handleRedirects(e, '/meals') }
      >
        <img src={ mealIcon } alt="redirect to meals page" />
      </a>
    </div>
  );
}

export default Footer;
