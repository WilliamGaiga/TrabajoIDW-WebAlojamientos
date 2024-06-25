// src/components/FiltroBusq.jsx
import React, { useState, useEffect } from 'react';
import '../assets/catalogo.css';

const FiltroBusq = () => {
  const [alojamientos, setAlojamientos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [alojamientosServicios, setAlojamientosServicios] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [filtros, setFiltros] = useState({
    tipoAlojamiento: '',
    estado: '',
    precioMin: '',
    precioMax: '',
    dormitorios: '',
    banios: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const alojamientosResponse = await fetch('http://localhost:3001/alojamiento/getAlojamientos');
        const alojamientosData = await alojamientosResponse.json();
        if (!Array.isArray(alojamientosData)) {
          throw new Error('La respuesta de alojamientos no es un array');
        }
        setAlojamientos(alojamientosData);

        const serviciosResponse = await fetch('http://localhost:3001/servicio/getAllServicios');
        const serviciosData = await serviciosResponse.json();
        if (!Array.isArray(serviciosData)) {
          throw new Error('La respuesta de servicios no es un array');
        }
        setServicios(serviciosData);

        const alojamientosServiciosResponse = await fetch('http://localhost:3001/alojamientosServicios/getAllAlojamientoServicios');
        const alojamientosServiciosData = await alojamientosServiciosResponse.json();
        if (!Array.isArray(alojamientosServiciosData)) {
          throw new Error('La respuesta de alojamientosServicios no es un array');
        }
        setAlojamientosServicios(alojamientosServiciosData);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredAlojamientos = alojamientos.filter((alojamiento) => {
      const { tipoAlojamiento, estado, precioMin, precioMax, dormitorios, banios } = filtros;
      return (
        (tipoAlojamiento ? alojamiento.TipoAlojamiento === parseInt(tipoAlojamiento) : true) &&
        (estado ? alojamiento.Estado === estado : true) &&
        (precioMin ? alojamiento.PrecioPorDia >= parseFloat(precioMin) : true) &&
        (precioMax ? alojamiento.PrecioPorDia <= parseFloat(precioMax) : true) &&
        (dormitorios ? alojamiento.CantidadDormitorios === parseInt(dormitorios) : true) &&
        (banios ? alojamiento.CantidadBanios === parseInt(banios) : true)
      );
    });
    setAlojamientos(filteredAlojamientos);
  };

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
      <form onSubmit={handleSubmit} className="filtro-formulario">
        <label>
          Tipo de Alojamiento:
          <select name="tipoAlojamiento" value={filtros.tipoAlojamiento} onChange={handleChange} required>
            <option value="">Seleccione</option>
            <option value="1">Casa</option>
            <option value="2">Departamento</option>
            <option value="3">Cabañas</option>
            <option value="4">Hostel</option>
          </select>
        </label>
        <label>
          Estado:
          <select name="estado" value={filtros.estado} onChange={handleChange}>
            <option value="">Seleccione</option>
            <option value="Disponible">Disponible</option>
            <option value="Reservado">Reservado</option>
          </select>
        </label>
        <label>
          Precio Mínimo:
          <input type="number" name="precioMin" value={filtros.precioMin} onChange={handleChange} />
        </label>
        <label>
          Precio Máximo:
          <input type="number" name="precioMax" value={filtros.precioMax} onChange={handleChange} />
        </label>
        <label>
          Dormitorios:
          <input type="number" name="dormitorios" value={filtros.dormitorios} onChange={handleChange} />
        </label>
        <label>
          Baños:
          <input type="number" name="banios" value={filtros.banios} onChange={handleChange} />
        </label>
        <button type="submit">Filtrar</button>
      </form>
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

export default FiltroBusq;
