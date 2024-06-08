import React from 'react';

const Contactanos = () => (
  <main>
    <section className="contact-form">
      <form>
        <label htmlFor="name">Nombre:</label>
        <input type="text" id="name" name="name" required />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
        <label htmlFor="message">Mensaje:</label>
        <textarea id="message" name="message" rows="4" required></textarea>
        <button type="submit">Enviar Mensaje</button>
      </form>
      <div className="contact-info">
        <p>¿Quieres escribirnos? <a href="mailto:info@HotelesWeb.com">Envíanos un email</a></p>
        <p>o podes llamarnos al <a href="tel:+3454123321">+34 54 123 321</a></p>
      </div>
    </section>
    <img src="img/contact.jpg" alt="Imagen de contacto" className="contact-image" />
  </main>
);

export default Contactanos;
