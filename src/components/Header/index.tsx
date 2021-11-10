import React, { useContext } from 'react';
import { FaSignOutAlt, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Nav } from './styled';
import Logo from '../../images/BlockHubLogo.png';
import { AuthContext } from '../../contexts/AuthContext';

function Header() {
  const { handleLogout } = useContext(AuthContext);

  return (
    <Nav>
      <div id="logo">
        <Link to="/dashboard">
          <img src={Logo} height="30px" />
        </Link>
      </div>

      <ul>
        <li>
          <Link to="/#">Cadastrar Usuário</Link>
        </li>
        <li>
          <Link to="/#">Cadastrar Projeto</Link>
        </li>
        <li>
          <Link to="/#">Cadastrar Horas</Link>
        </li>
        <li>
          <Link to="/#">Relatório</Link>
        </li>
      </ul>

      <div id="logout">
        <Link to="/logout" onClick={handleLogout}>
          <FaSignOutAlt size={26} />
        </Link>
      </div>
    </Nav>
  );
}

export default Header;
