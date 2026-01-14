import API_BASE_URL from '../config';

/**
 * Adaptar datos de historia de éxito del backend al formato de testimonios del frontend
 */
function adaptTestimonialData(backendStory) {
  // Construir URL completa de la imagen
  const baseURL = 'http://localhost:8000';
  let imagen;
  
  if (backendStory.after_image) {
    // Usar after_image como imagen principal
    if (backendStory.after_image.startsWith('http')) {
      imagen = backendStory.after_image;
    } else {
      imagen = `${baseURL}${backendStory.after_image}`;
    }
  } else if (backendStory.imagen) {
    // Fallback al campo imagen del serializer
    imagen = backendStory.imagen;
  } else {
    imagen = 'https://images.pexels.com/photos/9429166/pexels-photo-9429166.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';
  }

  return {
    id: backendStory.id.toString(),
    imagen: imagen,
    titulo: backendStory.title,
    descripcion: backendStory.story,
    nombreAdoptante: backendStory.adopter_name,
    nombreMascota: backendStory.pet_name
  };
}

/**
 * Obtener todos los testimonios (historias de éxito)
 */
export async function fetchTestimonials() {
  try {
    const response = await fetch(`${API_BASE_URL}/content/success-stories/`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    // El backend puede devolver paginación o array directo
    const backendData = result.results || result;
    
    // Adaptar los datos
    const adaptedData = backendData.map(adaptTestimonialData);
    
    return { data: adaptedData };
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return { data: [] };
  }
}

/**
 * Obtener testimonios destacados
 */
export async function fetchFeaturedTestimonials() {
  try {
    const response = await fetch(`${API_BASE_URL}/content/success-stories/featured/`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    // Adaptar los datos
    const adaptedData = result.map(adaptTestimonialData);
    
    return { data: adaptedData };
  } catch (error) {
    console.error('Error fetching featured testimonials:', error);
    return { data: [] };
  }
}