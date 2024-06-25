import React, { useState, useEffect } from 'react';
import '../assets/catalogo.css';

const Catalogo = () => {
  const [alojamientos, setAlojamientos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [alojamientosServicios, setAlojamientosServicios] = useState([]);
  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching alojamientos
        const alojamientosResponse = await fetch('http://localhost:3001/alojamiento/getAlojamientos');
        const alojamientosData = await alojamientosResponse.json();
        if (!Array.isArray(alojamientosData)) {
          throw new Error('La respuesta de alojamientos no es un array');
        }
        setAlojamientos(alojamientosData);

        // Fetching servicios
        const serviciosResponse = await fetch('http://localhost:3001/servicio/getAllServicios');
        const serviciosData = await serviciosResponse.json();
        if (!Array.isArray(serviciosData)) {
          throw new Error('La respuesta de servicios no es un array');
        }
        setServicios(serviciosData);

        // Fetching alojamientosServicios
        const alojamientosServiciosResponse = await fetch('http://localhost:3001/alojamientosServicios/getAllAlojamientoServicios');
        const alojamientosServiciosData = await alojamientosServiciosResponse.json();
        if (!Array.isArray(alojamientosServiciosData)) {
          throw new Error('La respuesta de alojamientosServicios no es un array');
        }
        setAlojamientosServicios(alojamientosServiciosData);

        // Fetching imagenes
        const imagenesResponse = await fetch('http://localhost:3001/imagen/getAllImagenes');
        const imagenesData = await imagenesResponse.json();
        if (!Array.isArray(imagenesData)) {
          throw new Error('La respuesta de imagenes no es un array');
        }
        setImagenes(imagenesData);
      } catch (error) {
        console.error('Error obteniendo datos:', error);
      }
    };

    fetchData();
  }, []);

  const getServiciosByAlojamientoId = (idAlojamiento) => {
    return alojamientosServicios
      .filter((as) => as.idAlojamiento === idAlojamiento)
      .map((as) => {
        const servicio = servicios.find((s) => s.idServicio === as.idServicio);
        return servicio ? servicio.Nombre : '';
      });
  };

  const getImagenesByAlojamientoId = (idAlojamiento) => {
    return imagenes.filter((img) => img.idAlojamiento === idAlojamiento);
  };

  return (
    <div>
      <h1>Catálogo de Alojamientos</h1>
      <a href="/busqueda">Filtrar Búsqueda</a>
      <div className="catalogo">
        {alojamientos.map((alojamiento) => (
          <div key={alojamiento.idAlojamiento} className="alojamiento">
            <h2>{alojamiento.Titulo}</h2>
            <p>{alojamiento.Descripcion}</p>
            <p>Precio por día: {alojamiento.PrecioPorDia}</p>
            <p>Estado: {alojamiento.Estado}</p>
            <div>
              <h3>Servicios:</h3>
              <ul>
                {getServiciosByAlojamientoId(alojamiento.idAlojamiento).map((servicio, index) => (
                  <li key={index}>{servicio}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Imágenes:</h3>
              <div className="imagenes">
                {getImagenesByAlojamientoId(alojamiento.idAlojamiento).map((imagen) => (
                  <img key={imagen.idImagen} src={`/${imagen.RutaArchivo}`} alt={`Imagen de ${alojamiento.Titulo}`} />
                ))}
              </div>
            </div>
            <div className="reservar-button">
              <button>
                {alojamiento.Estado === 'Disponible' ? 'Reservar' : 'Ya reservado'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalogo;
