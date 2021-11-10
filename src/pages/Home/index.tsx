import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Container } from './styled';

function Home(): JSX.Element {
  const { handleLogout } = useContext(AuthContext);

  return (
    <Container>
      <h1>Ola mundo</h1>

      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </Container>
  );
}

export default Home;
