import styled from 'styled-components';

const Container = styled.main`
  max-width: 1260px;
  background-color: white;
  margin: 30px auto;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 1300px) {
    margin: 30px 20px;
  }
`;

export { Container };
