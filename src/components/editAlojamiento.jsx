import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from './api';

const EditAlojamiento = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [alojamiento, setAlojamiento] = useState({
    idAlojamiento: '',
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
  const [alojamientos, setAlojamientos] = useState([]);

  useEffect(() => {
    api.get(`/alojamiento/getAlojamientos`)
      .then(response => {
        setAlojamientos(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleChangeAlojamiento = (e) => {
    const alojamientoId = e.target.value;
    const selectedAlojamiento = alojamientos.find(a => a.idAlojamiento.toString() === alojamientoId);
    setAlojamiento(selectedAlojamiento);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.put(`/alojamiento/putAlojamiento/${id}`, alojamiento)
      .then(response => {
        console.log(response);
        navigate('/alojamiento/listAlojamientos');
      })
      .catch(error => {
        console.error('Error actualizando alojamiento:', error);
      });
  };

  return (
    <div>
      <h2>Editar Alojamiento</h2>
      <select onChange={handleChangeAlojamiento}>
        <option value="">Seleccione un alojamiento</option>
        {alojamientos.map(a => (
          <option key={a.idAlojamiento} value={a.idAlojamiento}>{a.Titulo}</option>
        ))}
      </select>
      {alojamiento.idAlojamiento && (
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="Titulo"
            value={alojamiento.Titulo} 
            onChange={(e) => setAlojamiento(prevState => ({ ...prevState, Titulo: e.target.value }))} 
            placeholder="Título" 
            required 
          />
          <input 
            type="text" 
            name="Descripcion"
            value={alojamiento.Descripcion} 
            onChange={(e) => setAlojamiento(prevState => ({ ...prevState, Descripcion: e.target.value }))} 
            placeholder="Descripción" 
            required 
          />
          <input 
            type="text" 
            name="TipoAlojamiento"
            value={alojamiento.TipoAlojamiento} 
            onChange={(e) => setAlojamiento(prevState => ({ ...prevState, TipoAlojamiento: e.target.value }))} 
            placeholder="Tipo de Alojamiento" 
            required 
          />
          <input 
            type="text" 
            name="Latitud"
            value={alojamiento.Latitud} 
            onChange={(e) => setAlojamiento(prevState => ({ ...prevState, Latitud: e.target.value }))} 
            placeholder="Latitud" 
            required 
          />
          <input 
            type="text" 
            name="Longitud"
            value={alojamiento.Longitud} 
            onChange={(e) => setAlojamiento(prevState => ({ ...prevState, Longitud: e.target.value }))} 
            placeholder="Longitud" 
            required 
          />
          <input 
            type="text" 
            name="PrecioPorDia"
            value={alojamiento.PrecioPorDia} 
            onChange={(e) => setAlojamiento(prevState => ({ ...prevState, PrecioPorDia: e.target.value }))} 
            placeholder="Precio por Día" 
            required 
          />
          <input 
            type="text" 
            name="CantidadDormitorios"
            value={alojamiento.CantidadDormitorios} 
            onChange={(e) => setAlojamiento(prevState => ({ ...prevState, CantidadDormitorios: e.target.value }))} 
            placeholder="Cantidad de Dormitorios" 
            required 
          />
          <input 
            type="text" 
            name="CantidadBanios"
            value={alojamiento.CantidadBanios} 
            onChange={(e) => setAlojamiento(prevState => ({ ...prevState, CantidadBanios: e.target.value }))} 
            placeholder="Cantidad de Baños" 
            required 
          />
          <input 
            type="text" 
            name="Estado"
            value={alojamiento.Estado} 
            onChange={(e) => setAlojamiento(prevState => ({ ...prevState, Estado: e.target.value }))} 
            placeholder="Estado" 
            required 
          />
          <button type="submit">Guardar cambios</button>
        </form>
      )}
    </div>
  );
};

export default EditAlojamiento;
