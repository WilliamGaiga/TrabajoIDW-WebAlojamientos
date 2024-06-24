// Galeria.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Galeria = () => (
  <div className="galeria">
    {/* Imagen 1 */}
    <div className="foto">
      <img src="img/ft1.jpg" alt="Imagen 1" />
      <div className="pie">   
        <Link to="/catalogo/"> Hoteles- Departamentos </Link>
        <Link to="/catalogo/"> Para 1 hasta 4 Personas </Link>
        <Link to="/catalogo/"> Ver Disponibilidad </Link>
      </div>
    </div>
    
    {/* Imagen 2 */}
    <div className="foto">
      <img src="img/laguna-condor.jpg" alt="Imagen 2" />
      <div className="pie">
        <Link to="/catalogo/"> Cabañas - Casas </Link>
        <Link to="/catalogo/"> Para 3-4 Personas </Link>
        <Link to="/catalogo/"> Ver Disponibilidad </Link>
      </div>
    </div>
    
    {/* Imagen 3 */}
    <div className="foto">
      <img src="img/hostel_brasil.jpg" alt="Imagen 3" />
      <div className="pie">
        <Link to="/catalogo/"> Hostels - Espacios Compartidos </Link>
        <Link to="/catalogo/"> Para 1-2 Personas </Link>
        <Link to="/catalogo/"> Ver Disponibilidad </Link>
      </div>
    </div>
  </div>
);

export default Galeria;

