import styled from 'styled-components';

const Container = styled.main`
  max-width: 460px;
  background-color: white;
  margin: 150px auto;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 500px) {
    margin: 150px 20px;
  }
`;

export { Container };
