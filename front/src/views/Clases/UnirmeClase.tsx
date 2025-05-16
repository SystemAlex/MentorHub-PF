import React, { useState } from 'react';

const UnirmeClase: React.FC = () => {
  const [codigo, setCodigo] = useState('');

  const handleUnirme = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Solicitando unirse a la clase con código: ${codigo}`);
    // Aquí puedes llamar a la API para unirse a la clase
    setCodigo('');
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Unirme a una Clase</h2>
      <form onSubmit={handleUnirme} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Código de la clase"
          value={codigo}
          onChange={e => setCodigo(e.target.value)}
          required
          className="border border-gray-300 rounded px-3 py-2"
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Unirme
        </button>
      </form>
    </div>
  );
};

export default UnirmeClase;
