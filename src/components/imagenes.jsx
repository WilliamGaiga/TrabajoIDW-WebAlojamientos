import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Imagenes = () => {
    const [imagenes, setImagenes] = useState([]);
    const [nuevaImagen, setNuevaImagen] = useState({ idAlojamiento: '', RutaArchivo: '' });
    const [idEditar, setIdEditar] = useState(null);
    const [imagenEditar, setImagenEditar] = useState({ idAlojamiento: '', RutaArchivo: '' });

    // Función para obtener todas las imágenes
    const fetchImagenes = async () => {
        try {
            const response = await axios.get('http://localhost:3001/imagen/getAllImagenes');
            setImagenes(response.data);
        } catch (error) {
            console.error('Error fetching images', error);
        }
    };

    // Función para registrar una nueva imagen
    const createImagen = async () => {
        try {
            const response = await axios.post('http://localhost:3001/imagen/createImagen', nuevaImagen);
            setImagenes([...imagenes, response.data]);
            setNuevaImagen({ idAlojamiento: '', RutaArchivo: '' });
        } catch (error) {
            console.error('Error creating image', error);
        }
    };

    // Función para actualizar una imagen existente
    const updateImagen = async (id) => {
        try {
            const response = await axios.put(`http://localhost:3001/imagen/updateImagen/${id}`, imagenEditar);
            setImagenes(imagenes.map(img => (img.idImagen === id ? response.data : img)));
            setIdEditar(null);
            setImagenEditar({ idAlojamiento: '', RutaArchivo: '' });
        } catch (error) {
            console.error('Error updating image', error);
        }
    };

    // Función para eliminar una imagen
    const deleteImagen = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/imagen/deleteImagen/${id}`);
            setImagenes(imagenes.filter(img => img.idImagen !== id));
        } catch (error) {
            console.error('Error deleting image', error);
        }
    };

    useEffect(() => {
        fetchImagenes();
    }, []);

    return (
        <div>
            <h1>Administrar Imágenes</h1>
            <div>
                <h2>Registrar Nueva Imagen</h2>
                <input
                    type="text"
                    placeholder="ID Alojamiento"
                    value={nuevaImagen.idAlojamiento}
                    onChange={(e) => setNuevaImagen({ ...nuevaImagen, idAlojamiento: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Ruta Archivo"
                    value={nuevaImagen.RutaArchivo}
                    onChange={(e) => setNuevaImagen({ ...nuevaImagen, RutaArchivo: e.target.value })}
                />
                <button onClick={createImagen}>Registrar</button>
            </div>
            <div>
                <h2>Lista de Imágenes</h2>
                {imagenes.map((img) => (
                    <div key={img.idImagen}>
                        <p>ID: {img.idImagen}</p>
                        <p>ID Alojamiento: {img.idAlojamiento}</p>
                        <p>Ruta Archivo: {img.RutaArchivo}</p>
                        <button onClick={() => {
                            setIdEditar(img.idImagen);
                            setImagenEditar({ idAlojamiento: img.idAlojamiento, RutaArchivo: img.RutaArchivo });
                        }}>Editar</button>
                        <button onClick={() => deleteImagen(img.idImagen)}>Eliminar</button>
                    </div>
                ))}
            </div>
            {idEditar && (
                <div>
                    <h2>Editar Imagen</h2>
                    <input
                        type="text"
                        placeholder="ID Alojamiento"
                        value={imagenEditar.idAlojamiento}
                        onChange={(e) => setImagenEditar({ ...imagenEditar, idAlojamiento: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Ruta Archivo"
                        value={imagenEditar.RutaArchivo}
                        onChange={(e) => setImagenEditar({ ...imagenEditar, RutaArchivo: e.target.value })}
                    />
                    <button onClick={() => updateImagen(idEditar)}>Guardar Cambios</button>
                    <button onClick={() => setIdEditar(null)}>Cancelar</button>
                </div>
            )}
        </div>
    );
};

export default Imagenes;
