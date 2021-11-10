import React from 'react';
import { Container } from './styled';
import Header from '../../components/Header';

function Home(): JSX.Element {
  return (
    <>
      <Header />
      <Container>
        <h1>Ola mundo</h1>
      </Container>
    </>
  );
}

export default Home;
