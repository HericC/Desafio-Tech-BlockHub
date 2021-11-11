import { useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import axios from '../services/axios';
import { LoadingContext } from '../contexts/LoadingContext';
import { payloadTypes } from '../pages/Login/dto';

type propTypes = {
  authLoading: boolean;
  authenticated: boolean;
  handleLogin: (payload: payloadTypes) => Promise<void>;
  handleLogout: () => Promise<void>;
};

function UseAuth(): propTypes {
  const [authLoading, setAuthLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const { handleLoading } = useContext(LoadingContext);

  useEffect(() => {
    const { token } = cookies;

    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setAuthenticated(true);
    }
    setAuthLoading(true);
  }, []);

  async function handleLogin(payload: payloadTypes) {
    try {
      handleLoading(true);
      const { data } = await axios.post('/login', payload);
      const token = JSON.stringify(data.access_token);

      setCookie('token', token, {
        secure: true,
        maxAge: 3600,
      });
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setAuthenticated(true);
      location.reload();
      handleLoading(false);
    } catch (err) {
      toast.error('Credenciais inválidas!');
      handleLoading(false);
    }
  }

  async function handleLogout() {
    removeCookie('token');
    axios.defaults.headers.common['Authorization'] = '';
    location.reload();
    setAuthenticated(false);
  }

  return { authenticated, handleLogin, handleLogout, authLoading };
}

export default UseAuth;
