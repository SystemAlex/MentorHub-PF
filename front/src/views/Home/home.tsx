const Home = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Video de fondo */}
      <div className="relative w-full h-[60vh] overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/videoHome.mp4" type="video/mp4" />
          Tu navegador no soporta el tag de video.
        </video>

        {/* Overlay oscuro opcional para mejor contraste */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg z-10">Mentor Hub</h1>
        </div>
      </div>

      {/* Sección de contenido */}
      <section className="py-12 px-6 md:px-20 bg-white">
        <h2 className="text-3xl font-semibold text-center mb-10">¿Qué te brindamos?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-gray-50 shadow-md rounded-2xl p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">Mentoría Personalizada</h3>
            <p className="text-gray-600">
              Cada estudiante recibe acompañamiento directo de mentores especializados que guían su proceso de aprendizaje.
            </p>
          </div>
          <div className="bg-gray-50 shadow-md rounded-2xl p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">Material Actualizado</h3>
            <p className="text-gray-600">
              Accede a contenido relevante, actualizado y adaptado a las necesidades del mercado tecnológico actual.
            </p>
          </div>
          <div className="bg-gray-50 shadow-md rounded-2xl p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">Proyectos Reales</h3>
            <p className="text-gray-600">
              Aplica lo aprendido desarrollando proyectos reales que puedes incluir en tu portafolio profesional.
            </p>
          </div>
          <div className="bg-gray-50 shadow-md rounded-2xl p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">Comunidad Estudiantil</h3>
            <p className="text-gray-600">
              Forma parte de una comunidad activa de estudiantes y mentores donde podrás intercambiar ideas, resolver dudas y crecer en equipo.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
