import React, { useRef, useState, useEffect } from "react";
import Background from "../../components/Background/Background";
import MenVir from "../../components/MenVir/MenVir";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const texts = [
  <div className="h-full flex flex-col justify-between gap-[1.7vh]">
    <p className="text-center">
      ¿Buscas <strong>crecer profesionalmente</strong> pero no sabes por dónde
      empezar?
    </p>
    <p className="text-center">
      En <strong>MentorHub</strong> conectamos a profesionales como tú con
      <strong> mentores expertos</strong> que te guiarán paso a paso hacia el
      éxito.
    </p>
    <span className="mx-auto">
      <p>
        ✅ <strong>Mentores verificados</strong> en diversas industrias.
      </p>
      <p>
        ✅ <strong>Sesiones personalizadas</strong> adaptadas a tus metas.
      </p>
      <p>
        ✅ <strong>Red de apoyo</strong> para impulsar tu desarrollo.
      </p>
    </span>
    <p className="text-center">
      <strong>Únete hoy</strong> y da el primer paso hacia el futuro que
      mereces.
    </p>
  </div>,
  <div className="h-full flex flex-col justify-between gap-[1.7vh]">
    <p className="text-center">
      <strong>¿Por qué elegir MentorHub?</strong>
    </p>
    <span className="mx-auto">
      <p>
        🌟 <strong>Aprendizaje práctico:</strong> Deja atrás la teoría y
        enfócate en lo que realmente funciona.
      </p>
      <p>
        📈 <strong>Resultados comprobados:</strong> Miles de profesionales ya
        aceleraron su carrera con nosotros.
      </p>
      <p>
        💡 <strong>Flexibilidad total:</strong> Agenda sesiones cuando mejor te
        convenga.
      </p>
    </span>
    <p className="text-[4.73vh] text-center">
      ¡No esperes más! <strong>Encuentra a tu mentor ideal</strong> y lleva tu
      carrera al siguiente nivel.
    </p>
  </div>,
];
const transitionTime = 25;
const radius = 45;

const Landing: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const circumference = 50 * 2 * Math.PI;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (user) {
      navigate("/panel");
    }
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= transitionTime ? 0 : prev + 1));
    }, 1000);

    const textInterval = setInterval(() => {
      setCurrent((prev) => (prev === texts.length - 1 ? 0 : prev + 1));
      setProgress(0); // Reiniciar barra de progreso
    }, transitionTime * 1000);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [user, navigate]);

  const handleVideoEnd = () => {
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.loop = true;
        videoRef.current.src = "/MenVir_Explicando.webm";
        videoRef.current.play();
      }
    }, 100);
  };

  if (user) return null;

  return (
    <div className="w-screen h-screen flex items-center justify-end overflow-hidden">
      <div className="w-full h-full flex flex-col justify-start">
        <h1 className="title text-center leading-none pt-[9vh]">MentorHub</h1>
        <h2 className="subtitle text-center z-10">
          Conectamos Mentores con Mentes Curiosas
        </h2>
        <div className="h-full flex flex-col justify-between gap-[1.7vh] panel-text leading-tight">
          <div className="relative h-full overflow-hidden">
            <div className="absolute top-0 left-0 w-5 h-5 text-center">
              <span className="absolute inset-0 flex justify-center items-center text-xs leading-none text-[#007AFF] opacity-50">
                {(progress - transitionTime) * -1}
              </span>
              <svg className="absolute top-0 left-0" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  stroke="#007AFF"
                  strokeWidth="10"
                  strokeOpacity="0.25"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  stroke="#007AFF"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={
                    circumference - (progress / transitionTime) * circumference
                  }
                  className="transition-all duration-1000"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {texts.map((text, index) => (
              <div
                key={index}
                className={`absolute w-full h-full transition-opacity duration-500 ${
                  current === index ? "opacity-100" : "opacity-0"
                }`}
              >
                {text}
              </div>
            ))}
          </div>
          <a
            className="w-fit bg-[#007AFF] text-white mx-auto py-3 px-6 rounded-full hover:bg-white hover:text-[#007AFF] border-2 border-[#007AFF]"
            href="/register"
          >
            Regístrate gratis en MentorHub
          </a>
          <p className="text-center">
            ¿Ya tienes una cuenta?{" "}
            <a
              className="text-[#007AFF] hover:underline underline-offset-2"
              href="/login"
            >
              Ingresa aquí
            </a>
          </p>
        </div>
      </div>
      <Background>
        <MenVir
          src="/MenVir_Saludando.webm"
          videoRef={videoRef}
          onEnded={handleVideoEnd}
          loop={false}
        />
      </Background>
      <div className="absolute inset-0 flex flex-col items-center justify-center panel"></div>
    </div>
  );
};

export default Landing;
