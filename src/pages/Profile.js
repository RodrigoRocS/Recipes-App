import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import useProfile from '../hooks/useProfile';

function Profile() {
  const { email, handleButtons } = useProfile();
  return (
    <div>
      <Header title="Profile" search="false" />
      <h3 data-testid="profile-email">{email}</h3>
      <button
        data-testid="profile-done-btn"
        value="/done-recipes"
        onClick={ ({ target: { value } }) => handleButtons(value) }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        value="/favorite-recipes"
        onClick={ ({ target: { value } }) => handleButtons(value) }
      >
        Favorites Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        value="/"
        onClick={ ({ target: { value } }) => handleButtons(value) }
      >
        Logout
      </button>
      <Footer />
    </div>

  );
}

export default Profile;
