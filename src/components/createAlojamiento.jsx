import React, { useState } from 'react';
import api from './api';
import { useNavigate } from 'react-router-dom';

const CreateAlojamiento = () => {
  const [alojamiento, setAlojamiento] = useState({
    idAlojamiento: '',
    Titulo: '',
    Descripcion: '',
    TipoAlojamiento: 1,
    Latitud: '',
    Longitud: '',
    PrecioPorDia: '',
    CantidadDormitorios: '',
    CantidadBanios: '',
    Estado: 'Disponible'
  });
  const [notification, setNotification] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/alojamiento/createAlojamiento', alojamiento)
      .then(response => {
        console.log(response);
        setNotification('Alojamiento registrado correctamente');
        setTimeout(() => {
          setNotification('');
          navigate('/Alojamiento/ListAlojamiento');
        }, 2000); // Ajustar el retraso según sea necesario
      })
      .catch(error => {
        console.error('Error creando alojamiento:', error);
        setNotification('Error al crear nuevo alojamiento');
        setTimeout(() => {
          setNotification('');
        }, 2000); // Ajustar el retraso según sea necesario
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
      <h2>Crear Alojamiento</h2>
      {notification && <p>{notification}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="idAlojamiento"
          value={alojamiento.idAlojamiento} 
          onChange={handleChange} 
          placeholder="ID de Alojamiento" 
          required 
        />
        <input 
          type="text" 
          name="Titulo"
          value={alojamiento.Titulo} 
          onChange={handleChange} 
          placeholder="Título" 
          required 
        />
        <input 
          type="text" 
          name="Descripcion"
          value={alojamiento.Descripcion} 
          onChange={handleChange} 
          placeholder="Descripción" 
          required 
        />
        <select 
          name="TipoAlojamiento" 
          value={alojamiento.TipoAlojamiento} 
          onChange={handleChange}
        >
          <option value={1}>Casa</option>
          <option value={2}>Departamento</option>
          <option value={3}>Cabaña</option>
          <option value={4}>Hostel</option>
        </select>
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
          type="number" 
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
        >
          <option value="Disponible">Disponible</option>
          <option value="Reservado">Reservado</option>
        </select>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default CreateAlojamiento;



