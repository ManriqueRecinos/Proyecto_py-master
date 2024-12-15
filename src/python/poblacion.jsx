import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../url';

const Poblacion = () => {
    const [poblaciones, setPoblaciones] = useState([]);

    useEffect(() => {
        const fetchPoblaciones = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}`);
                const data = await response.json();
                console.log('Datos de la API:', data); // Verifica los datos aquí

                // Transformar los datos: omitir la primera fila (encabezados) y convertir en objetos
                const poblacionesTransformadas = data.data.slice(1).map((fila) => ({
                    departamento: fila[0],
                    hombres: fila[1],
                    mujeres: fila[2],
                    total: fila[3]
                }));

                setPoblaciones(poblacionesTransformadas);
            } catch (error) {
                console.error('Error al obtener los datos de población:', error);
                setPoblaciones([]);
            }
        };

        fetchPoblaciones();
    }, []);

    return (
        <table
            className="table table-striped table-bordered table-hover w-full border-collapse rounded-lg"
        >
            <thead className="bg-gradient-to-r from-pink-500 to-orange-500 text-white">
                <tr>
                    <th>Departamento</th>
                    <th>Hombres</th>
                    <th>Mujeres</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {poblaciones.map((poblacion, index) => (
                    <tr key={index} className="hover:bg-gray-100 transition-colors duration-300">
                        <td>{poblacion.departamento}</td>
                        <td>{poblacion.hombres}</td>
                        <td>{poblacion.mujeres}</td>
                        <td>{poblacion.total}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Poblacion;
