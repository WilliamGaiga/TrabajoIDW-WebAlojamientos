import React, { useState } from 'react';
import api from './api';
import { useNavigate } from 'react-router-dom';


const CreateTipoAlojamiento = () => {
  const [descripcion, setDescripcion] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/tiposAlojamiento/createTipoAlojamiento', { Descripcion: descripcion })
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
      <h2>Crear Tipo de Alojamiento</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={descripcion} 
          onChange={(e) => setDescripcion(e.target.value)} 
          placeholder="Descripción" 
          required 
        />
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default CreateTipoAlojamiento;
