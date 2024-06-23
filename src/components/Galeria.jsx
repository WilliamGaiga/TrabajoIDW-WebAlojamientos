import React from 'react';

const Galeria = () => (
  <div className="galeria">
    {/* Imagen 1 */}
    <div className="foto">
      <img src="img/ft1.jpg" alt="Imagen 1" />
      <div className="pie">   
        <a href="https://www.hotelkilton.com.ar/elhotel.html"> Hoteles, departamentos disponibles</a>
        <a href="https://www.hotelkilton.com.ar/elhotel.html">Habitaciones para 1 hasta 4 personas</a>
        <a href="contactoPagina.html">¿Desea reservar?</a>
      </div>
    </div>
    
    {/* Imagen 2 */}
    <div className="foto">
      <img src="img/laguna-condor.jpg" alt="Imagen 2" />
      <div className="pie">
        <a href="https://www.hotelkilton.com.ar/elhotel.html"> Cabañas o casas disponibles </a>
        <a href="https://www.hotelkilton.com.ar/elhotel.html">Para 3-4 personas</a>
        <a href="contactoPagina.html">¿Desea reservar?</a>
      </div>
    </div>
    
    {/* Imagen 3 */}
    <div className="foto">
      <img src="img/hostel_brasil.jpg" alt="Imagen 3" />
      <div className="pie">
        <a href="https://www.hotelkilton.com.ar/elhotel.html"> Hostels y espacios compartidos </a>
        <a href="https://www.hotelkilton.com.ar/elhotel.html">Habitaciones para 1-2 personas</a>
        <a href="contactoPagina.html">¿Desea reservar?</a>
      </div>
    </div>
  </div>
);

export default Galeria;
