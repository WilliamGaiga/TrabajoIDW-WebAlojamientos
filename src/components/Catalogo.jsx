import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Catalogo = () => {
  const [alojamientos, setAlojamientos] = useState([]);

  useEffect(() => {
    const fetchAlojamientos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/alojamiento/getAlojamientos');
        setAlojamientos(response.data);
      } catch (error) {
        console.error('Error fetching alojamientos:', error);
      }
    };

    fetchAlojamientos();
  }, []);

  return (
    <div>
      <h1>Catálogo de Alojamientos</h1>
      {alojamientos.map((alojamiento) => (
        <div key={alojamiento.id} className="alojamiento-card">
          <h2>{alojamiento.Titulo}</h2>
          <p>{alojamiento.Descripcion}</p>
          <p>Latitud: {alojamiento.Latitud}</p>
          <p>Longitud: {alojamiento.Longitud}</p>
          <p>Precio por Día: ${alojamiento.PrecioPorDia}</p>
          <p>Dormitorios: {alojamiento.CantidadDormitorios}</p>
          <p>Baños: {alojamiento.CantidadBanios}</p>
          <p>Estado: {alojamiento.Estado}</p>
          <p>Tipo de Alojamiento: {alojamiento.TipoAlojamiento}</p>
          <div className="servicios">
            <h3>Servicios:</h3>
            <ul>
              {alojamiento.Servicios.map((servicio) => (
                <li key={servicio.id}>{servicio.Nombre}</li>
              ))}
            </ul>
          </div>
          <div className="imagenes">
            <h3>Imágenes:</h3>
            {alojamiento.Imagenes.map((imagen) => (
              <img key={imagen.id} src={imagen.url} alt={alojamiento.Titulo} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Catalogo;


