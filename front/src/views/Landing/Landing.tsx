import React from 'react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
   return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-700 via-blue-400 to-slate-300 text-white px-4">
         <div className="flex justify-between mx-12">
            <div className="w-3/5 flex flex-col self-center">
               <div className="self-center">
                  <h1 className="text-6xl font-bold mb-8 drop-shadow-lg">
                     MentorHub
                  </h1>
               </div>
               <div className="bg-[#ffffff44] flex flex-col justify-center content-center gap-5 rounded-3xl p-8 h-[35rem]">
                  <h2 className="text-6xl text-black pe-[4rem]">
                     Conectamos Mentores con Mentes Curiosas
                  </h2>
                  <p className="text-black text-2xl pe-[4rem]">
                     MentorHub es una plataforma pensada para facilitar la
                     conexión entre personas que quieren aprender y expertos
                     dispuestos a enseñar.
                  </p>
                  <ul className="self-center text-black text-2xl pe-[4rem]">
                     <li>🎯 Aprendé de la experiencia real</li>
                     <li>🤝 Conectá con mentores en tu área de interés</li>
                     <li>🧭 Guiá a otros y potenciá tu perfil profesional</li>
                  </ul>
                  <div className="flex justify-evenly gap-12">
                     <div className="flex flex-col justify-between content-center gap-1 w-1/3">
                        <h2 className="text-black m-1">
                           ¿Ya tenés cuenta? Iniciá sesión
                        </h2>
                        <Link
                           to="/login"
                           className="bg-blue-700 w-max rounded-full p-3 px-5 self-center hover:brightness-125"
                        >
                           Iniciar Sesión
                        </Link>
                     </div>
                     <div className="flex flex-col justify-between gap-1 w-1/3">
                        <h2 className="text-black m-1">...o crea tu cuenta.</h2>
                        <ul className="text-blue-500">
                           <li className="hover:underline">
                              <Link to="">👉 Soy Mentor</Link>
                           </li>
                           <li className="hover:underline">
                              <Link to="">🙋‍♂️ Quiero Aprender</Link>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
            <div className="w-2/5 flex">
               <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="menvirLanding self-center mt-12"
               >
                  <source src="/MenVir_Alegria.webm" type="video/webm" />
               </video>
            </div>
         </div>
      </div>
   );
};

export default Landing;

