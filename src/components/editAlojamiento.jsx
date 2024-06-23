import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from './api';

const EditAlojamiento = () => {
  const { id } = useParams();
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
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/alojamiento/getAlojamiento/${id}`)
      .then(response => {
        setAlojamiento(response.data || {});
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
        navigate('/alojamiento/listAlojamiento');
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
        <textarea 
          name="Descripcion"
          value={alojamiento.Descripcion} 
          onChange={handleChange} 
          placeholder="Descripción" 
          required 
        />
        <input 
          type="text" 
          name="TipoAlojamiento"
          value={alojamiento.TipoAlojamiento} 
          onChange={handleChange} 
          placeholder="Tipo de Alojamiento" 
          required 
        />
        <input 
          type="text" 
          name="Latitud"
          value={alojamiento.Latitud} 
          onChange={handleChange} 
          placeholder="Latitud" 
          required 
        />
        <input 
          type="text" 
          name="Longitud"
          value={alojamiento.Longitud} 
          onChange={handleChange} 
          placeholder="Longitud" 
          required 
        />
        <input 
          type="text" 
          name="PrecioPorDia"
          value={alojamiento.PrecioPorDia} 
          onChange={handleChange} 
          placeholder="Precio por Día" 
          required 
        />
        <input 
          type="number" 
          name="CantidadDormitorios"
          value={alojamiento.CantidadDormitorios} 
          onChange={handleChange} 
          placeholder="Cantidad de Dormitorios" 
          required 
        />
        <input 
          type="number" 
          name="CantidadBanios"
          value={alojamiento.CantidadBanios} 
          onChange={handleChange} 
          placeholder="Cantidad de Baños" 
          required 
        />
        <select 
          name="Estado"
          value={alojamiento.Estado} 
          onChange={handleChange} 
          required
        >
          <option value="Disponible">Disponible</option>
          <option value="Reservado">Reservado</option>
        </select>
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
};

export default EditAlojamiento;
