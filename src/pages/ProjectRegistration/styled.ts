import styled from 'styled-components';

const Container = styled.main`
  max-width: 560px;
  background-color: white;
  margin: 50px auto;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  label {
    flex-direction: initial;

    span {
      margin-top: 7px;
    }

    input {
      width: 100%;
    }
  }

  @media screen and (max-width: 600px) {
    margin: 50px 20px;
  }
`;

export { Container };
