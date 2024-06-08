import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from './api';
const EditTipoAlojamiento = () => {
  const { id } = useParams();
  const [descripcion, setDescripcion] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/tiposAlojamiento/getTipoAlojamiento/${id}`)
      .then(response => {
        setDescripcion(response.data.Descripcion || '');
      })
      .catch(error => console.error(error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    api.put(`/tiposAlojamiento/putTipoAlojamiento/${id}`, { Descripcion: descripcion })
    .then(response => {
      console.log(response);
      navigate('/tiposAlojamiento/ListTiposAlojamiento');
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <div>
      <h2>Editar Tipo de Alojamiento</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={descripcion} 
          onChange={(e) => setDescripcion(e.target.value)} 
          placeholder="Descripción" 
          required 
        />
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
};

export default EditTipoAlojamiento;