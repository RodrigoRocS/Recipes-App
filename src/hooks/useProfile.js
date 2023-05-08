import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function useProfile() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const localStorageValue = JSON.parse(localStorage.getItem('user')) ?? {};
    setEmail(localStorageValue.email);
  }, []);

  const history = useHistory();

  const handleButtons = (value) => {
    if (value === '/') {
      localStorage.clear();
      history.push(value);
    }
    history.push(value);
  };

  return {
    handleButtons,
    email,
  };
}

export default useProfile;
