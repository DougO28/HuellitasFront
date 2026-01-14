

# 📡 API - Patitas en Acción 🐾

## 🔐 Autenticación

### 🟢 POST `/api/auth/registro/`  
Registrar un nuevo usuario.

```json
{
  "username": "juan123",
  "email": "juan@email.com",
  "password": "password123",
  "nombre": "Juan Pérez",
  "rol": "adoptante"
}
```
### POST /api/auth/login/
inicar sesion

```json
{
  "Username": "JUAN123",
  "password": "pasword"
}
```
### 🔴 POST /api/auth/logout/
Cerrar sesión.

### Mascotas

## 🔵 GET /api/mascotas/

Obtener lista de mascotas disponibles

```json
{
  "count": 10,
  "results": [
    {
      "id": 1,
      "nombre": "Max",
      "edad_aproximada": "2 años",
      "genero": "Macho",
      "raza": "Mestizo",
      "tamaño": "Mediano",
      "descripcion": "Perro muy juguetón...",
      "estado": "Disponible",
      "foto_url": "https://...",
      "fecha_ingreso": "2024-01-15"
    }
  ]
}
```
Filtros disponibles:
?estado=Disponible

?genero=Macho

?tamaño=Mediano

?search=labrador (buscar por nombre o raza)

# 🔵 GET /api/mascotas/{id}/
Obtener detalle de una mascota específica.
# 🟢 POST /api/mascotas/ (Solo admin)
Agregar una nueva mascota.
# 🟡 PUT /api/mascotas/{id}/ (Solo admin)
Actualizar información de una mascota.
# 🔴 DELETE /api/mascotas/{id}/ (Solo admin)
Eliminar una mascota.

### 📰 Noticias e Historias de Éxito
#🔵 GET /api/noticias/

```json
{
  "count": 5,
  "results": [
    {
      "id": 1,
      "titulo": "¡Nueva camada de cachorros!",
      "contenido": "Hemos recibido...",
      "tipo": "noticia",
      "fecha_publicacion": "2024-08-04T10:30:00Z",
      "imagen_url": "https://...",
      "usuario_autor": "María Voluntaria"
    }
  ]
}
```
🔎 Filtros:
?tipo=noticia
?tipo=historia

# 🔵 GET /api/noticias/{id}/
Detalle de una noticia/historia.
# 🟢 POST /api/noticias/ (Solo admin o voluntario)
Crear una nueva noticia o historia.

### 📄 Solicitudes de Adopción
# 🔵 GET /api/solicitudes/ (Solo usuario autenticado)
crear solicitudes propias
```json
{
  "count": 2,
  "results": [
    {
      "id": 1,
      "mascota": {
        "id": 1,
        "nombre": "Max",
        "foto_url": "https://..."
      },
      "fecha_solicitud": "2024-08-01T14:20:00Z",
      "estado_solicitud": "Pendiente",
      "comentarios": "Tengo experiencia con perros..."
    }
  ]
}
```

# 🟢 POST /api/solicitudes/
Crear nueva solicitud de adopcion

```json
{
  "mascota": 1,
  "comentarios": "Me encantaría adoptar a Max porque..."
}
```
# 🔵 GET /api/solicitudes/admin/ (Solo admin/voluntario)
ver todas las solicitudes para revision

# 🟡 PUT /api/solicitudes/{id}/ (Solo admin/voluntario)
actualizar estado de solicitud

```json
{
  "estado_solicitud": "Aprobada",
  "comentarios": "Solicitud aprobada. Contactar al adoptante."
}
```

### 📬 Contacto

# 🟢 POST /api/contacto/
enviar un mensaje de contacto

```json
{
  "nombre": "Ana García",
  "correo": "ana@email.com",
  "mensaje": "Quisiera información sobre adopciones..."
}
```

# 🔵 GET /api/contacto/ (Solo admin)
ver mensajes de contacto recibidos

### 👥 Usuarios (Solo admin)
# 🔵 GET /api/usuarios/
Listar usuarios registrados.

# 🟡 PUT /api/usuarios/{id}/
Actualizar rol de un usuario.

### ESTADOS HTTP

| Código | Significado                                |
| ------ | ------------------------------------------ |
| `200`  | OK - Éxito                                 |
| `201`  | Created - Recurso creado                   |
| `400`  | Bad Request - Datos inválidos              |
| `401`  | Unauthorized - No autenticado              |
| `403`  | Forbidden - Sin permisos                   |
| `404`  | Not Found - Recurso no encontrado          |
| `500`  | Internal Server Error - Error del servidor |


### 🔒 Permisos
Roles de usuario:
adoptante:

Ver mascotas

Crear solicitudes de adopción

Enviar mensajes de contacto

admin:

Acceso completo al sistema

Gestionar mascotas

Revisar solicitudes

Publicar noticias

# 🚪 Endpoints públicos (no requieren autenticación):
GET /api/mascotas/

GET /api/mascotas/{id}/

GET /api/noticias/


# 🗂️ Recomendaciones
Usar tokens o JWT para autenticación.

Validar datos antes de enviarlos desde frontend.

Mantener esta documentación actualizada para evitar confusiones entre backend y frontend.
