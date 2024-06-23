import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import Contactanos from './components/Contactanos';
import Nosotros from './components/Nosotros';
import AdminPage from './components/AdminPage';
import CreateTipoAlojamiento from './components/CreateTipoAlojamiento';
import EditTipoAlojamiento from './components/EditTipoAlojamiento';
import ListTiposAlojamiento from './components/ListTiposAlojamiento';
import CreateAlojamiento from './components/createAlojamiento';
import EditAlojamiento from './components/editAlojamiento';
import ListAlojamientos from './components/listAlojamiento';

import './assets/styles.css';

const App = () => (
  <Router>
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/contactanos" element={<Contactanos />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/AdminPage" element={<AdminPage />} />
        <Route path="/tiposAlojamiento/CreateTipoAlojamiento" element={<CreateTipoAlojamiento />} />
        <Route path="/tiposAlojamiento/EditTipoAlojamiento/:id" element={<EditTipoAlojamiento />} />
        <Route path="/tiposAlojamiento/ListTiposAlojamiento" element={<ListTiposAlojamiento />} />
        <Route path="/Alojamiento/createAlojamiento" element={<CreateAlojamiento />} />
        <Route path="/Alojamiento/editAlojamiento/" element={<EditAlojamiento />} />
        <Route path="/Alojamiento/listAlojamiento" element={<ListAlojamientos/>} />
       
      </Routes>
      <Footer />
    </div>
  </Router>
);

export default App;

