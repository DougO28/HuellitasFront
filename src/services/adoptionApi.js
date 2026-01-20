import API_BASE_URL from '../config';

/**
 * Enviar solicitud simplificada de adopción
 * @param {FormData} formData - Datos del formulario con el PDF
 */
export async function submitSimplifiedAdoption(formData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/adoptions/simplified/`, {
      method: 'POST',
      body: formData,
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

export async function downloadAdoptionForm() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/adoptions/download-form/`);
    
    if (!response.ok) {
      throw new Error('Error al descargar el formulario');
    }
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Formulario_Adopcion_Huellitas.pdf';
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    return { success: true };
  } catch (error) {
    console.error('Error downloading form:', error);
    throw error;
  }
}