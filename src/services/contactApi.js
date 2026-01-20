import API_BASE_URL from '../config';

export async function sendContactMessage(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/contact/messages/`, {
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
      const errorText = await response.text();
      throw new Error(errorText);
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending contact message:', error);
    throw error;
  }
}