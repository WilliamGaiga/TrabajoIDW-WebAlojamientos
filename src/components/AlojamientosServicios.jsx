import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AlojamientosServicios = () => {
  const [alojamientosServicios, setAlojamientosServicios] = useState([]);
  const [idAlojamiento, setIdAlojamiento] = useState('');
  const [idServicio, setIdServicio] = useState('');
  const [idAlojamientoServicio, setIdAlojamientoServicio] = useState('');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/alojamientosServicios/getAllAlojamientoServicios')
      .then(response => {
        if (Array.isArray(response.data)) {
          setAlojamientosServicios(response.data);
        } else {
          console.error('La respuesta de la API no es un array:', response.data);
        }
      })
      .catch(error => {
        console.error('Error obteniendo alojamientos y servicios:', error);
      });
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/alojamientosServicios/createAlojamientoServicio', {
      idAlojamiento,
      idServicio
    })
      .then(response => {
        console.log('AlojamientoServicio creado:', response.data);
        setAlojamientosServicios([...alojamientosServicios, response.data]);
        setIdAlojamiento('');
        setIdServicio('');
      })
      .catch(error => {
        console.error('Error creando alojamiento servicio:', error);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/alojamientosServicios/updateAlojamientoServicio/${idAlojamientoServicio}`, {
      idAlojamiento,
      idServicio
    })
      .then(response => {
        console.log('AlojamientoServicio actualizado:', response.data);
        setAlojamientosServicios(alojamientosServicios.map(item => item.idAlojamientoServicio === idAlojamientoServicio ? response.data : item));
        setIdAlojamiento('');
        setIdServicio('');
        setIdAlojamientoServicio('');
        setEditMode(false);
      })
      .catch(error => {
        console.error('Error actualizando alojamiento servicio:', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/alojamientosServicios/deleteAlojamientoServicio/${id}`)
      .then(() => {
        console.log('AlojamientoServicio eliminado');
        setAlojamientosServicios(alojamientosServicios.filter(item => item.idAlojamientoServicio !== id));
      })
      .catch(error => {
        console.error('Error eliminando alojamiento servicio:', error);
      });
  };

  const handleEditClick = (item) => {
    setIdAlojamientoServicio(item.idAlojamientoServicio);
    setIdAlojamiento(item.idAlojamiento);
    setIdServicio(item.idServicio);
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setIdAlojamiento('');
    setIdServicio('');
    setIdAlojamientoServicio('');
    setEditMode(false);
  };

  return (
    <div>
      <h2>Administrar Alojamientos y Servicios</h2>

      {!editMode && (
        <form onSubmit={handleCreate} style={{ marginBottom: '20px' }}>
          <h3>Crear Relación Alojamiento-Servicio</h3>
          <input 
            type="text" 
            value={idAlojamiento} 
            onChange={(e) => setIdAlojamiento(e.target.value)} 
            placeholder="ID del Alojamiento" 
            required 
          />
          <input 
            type="text" 
            value={idServicio} 
            onChange={(e) => setIdServicio(e.target.value)} 
            placeholder="ID del Servicio" 
            required 
          />
          <button type="submit">Crear</button>
        </form>
      )}

      {editMode && (
        <form onSubmit={handleUpdate} style={{ marginBottom: '20px' }}>
          <h3>Actualizar Relación Alojamiento-Servicio</h3>
          <input 
            type="text" 
            value={idAlojamiento} 
            onChange={(e) => setIdAlojamiento(e.target.value)} 
            placeholder="Nuevo ID del Alojamiento" 
            required 
          />
          <input 
            type="text" 
            value={idServicio} 
            onChange={(e) => setIdServicio(e.target.value)} 
            placeholder="Nuevo ID del Servicio" 
            required 
          />
          <button type="submit">Actualizar</button>
          <button type="button" onClick={handleCancelEdit}>Cancelar</button>
        </form>
      )}

      <ul>
        {Array.isArray(alojamientosServicios) && alojamientosServicios.length > 0 ? (
          alojamientosServicios.map((item) => (
            <li key={item.idAlojamientoServicio}>
              {`ID Alojamiento: ${item.idAlojamiento}, ID Servicio: ${item.idServicio}`}
              <button onClick={() => handleDelete(item.idAlojamientoServicio)}>Eliminar</button>
              <button onClick={() => handleEditClick(item)}>Editar</button>
            </li>
          ))
        ) : (
          <li>No hay relaciones de alojamientos y servicios disponibles</li>
        )}
      </ul>
    </div>
  );
};

export default AlojamientosServicios;

