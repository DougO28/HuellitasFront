import API_BASE_URL from '../config';

/**
 * Adaptar datos de noticia del backend al formato del frontend
 */
function adaptNewsData(backendNews) {
  // Construir URL completa de la imagen
  const baseURL = 'https://huellitasadmin.onrender.com';
  
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

export async function fetchNews() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/content/news/`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    const backendData = result.results || result;
    const adaptedData = backendData.map(adaptNewsData);
    
    return { data: adaptedData };
  } catch (error) {
    console.error('Error fetching news:', error);
    return { data: [] };
  }
}

export async function fetchNewsById(idOrSlug) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/content/news/${idOrSlug}/`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const backendData = await response.json();
    const adaptedData = adaptNewsData(backendData);
    
    return { data: adaptedData };
  } catch (error) {
    console.error('Error fetching news by id:', error);
    return { data: null };
  }
}

export async function fetchFeaturedNews() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/content/news/featured/`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    const adaptedData = result.map(adaptNewsData);
    
    return { data: adaptedData };
  } catch (error) {
    console.error('Error fetching featured news:', error);
    return { data: [] };
  }
}