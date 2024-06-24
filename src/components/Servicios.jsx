import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Servicios = () => {
  const [servicios, setServicios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [idServicio, setIdServicio] = useState('');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/servicio/getAllServicios')
      .then(response => {
        if (Array.isArray(response.data)) {
          setServicios(response.data);
        } else {
          console.error('La respuesta de la API no es un array:', response.data);
        }
      })
      .catch(error => {
        console.error('Error obteniendo servicios:', error);
      });
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/servicio/createServicio', { Nombre: nombre })
      .then(response => {
        console.log('Servicio creado:', response.data);
        setServicios([...servicios, response.data]);
        setNombre('');
      })
      .catch(error => {
        console.error('Error creando servicio:', error);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/servicio/updateServicio/${idServicio}`, { Nombre: nombre })
      .then(response => {
        console.log('Servicio actualizado:', response.data);
        setServicios(servicios.map(servicio => servicio.idServicio === idServicio ? response.data : servicio));
        setNombre('');
        setIdServicio('');
        setEditMode(false);
      })
      .catch(error => {
        console.error('Error actualizando servicio:', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/servicio/deleteServicio/${id}`)
      .then(() => {
        console.log('Servicio eliminado');
        setServicios(servicios.filter(servicio => servicio.idServicio !== id));
      })
      .catch(error => {
        console.error('Error eliminando servicio:', error);
      });
  };

  const handleEditClick = (servicio) => {
    setIdServicio(servicio.idServicio);
    setNombre(servicio.Nombre);
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setNombre('');
    setIdServicio('');
    setEditMode(false);
  };

  return (
    <div>
      <h2>Administrar Servicios</h2>

      {!editMode && (
        <form onSubmit={handleCreate} style={{ marginBottom: '20px' }}>
          <h3>Crear Servicio</h3>
          <input 
            type="text" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            placeholder="Nombre del servicio" 
            required 
          />
          <button type="submit">Crear</button>
        </form>
      )}

      {editMode && (
        <form onSubmit={handleUpdate} style={{ marginBottom: '20px' }}>
          <h3>Actualizar Servicio</h3>
          <input 
            type="text" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            placeholder="Nuevo nombre del servicio" 
            required 
          />
          <button type="submit">Actualizar</button>
          <button type="button" onClick={handleCancelEdit}>Cancelar</button>
        </form>
      )}

      <ul>
        {Array.isArray(servicios) && servicios.length > 0 ? (
         servicios.map((servicio) => (
            <li key={servicio.idServicio}>
              {servicio.idServicio} - {servicio.Nombre}
              <button onClick={() => handleDelete(servicio.idServicio)}>Eliminar</button>
              <button onClick={() => handleEditClick(servicio)}>Editar</button>
            </li>
          ))
        ) : (
          <li>No hay servicios disponibles</li>
        )}
      </ul>
    </div>
  );
};

export default Servicios;


  
