

//NO ANDA (no se muestra el contenido en la pagina, solo sale el header y el footer )

import React from 'react';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  return (
    <div>
      <h1>Administración</h1>
      <ul>
        <li><Link to="/tiposAlojamiento/CreateTipoAlojamiento">Crear Tipo de Alojamiento</Link></li>
        <li><Link to="/tiposAlojamiento/ListTiposAlojamiento">Mostrar Tipos de Alojamiento</Link></li>
      </ul>
    </div>
  );
};

export default AdminPage;
