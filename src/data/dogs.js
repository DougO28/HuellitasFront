import API_BASE_URL from '../config';

/**
 * Adaptar datos del backend al formato que espera el frontend
 */
function adaptPetData(backendPet) {
  // Construir URL completa de la imagen
  const baseURL = 'http://localhost:8000';
  const foto = backendPet.main_image 
    ? `${baseURL}${backendPet.main_image}`
    : 'https://img.freepik.com/foto-gratis/perro-pug-aislado-sobre-fondo-blanco_2829-11416.jpg?semt=ais_hybrid&w=740&q=80';

  return {
    id: backendPet.id.toString(),
    nombre: backendPet.name,
    edad_anios: backendPet.age_years || 0,
    raza: backendPet.breed || 'Mestizo',
    sexo: backendPet.gender_display || backendPet.gender,
    foto: foto,
    descripcion: backendPet.description || 'Sin descripción',
    disponible: backendPet.status === 'available',
    amigable_ninos: backendPet.friendly_with_kids || false,
    adapta_interior: backendPet.adapts_to_indoor_living || false,
    nivel_energia: backendPet.energy_level || 'medio',
    tamanio: backendPet.size || 'mediano'
  };
}

/**
 * Obtener todas las mascotas con filtros
 */
export async function fetchDogs(params = {}) {
  const { q = "", disponible, energia, tamanio, page = 1, pageSize = 12 } = params;
  
  // Construir query string
  const queryParams = new URLSearchParams();
  
  if (q) queryParams.append('search', q);
  if (typeof disponible === "boolean") {
    if (disponible) queryParams.append('status', 'available');
  }
  if (energia) queryParams.append('energy_level', energia);
  if (tamanio) queryParams.append('size', tamanio);
  
  try {
    const response = await fetch(`${API_BASE_URL}/pets/?${queryParams.toString()}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    // Adaptar los datos al formato del frontend
    const adaptedData = result.map(adaptPetData);
    
    // Filtrar por página
    const total = adaptedData.length;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    
    return {
      data: adaptedData.slice(start, end),
      total: total,
      page: page,
      pageSize: pageSize,
      totalPages: Math.ceil(total / pageSize)
    };
  } catch (error) {
    console.error('Error fetching dogs:', error);
    return { data: [], total: 0, page: 1, pageSize: 12, totalPages: 1 };
  }
}

/**
 * Obtener detalle de una mascota por ID
 */
export async function fetchDogById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/pets/${id}/`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const backendData = await response.json();
    
    // Adaptar al formato del frontend
    const adaptedData = adaptPetData(backendData);
    
    return { data: adaptedData };
  } catch (error) {
    console.error('Error fetching dog by id:', error);
    return { data: null };
  }
}

/**
 * Obtener solo mascotas disponibles
 */
export async function fetchAvailableDogs() {
  try {
    const response = await fetch(`${API_BASE_URL}/pets/available/`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    // Adaptar los datos
    const adaptedData = result.map(adaptPetData);
    
    return { data: adaptedData };
  } catch (error) {
    console.error('Error fetching available dogs:', error);
    return { data: [] };
  }
}