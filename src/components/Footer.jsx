import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import facebookLogo from '/img/facebook.svg'; // Ruta de tu logo de Facebook
import instagramLogo from '/img/Instagram.svg'; // Ruta de tu logo de Instagram


const Footer = () => {
  const location = useLocation();
  const isAdminPage = location.pathname === '/AdminPage';

  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://worldtimeapi.org/api/timezone/America/Argentina/Buenos_Aires');
        const { datetime } = response.data;
        setDateTime(datetime);
      } catch (error) {
        console.error('Error fetching date and time:', error);
      }
    };
    fetchData();
  }, []);

  if (isAdminPage) {
    return null; // No renderiza el footer en la página de administrador
  }

  // Formatear la fecha y hora
  const formattedDateTime = new Date(dateTime).toLocaleString('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  return (
    <footer style={footerStyle}>
    <div style={iconContainerStyle}>
        <p>Visita nuestras redes:</p>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <img src={facebookLogo} alt="Facebook" style={iconStyle} />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <img src={instagramLogo} alt="Instagram" style={iconStyle} />
        </a>
        <p>Hoy es: {formattedDateTime}</p>
        <p>Derechos de autor © 2024 - HotelesWeb</p>
      </div>
    </footer>
  );
};

const footerStyle = {
  textAlign: 'flex-start',
  padding: '0px',
  backgroundColor: 'lightblue',
};

const iconContainerStyle = {
  marginTop: '50px',
  display: 'flex',
  justifyContent: 'flex-start',
  gap: '100px',
  
  
};

const iconStyle = {
  width: '30px',
  height: '30px',
};


export default Footer;
