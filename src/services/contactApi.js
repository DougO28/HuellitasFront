import API_BASE_URL from '../config';

/**
 * Enviar mensaje de contacto
 * @param {Object} data - Datos del formulario
 */
export async function sendContactMessage(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/contact/messages/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        subject: data.subject || 'general',
        message: data.message
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(JSON.stringify(error));
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error sending contact message:', error);
    throw error;
  }
}