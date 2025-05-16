import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatbotService {
  getBotResponse(message: string): string {
    const clean = message
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[¿?.,!]/g, '')
      .trim();

    // 👉 Opción directa: "Otros"
    if (clean === 'otros' || clean === 'otra pregunta') {
      return 'Puedes escribirnos a ayuda@mentorhub.edu.do para soporte técnico.';
    }

    // Autenticación
    if (clean.includes('registro') || clean.includes('registrarme') || clean.includes('registrar'))
      return 'Para registrarte, ve al menú principal y haz clic en "Registrarse". Completa el formulario y confirma tu correo.';
    
    if (clean.includes('iniciar sesion') || clean.includes('login'))
      return 'Para iniciar sesión, usa tu email y contraseña o accede con tu cuenta de Google.';

    if (clean.includes('olvide') && clean.includes('contrasena'))
      return 'Haz clic en "¿Olvidaste tu contraseña?" en la pantalla de login y sigue los pasos para recuperarla.';

    // Clases
    if (clean.includes('inscribir') || clean.includes('unirme a una clase'))
      return 'Puedes inscribirte desde la sección "Clases Disponibles". Solo haz clic en "Unirse".';

    if (clean.includes('crear clase'))
      return 'Si eres profesor, puedes crear una clase desde tu dashboard haciendo clic en "Nueva Clase".';

    // Tareas
    if (clean.includes('subir tarea'))
      return 'Ve al módulo "Tareas", selecciona la tarea correspondiente y haz clic en "Subir Entrega".';

    if (clean.includes('ver calificaciones'))
      return 'Tus calificaciones están en tu panel de usuario bajo la sección "Mis Entregas".';

    // Pagos
    if (clean.includes('cuesta') || clean.includes('precio') || clean.includes('pagar'))
      return 'La suscripción premium cuesta $5/mes para estudiantes. Profesores pagan $20/mes.';

    if (clean.includes('que incluye') || clean.includes('premium'))
      return 'El plan premium incluye acceso a clases avanzadas, materiales exclusivos y soporte personalizado.';

    // Problemas generales
    if (clean.includes('no carga') || clean.includes('problema') || clean.includes('ayuda'))
      return 'Lo sentimos. Puedes escribirnos a ayuda@mentorhub.edu.do para soporte técnico.';

    // Respuesta por defecto
    return 'Lo siento, no tengo una respuesta para esa pregunta aún. Por favor, escribe a ayuda@mentorhub.edu.do 📬';
  }
}
