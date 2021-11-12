import styled from 'styled-components';

const Container = styled.main`
  max-width: 560px;
  background-color: white;
  margin: 150px auto;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  a {
    display: flex;
    margin-bottom: 20px;
    width: max-content;

    :hover {
      color: ${({ theme }) => theme.colors.alert};
    }
  }

  @media screen and (max-width: 600px) {
    margin: 150px 20px;
  }
`;

export { Container };
