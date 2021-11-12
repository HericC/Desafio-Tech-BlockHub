import styled from 'styled-components';

const Container = styled.section`
  margin-bottom: 40px;

  :last-child {
    margin-bottom: 0;
  }

  div.graphic {
    display: flex;
    justify-content: space-around;
  }

  @media screen and (max-width: 1150px) {
    div.graphic {
      display: block;
    }
  }
`;

export { Container };
