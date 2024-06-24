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
        <li><Link to="/Alojamiento/listAlojamiento">Mostrar alojamiento</Link></li>
        <li><Link to="/imagenes">Administrar Imágenes</Link></li>
        <li><Link to="/servicios">Administrar Servicios</Link></li>
      </ul>
    </div>
  );
};

export default AdminPage;
