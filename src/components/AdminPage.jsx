
import React from 'react';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  return (
    <div>
      <h1>Administración</h1>
      <ul>
        <li><Link to="/tiposAlojamiento/CreateTipoAlojamiento">Crear tipo de alojamiento</Link></li>
        <li><Link to="/tiposAlojamiento/ListTiposAlojamiento">Mostrar tipos de alojamiento</Link></li>
        <li><Link to="/Alojamiento/createAlojamiento">Agregar alojamiento</Link></li>
        <li><Link to="/Alojamiento/editAlojamiento">Editar alojamiento</Link></li>
        <li><Link to="/Alojamiento/listAlojamiento">Mostrar alojamiento</Link></li>
        </ul>
    </div>
  );
};

export default AdminPage;
