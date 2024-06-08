import React from 'react';
import '../assets/estilos.css';  

const Nosotros = () => (


    <main>
      <section className="info">
        <div className="info-content">
          <h2>Historia</h2>
          <p>Somos una empresa radicada en Concordia, Entre Ríos, desde el año 2020. Entre las actividades se destacan la coordinación y asesoramiento para alojamientos y estadias en distintas regiones del país y del mundo, con fines turisticos</p>
          <h2>Misión</h2>
          <p>La misión de la empresa es inspirar a la gente a explorar, descubrir y aprender a través de viajes hacia destinos maravillosos y recuerdos memorables, brindandole al cliente máxima seguridad, confianza y satisfacción garantizada.</p>
          <h2>Valores</h2>
          <p>Calidad, Responsabilidad, Confianza y Pasión son las palabras que nos definen y guian lo que hacemos.</p>
        </div>
        <img src="/img/travel.jpg" alt="Sobre nosotros" className="info-image" />
      </section>
    </main>
 
);

export default Nosotros;
