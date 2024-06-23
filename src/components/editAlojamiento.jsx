import React, { useState, useEffect } from 'react';
import api from './api';
import { useParams, useNavigate } from 'react-router-dom';

const EditAlojamiento = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [alojamiento, setAlojamiento] = useState({
    Titulo: '',
    Descripcion: '',
    TipoAlojamiento: '',
    Latitud: '',
    Longitud: '',
    PrecioPorDia: '',
    CantidadDormitorios: '',
    CantidadBanios: '',
    Estado: ''
  });

  useEffect(() => {
    api.get(`/alojamiento/getAlojamiento/${id}`)
      .then(response => {
        setAlojamiento(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    api.put(`/alojamiento/putAlojamiento/${id}`, alojamiento)
      .then(response => {
        console.log(response);
        navigate('/Alojamiento/listAlojamiento');
      })
      .catch(error => {
        console.error('Error actualizando alojamiento:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlojamiento(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div>
      <h2>Editar Alojamiento</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="Titulo"
          value={alojamiento.Titulo} 
          onChange={handleChange} 
          placeholder="Título" 
          required 
        />
        {/* Resto de los campos */}
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
};

export default EditAlojamiento;
