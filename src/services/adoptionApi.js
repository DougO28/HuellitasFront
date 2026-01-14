import API_BASE_URL from '../config';

/**
 * Enviar solicitud simplificada de adopción
 * @param {FormData} formData - Datos del formulario con el PDF
 */
export async function submitSimplifiedAdoption(formData) {
  try {
    const response = await fetch(`${API_BASE_URL}/adoptions/simplified/`, {
      method: 'POST',
      body: formData, // Enviar FormData directamente (NO usar JSON para archivos)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(JSON.stringify(error));
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting adoption request:', error);
    throw error;
  }
}

/**
 * Descargar formulario de adopción en blanco
 */
export async function downloadAdoptionForm() {
  try {
    const response = await fetch(`${API_BASE_URL}/adoptions/download-form/`);
    
    if (!response.ok) {
      throw new Error('Error al descargar el formulario');
    }
    
    // Crear blob del PDF
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    
    // Crear enlace temporal y hacer clic
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Formulario_Adopcion_Huellitas.pdf';
    document.body.appendChild(link);
    link.click();
    
    // Limpiar
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    return { success: true };
  } catch (error) {
    console.error('Error downloading form:', error);
    throw error;
  }
}