import React from 'react'
import RegisterForm from '../../components/RegisterForm/RegisterForm'
import imagenRobot from "../../images/imagenRobot.png"

const Register: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (formData: any) => {
    console.log('Formulario enviado', formData)
  }

  return (
    <div className="flex h-screen w-full relative">
     
     
  <div className="w-1/2 relative bg-white bg-opacity-70 backdrop-blur-lg overflow-hidden">
  <img
    src={imagenRobot}
    alt="Robot Fondo"
    className="absolute inset-0 h-full w-full object-cover opacity-20 pointer-events-none select-none transform scale-[1.8] translate-x-[20%]"
    style={{ userSelect: 'none', objectPosition: 'center right' }}
  />
</div>


      
      <div className="w-1/2 bg-[#409BFF] relative overflow-hidden">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute top-0 left-0 w-full h-full"
        >
          <path d="M100,0 Q90,90 0,100 L0,0 Z" fill="#2463EB" />
        </svg>
      </div>

 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                bg-white bg-opacity-90 backdrop-blur-lg rounded-3xl p-12 w-11/12 max-w-4xl shadow-lg z-20">
  <h1 className="text-4xl font-bold text-black mb-3">MentorHub</h1>
  <h2 className="text-xl font-medium text-gray-700 mb-8">Registro</h2>
  <RegisterForm onSubmit={handleSubmit} />
</div>

    </div>
  )
}

export default Register
