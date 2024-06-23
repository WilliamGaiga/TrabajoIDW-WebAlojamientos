import React, { useState, useEffect } from 'react';
import api from './api';

const ListAlojamientos = () => {
  const [alojamientos, setAlojamientos] = useState([]);

  useEffect(() => {
    api.get('/alojamiento/getAlojamientos')
      .then(response => {
        setAlojamientos(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h2>Listado de Alojamientos</h2>
      <ul>
        {alojamientos.map(alojamiento => (
          <li key={alojamiento.idAlojamiento}>
            {alojamiento.Titulo}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListAlojamientos;
