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

      :last-child {
        display: none;
      }
    }

    a {
      padding: 0 10px;
      display: inline-flex;
      align-items: center;
      transition: all 300ms;
      border-radius: 1px;
      font-weight: bold;
      color: white;
      cursor: pointer;

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

  #logout,
  #mobile {
    margin-left: 100px;
    margin-right: 50px;

    a:hover {
      transform: scale(1.2);
    }
  }

  #mobile {
    display: none;
  }

  @media (max-width: 940px) {
    #logo {
      margin-left: 20px;
    }

    #logout {
      margin-left: 60px;
    }
  }

  @media (max-width: 860px) {
    #logout {
      display: none;
    }

    #mobile {
      display: flex;
      margin-left: 0;
      margin-right: 20px;
    }

    ul {
      width: 100%;
      position: absolute;
      top: 60px;
      left: -100%;
      opacity: 0;
      transition: all 500ms;
      flex-direction: column;
      background: ${({ theme }) => theme.colors.primaryLight};

      li {
        border-top: 1px solid ${({ theme }) => theme.colors.primary};

        :first-child {
          border-top: 0;
        }

        :last-child {
          display: flex;
          background-color: #c3073f;
        }

        a {
          justify-content: center;
          height: 10vw;
          width: 100%;
          padding: 30px 10px;
          border-radius: 0;
        }
      }
    }

    ul.active {
      left: 0;
      opacity: 1;
      z-index: 1;
    }
  }
`;

export { Nav };
