import React, { useState, useRef, useEffect } from 'react'

interface User {
  name: string
  email: string
  subscriptionActive: boolean
}

const UserProfile: React.FC = () => {
  const [user] = useState<User>({
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    subscriptionActive: true,
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Estado para la foto de perfil, que intenta cargar desde localStorage al iniciar
  const [profilePic, setProfilePic] = useState<string>(() => {
    return localStorage.getItem('profilePic') || 'https://i.pravatar.cc/150?img=3'
  })

  // Cuando cambie la foto, actualizamos localStorage
  useEffect(() => {
    localStorage.setItem('profilePic', profilePic)
  }, [profilePic])

  const handleChangePhotoClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setProfilePic(imageUrl)
    }
  }

  return (
    <div className="p-8 max-w-md mx-auto mt-24 font-sans text-white bg-blue-600 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-center">Perfil de Usuario</h1>

      <div className="flex flex-col items-center">
        <div className="relative w-36 h-36">
          <img
            src={profilePic}
            alt="Foto de perfil"
            className="w-36 h-36 rounded-full object-cover border-4 border-white"
          />
          <button
            onClick={handleChangePhotoClick}
            className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
            title="Cambiar foto de perfil"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536M9 13.5v3h3l7.5-7.5-3-3-7.5 7.5z"
              />
            </svg>
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <div className="mt-6 w-full text-center">
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-lg mt-2">Correo: {user.email}</p>

          <p
            className={`mt-6 text-lg font-medium ${
              user.subscriptionActive ? 'text-green-300' : 'text-red-300'
            }`}
          >
            {user.subscriptionActive ? 'Suscripción activa' : 'Suscripción inactiva'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
