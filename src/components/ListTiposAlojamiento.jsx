import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import api from './api';


const ListTiposAlojamiento = () => {
  const [tiposAlojamiento, setTiposAlojamiento] = useState([]);
  const navigate = useNavigate();  

  useEffect(() => {
    api.get("/tiposAlojamiento/getTiposAlojamiento")
      .then(response => setTiposAlojamiento(response.data))
      .catch(error => console.error(error));
    console.log(tiposAlojamiento)
  }, []);

  const handleEdit = (id) => {
    console.log(id)
    navigate(`/tiposAlojamiento/EditTipoAlojamiento/${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Eliminar tipo de alojamiento con ID: ${id}`);
    api.delete(`/tiposAlojamiento/deleteTipoAlojamiento/${id}`)
    .then(response => {
      console.log(response);
      setTiposAlojamiento(tiposAlojamiento.filter(tipo => tipo.id !== id));
      navigate('/AdminPage');
    })
    .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Tipos de Alojamiento</h2>
      <ul>
        {tiposAlojamiento.map(tipo => (
          <li key={tipo.idTipoAlojamiento}>
            {tipo.Descripcion}
            <button onClick={() => handleEdit(tipo.idTipoAlojamiento)}>Editar</button>
            <button onClick={() => handleDelete(tipo.idTipoAlojamiento)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListTiposAlojamiento;
