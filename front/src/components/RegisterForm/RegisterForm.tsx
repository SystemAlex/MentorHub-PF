import React, { useState } from 'react';

interface RegisterFormProps {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (formData: any) => void;
}

const avatars = [
  { id: 1, emoji: '🧑🏽‍💻' },
  { id: 2, emoji: '🧑🏿‍🎨' },
  { id: 3, emoji: '🧑🏼‍🚀' },
  { id: 4, emoji: '🧑🏿‍🏫' },
];

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [activeTab, setActiveTab] = useState<'personal' | 'academics'>('personal');
  const [formData, setFormData] = useState({
    nombre: '',
    celular: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatarId: 0,
    profileImage: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage' && files) {
      setFormData(prev => ({ ...prev, profileImage: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAvatarSelect = (id: number) => {
    setFormData(prev => ({ ...prev, avatarId: id }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-8 
    p-5 text-gray-700">
     
      <div className="flex-1 bg-white bg-opacity-50 p-6 rounded-lg shadow-md max-w-md">
        <div className="flex gap-8 mb-6 border-b border-gray-300 text-sm font-semibold">
          <button
            type="button"
            className={`pb-2 ${activeTab === 'personal' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-400'}`}
            onClick={() => setActiveTab('personal')}
          >
            Información Personal
          </button>
          <button
            type="button"
            className={`pb-2 ${activeTab === 'academics' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-400'}`}
            onClick={() => setActiveTab('academics')}
          >
            Detalles Académicos
          </button>
        </div>

        {activeTab === 'personal' && (
          <div className="flex flex-col gap-4">
            <label>
              Nombre Completo <span className="text-red-600">*</span>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full rounded px-3 py-2 mt-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Nombre completo"
                required
              />
            </label>
            <label>
              Nº de celular <span className="text-red-600">*</span>
              <input
                type="tel"
                name="celular"
                value={formData.celular}
                onChange={handleChange}
                className="w-full rounded px-3 py-2 mt-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Nº de celular"
                required
              />
            </label>
            <label>
              E-mail <span className="text-red-600">*</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded px-3 py-2 mt-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="email@example.com"
                required
              />
            </label>
            <label>
              Contraseña <span className="text-red-600">*</span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded px-3 py-2 mt-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Contraseña"
                required
              />
            </label>
            <label>
              Confirmar Contraseña <span className="text-red-600">*</span>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full rounded px-3 py-2 mt-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Confirmar contraseña"
                required
              />
            </label>
            <p className="text-xs mt-2">* campos obligatorios</p>
          </div>
        )}

        {activeTab === 'academics' && (
          <div>
            
            <p className="text-gray-500">Contenido de detalles académicos aquí</p>
          </div>
        )}
      </div>

      <div className="w-[300px] bg-white bg-opacity-50 rounded-lg p-6 flex flex-col items-center justify-between shadow-md">
        <div className="flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-5xl text-gray-600">
            {formData.profileImage
              ? <img src={URL.createObjectURL(formData.profileImage)} alt="Profile" className="rounded-full w-20 h-20 object-cover" />
              : '👤'}
          </div>
          <label
            htmlFor="profileImage"
            className="bg-blue-600 text-white text-sm px-4 py-1 rounded cursor-pointer hover:bg-blue-700 transition"
          >
            Subir imagen
          </label>
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
        </div>

        <div className="w-full mt-4">
          <p className="text-xs mb-1 font-semibold">seleccionar Avatar</p>
          <div className="flex justify-between gap-2">
            {avatars.map(a => (
              <button
                key={a.id}
                type="button"
                onClick={() => handleAvatarSelect(a.id)}
                className={`rounded-full w-10 h-10 flex items-center justify-center cursor-pointer text-2xl transition ${
                  formData.avatarId === a.id ? 'ring-2 ring-blue-600' : 'ring-1 ring-gray-300'
                }`}
              >
                {a.emoji}
              </button>
            ))}
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={formData.avatarId} // Puedes ajustar esto según funcionalidad que necesites
            readOnly
            className="w-full mt-2"
          />
        </div>

        <button
          type="submit"
          className="mt-6 bg-blue-600 w-full py-2 rounded-full text-white font-semibold hover:bg-blue-700 transition"
        >
          Continuar
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
