import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.background};
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  form {
    display: flex;
    flex-direction: column;

    h2 {
      font-size: 26px;
      margin-bottom: 20px;
    }

    label {
      display: flex;
      flex-direction: column;
      font-weight: bold;

      input {
        margin-left: 15px;
      }
    }

    input {
      margin-bottom: 20px;
      height: 40px;
      padding: 0 10px;
      border: 1px solid ${({ theme }) => theme.colors.background};
      border-radius: 4px;

      :focus {
        border-color: ${({ theme }) => theme.colors.primaryLight};
      }
    }

    input.errors {
      border: 1px solid red;
    }

    button {
      cursor: pointer;
      color: white;
      padding: 15px 20px;
      border: none;
      border-radius: 4px;
      font-weight: bold;
      font-size: 16px;
      background-color: ${({ theme }) => theme.colors.primary};
      transition: background-color 300ms ease-in-out;

      :hover {
        background-color: ${({ theme }) => theme.colors.primaryDark};
      }
    }
  }
`;
