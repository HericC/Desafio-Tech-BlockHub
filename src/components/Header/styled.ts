import styled from 'styled-components';

const Nav = styled.nav`
  height: 60px;
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.primary};

  div,
  ul {
    display: flex;

    li {
      display: flex;
    }

    a {
      padding: 0 10px;
      display: inline-flex;
      align-items: center;
      transition: all 300ms;
      border-radius: 1px;
      font-weight: bold;
      color: white;

      :hover {
        transform: scale(1.1);
      }
    }
  }

  #logo {
    margin-left: 60px;
  }

  ul {
    a:hover {
      background-color: ${({ theme }) => theme.colors.primaryLight};
    }
  }

  #logout {
    margin-left: 120px;
    margin-right: 30px;

    a:hover {
      transform: scale(1.2);
    }
  }
`;

export { Nav };
