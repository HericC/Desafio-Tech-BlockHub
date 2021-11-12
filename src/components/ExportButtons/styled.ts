import styled from 'styled-components';

const Container = styled.div`
  button {
    cursor: pointer;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    font-size: 14px;
    background-color: ${({ theme }) => theme.colors.primary};
    transition: background-color 300ms ease-in-out;

    :hover {
      background-color: ${({ theme }) => theme.colors.primaryDark};
    }

    :last-child {
      margin-left: 10px;
    }
  }
`;

export { Container };
