import React from 'react';

import { Container } from './styled';

function Home(): JSX.Element {
  return (
    <Container>
      <h1>Ola mundo</h1>
      <p>{process.env.PUBLIC_URL} asd</p>
    </Container>
  );
}

export default Home;
