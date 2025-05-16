import React, { useState } from 'react';

const CrearClase: React.FC = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleCrear = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Clase creada:\nTítulo: ${titulo}\nDescripción: ${descripcion}`);
    // Aquí podrías llamar a la API para guardar la clase
    setTitulo('');
    setDescripcion('');
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Crear Nueva Clase</h2>
      <form onSubmit={handleCrear} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Título de la clase"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          required
          className="border border-gray-300 rounded px-3 py-2"
        />
        <textarea
          placeholder="Descripción de la clase"
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
          required
          className="border border-gray-300 rounded px-3 py-2"
          rows={4}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Crear Clase
        </button>
      </form>
    </div>
  );
};

export default CrearClase;
