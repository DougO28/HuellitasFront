import API_BASE_URL from '../config';

/**
 * Adaptar datos del backend al formato que espera el frontend
 */
function adaptPetData(backendPet) {
  // Construir URL completa de la imagen
  const foto = backendPet.main_image 
    || 'https://img.freepik.com/foto-gratis/perro-pug-aislado-sobre-fondo-blanco_2829-11416.jpg?semt=ais_hybrid&w=740&q=80';

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

export async function fetchDogs(params = {}) {
  const { q = "", disponible, energia, tamanio, page = 1, pageSize = 12 } = params;
  
  const queryParams = new URLSearchParams();
  
  if (q) queryParams.append('search', q);
  if (typeof disponible === "boolean") {
    if (disponible) queryParams.append('status', 'available');
  }
  if (energia) queryParams.append('energy_level', energia);
  if (tamanio) queryParams.append('size', tamanio);
  queryParams.append('page', page);
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/pets/?${queryParams.toString()}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    const backendData = result.results || result;
    
    const adaptedData = backendData.map(adaptPetData);
    
    return {
      data: adaptedData,
      total: result.count || adaptedData.length,
      page: page,
      pageSize: pageSize,
      totalPages: Math.ceil((result.count || adaptedData.length) / pageSize)
    };
  } catch (error) {
    console.error('Error fetching dogs:', error);
    return { data: [], total: 0, page: 1, pageSize: 12, totalPages: 1 };
  }
}

export async function fetchDogById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/pets/${id}/`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const backendData = await response.json();
    const adaptedData = adaptPetData(backendData);
    
    return { data: adaptedData };
  } catch (error) {
    console.error('Error fetching dog by id:', error);
    return { data: null };
  }
}

export async function fetchAvailableDogs() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/pets/available/`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    const backendData = Array.isArray(result) ? result : (result.results || []);
    const adaptedData = backendData.map(adaptPetData);
    
    return { data: adaptedData };
  } catch (error) {
    console.error('Error fetching available dogs:', error);
    return { data: [] };
  }
}