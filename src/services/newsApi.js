import API_BASE_URL from '../config';

/**
 * Adaptar datos de noticia del backend al formato del frontend
 */
function adaptNewsData(backendNews) {
  // Construir URL completa de la imagen
  const baseURL = 'http://localhost:8000';
  
  // CAMBIO: Verificar si la URL ya es completa
  let imagen;
  if (backendNews.featured_image) {
    // Si la URL ya incluye http, usarla tal cual
    if (backendNews.featured_image.startsWith('http')) {
      imagen = backendNews.featured_image;
    } else {
      // Si no, agregar el baseURL
      imagen = `${baseURL}${backendNews.featured_image}`;
    }
  } else {
    imagen = 'https://via.placeholder.com/800x400?text=Sin+Imagen';
  }

  return {
    id: backendNews.id.toString(),
    titulo: backendNews.title,
    slug: backendNews.slug,
    resumen: backendNews.summary,
    contenido: backendNews.content,
    imagen: imagen,
    fecha: backendNews.published_date,
    autor: backendNews.author_name || 'Huellitas',
    destacado: backendNews.is_featured
  };
}

/**
 * Obtener todas las noticias
 */
export async function fetchNews() {
  try {
    const response = await fetch(`${API_BASE_URL}/content/news/`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    // El backend puede devolver paginación o array directo
    const backendData = result.results || result;
    
    // Adaptar los datos
    const adaptedData = backendData.map(adaptNewsData);
    
    return { data: adaptedData };
  } catch (error) {
    console.error('Error fetching news:', error);
    return { data: [] };
  }
}

/**
 * Obtener noticia por ID o slug
 */
export async function fetchNewsById(idOrSlug) {
  try {
    // Intentar por ID primero, luego por slug
    let response = await fetch(`${API_BASE_URL}/content/news/${idOrSlug}/`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const backendData = await response.json();
    
    // Adaptar al formato del frontend
    const adaptedData = adaptNewsData(backendData);
    
    return { data: adaptedData };
  } catch (error) {
    console.error('Error fetching news by id:', error);
    return { data: null };
  }
}

/**
 * Obtener noticias destacadas
 */
export async function fetchFeaturedNews() {
  try {
    const response = await fetch(`${API_BASE_URL}/content/news/featured/`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    // Adaptar los datos
    const adaptedData = result.map(adaptNewsData);
    
    return { data: adaptedData };
  } catch (error) {
    console.error('Error fetching featured news:', error);
    return { data: [] };
  }
}