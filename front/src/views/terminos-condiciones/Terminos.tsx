import React from 'react';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Términos y Condiciones</h1>
      <p className="mb-4">
        Bienvenido a MentorHub. Estos términos y condiciones regulan el uso de nuestra plataforma educativa. Al acceder a nuestra web, usted acepta cumplir con los siguientes lineamientos.
      </p>

      <h2 className="text-xl font-semibold mb-2">1. Uso de la plataforma</h2>
      <p className="mb-4">
        La plataforma MentorHub proporciona contenidos educativos, mentorías personalizadas y herramientas de aprendizaje. El usuario se compromete a utilizar los servicios solo con fines educativos y no comerciales.
      </p>

      <h2 className="text-xl font-semibold mb-2">2. Registro de usuarios</h2>
      <p className="mb-4">
        Para acceder a ciertas funciones, es necesario crear una cuenta con datos reales y actualizados. El usuario es responsable de mantener la confidencialidad de su información de acceso.
      </p>

      <h2 className="text-xl font-semibold mb-2">3. Propiedad intelectual</h2>
      <p className="mb-4">
        Todos los contenidos, materiales y herramientas disponibles en MentorHub están protegidos por derechos de autor y son propiedad de la empresa o de sus respectivos autores. Se prohíbe su reproducción sin autorización.
      </p>

      <h2 className="text-xl font-semibold mb-2">4. Conducta del usuario</h2>
      <p className="mb-4">
        No se permite el uso ofensivo, fraudulento o que atente contra otros usuarios. Cualquier violación a estas normas puede resultar en la suspensión o eliminación de la cuenta.
      </p>

      <h2 className="text-xl font-semibold mb-2">5. Modificaciones</h2>
      <p className="mb-4">
        Nos reservamos el derecho de actualizar estos términos en cualquier momento. Se notificará a los usuarios sobre cambios relevantes por correo electrónico o mediante la plataforma.
      </p>

      <p className="mt-6">Última actualización: mayo 2025</p>
    </div>
  );
};

export default TermsAndConditions;
