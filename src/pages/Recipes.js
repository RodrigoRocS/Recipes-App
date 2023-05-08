import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Recipes() {
  const location = useLocation();
  const path = location.pathname;
  const rightPath = path.charAt(1).toUpperCase() + path.substring(2, path.length);
  return (
    <div>
      <Header title={ rightPath } search />
      <Footer />
    </div>
  );
}

export default Recipes;
