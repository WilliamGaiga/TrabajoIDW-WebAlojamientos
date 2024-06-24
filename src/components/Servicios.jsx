import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Servicios = () => {
  const [servicios, setServicios] = useState([]);
  const [nuevoServicio, setNuevoServicio] = useState({ Nombre: '' });
  const [editServicio, setEditServicio] = useState({ idServicio: '', Nombre: '' });
  const navigate = useNavigate();

  useEffect(() => {
    obtenerServicios();
  }, []);

  const obtenerServicios = async () => {
    try {
      const response = await axios.get('/servicio/getAllServicios');
      setServicios(response.data);
    } catch (error) {
      console.error('Error obteniendo servicios:', error);
    }
  };

  const crearServicio = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/servicio/createServicio', nuevoServicio);
      setServicios([...servicios, response.data]);
      setNuevoServicio({ Nombre: '' });
    } catch (error) {
      console.error('Error creando servicio:', error);
    }
  };

  const actualizarServicio = async (id) => {
    try {
      const response = await axios.put(`/servicio/updateServicio/${id}`, editServicio);
      setServicios(servicios.map(servicio => servicio.idServicio === id ? response.data : servicio));
      setEditServicio({ idServicio: '', Nombre: '' });
    } catch (error) {
      console.error('Error actualizando servicio:', error);
    }
  };

  const eliminarServicio = async (id) => {
    try {
      await axios.delete(`/servicio/deleteServicio/${id}`);
      setServicios(servicios.filter(servicio => servicio.idServicio !== id));
    } catch (error) {
      console.error('Error eliminando servicio:', error);
    }
  };

  const handleNuevoServicioChange = (e) => {
    const { name, value } = e.target;
    setNuevoServicio(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEditServicioChange = (e) => {
    const { name, value } = e.target;
    setEditServicio(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div>
      <h2>Administrar Servicios</h2>
      <form onSubmit={crearServicio}>
        <input 
          type="text" 
          name="Nombre" 
          value={nuevoServicio.Nombre} 
          onChange={handleNuevoServicioChange} 
          placeholder="Nombre del servicio" 
          required 
        />
        <button type="submit">Crear Servicio</button>
      </form>
      <h3>Lista de Servicios</h3>
      <ul>
        {servicios.map(servicio => (
          <li key={servicio.idServicio}>
            {servicio.Nombre}
            <button onClick={() => setEditServicio(servicio)}>Editar</button>
            <button onClick={() => eliminarServicio(servicio.idServicio)}>Eliminar</button>
          </li>
        ))}
      </ul>
      {editServicio.idServicio && (
        <form onSubmit={() => actualizarServicio(editServicio.idServicio)}>
          <input 
            type="text" 
            name="Nombre" 
            value={editServicio.Nombre} 
            onChange={handleEditServicioChange} 
            placeholder="Nombre del servicio" 
            required 
          />
          <button type="submit">Actualizar Servicio</button>
        </form>
      )}
    </div>
  );
};

export default Servicios;
