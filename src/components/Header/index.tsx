import React, { useContext, useEffect, useState } from 'react';
import { FaSignOutAlt, FaBars, FaWindowClose } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Nav } from './styled';
import Logo from '../../images/BlockHubLogo.png';
import { AuthContext } from '../../contexts/AuthContext';

function Header(): JSX.Element {
  const [mobile, setMobile] = useState(false);
  const { handleLogout } = useContext(AuthContext);

  useEffect(() => {
    const arrUrl = document.URL.split('/');

    let url = '';
    for (let i = 3; i < arrUrl.length; i++) {
      url += `/${arrUrl[i]}`;
    }

    let child = -1;
    switch (url) {
      case '/registration/user':
        child = 1;
        break;
      case '/registration/project':
        child = 2;
        break;
      case '/registration/hours':
        child = 3;
        break;
      case '/launch':
        child = 4;
        break;
      default:
        break;
    }

    document
      .querySelector(`#navbar li:nth-child(${child}) a`)
      ?.classList.add('active');
  }, []);

  function handleMobile() {
    setMobile(!mobile);
  }

  function closeMobile() {
    setMobile(false);
  }

  return (
    <Nav>
      <div id="logo">
        <Link to="/dashboard">
          <img src={Logo} height="30px" />
        </Link>
      </div>

      <ul className={mobile ? 'active' : ''} id="navbar">
        <li>
          <Link to="/registration/user" onClick={closeMobile}>
            Cadastrar Usuário
          </Link>
        </li>
        <li>
          <Link to="/registration/project" onClick={closeMobile}>
            Cadastrar Projeto
          </Link>
        </li>
        <li>
          <Link to="/registration/hours" onClick={closeMobile}>
            Lançar Horas
          </Link>
        </li>
        <li>
          <Link to="/launch" onClick={closeMobile}>
            Lançamentos
          </Link>
        </li>
        <li>
          <Link to="/#" onClick={closeMobile}>
            Relatório
          </Link>
        </li>
        <li>
          <Link to="/logout" onClick={handleLogout}>
            Sair
          </Link>
        </li>
      </ul>

      <div id="logout">
        <Link to="/logout" onClick={handleLogout}>
          <FaSignOutAlt size={26} />
        </Link>
      </div>

      <div id="mobile" onClick={handleMobile}>
        <a>{mobile ? <FaWindowClose size={26} /> : <FaBars size={26} />}</a>
      </div>
    </Nav>
  );
}

export default Header;
