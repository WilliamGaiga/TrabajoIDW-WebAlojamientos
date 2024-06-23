// src/components/ListAlojamientos.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from './api'

const ListAlojamientos = () => {
  const [alojamientos, setAlojamientos] = useState([]);

  useEffect(() => {
    const fetchAlojamientos = async () => {
      try {
        const response = await api.get('/alojamiento/getAlojamientos');
        setAlojamientos(response.data);
      } catch (error) {
        console.error('Error obteniendo alojamientos:', error);
      }
    };
    fetchAlojamientos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/alojamiento/deleteAlojamiento/${id}`);
      setAlojamientos(alojamientos.filter((alojamiento) => alojamiento.idAlojamiento !== id));
    } catch (error) {
      console.error('Error eliminando alojamiento:', error);
    }
  };

  return (
    <div>
      <h1>Lista de Alojamientos</h1>
      <ul>
        {alojamientos.map((alojamiento) => (
          <li key={alojamiento.idAlojamiento}>
            {alojamiento.Titulo} - {alojamiento.Estado}
            <Link to={`/Alojamiento/EditAlojamiento/${alojamiento.idAlojamiento}`}>Editar</Link>
            <button onClick={() => handleDelete(alojamiento.idAlojamiento)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListAlojamientos;
