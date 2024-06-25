import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '/img/Logo.png'; // Usa la ruta pública
import '../assets/header.css'; // Importa el archivo CSS
import "../assets/clave.css";


const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');

  const handleAdminClick = () => {
    setShowModal(true);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (password === '1996') {
      // Redirige a la página de administración si la contraseña es correcta
      window.location.href = '/AdminPage';
    } else {
      alert('Clave incorrecta. Intente nuevamente.');
    }
  };

  return (
    <header>
      <h1 className="header-title">HotelesWeb</h1>
      <div className="header-content">
        <img src={logo} alt="HotelesWeb Logo" />
        <nav>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/contactanos">Contáctanos</Link></li>
            <li><Link to="/nosotros">Sobre nosotros</Link></li>
            <li><button onClick={handleAdminClick}>Admin</button></li>
          </ul>
        </nav>
      </div>
      {showModal && (
        <div className="modal">
          <form onSubmit={handleModalSubmit}>
            <label>
              Clave de acceso:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button type="submit">Ingresar</button>
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;
