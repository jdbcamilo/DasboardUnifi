# GameRent - Dashboard de Alquiler de Consolas

Sistema de gestión y dashboard para el alquiler de consolas de videojuegos.

## 👥 Diseñadores

**Diseñado por:**
- Juan Camilo Diaz
- Natalia Sofia Durango

## 📋 Descripción

GameRent es una aplicación web de tipo dashboard que permite gestionar un sistema de alquiler de consolas de videojuegos. El sistema incluye funcionalidades CRUD (Crear, Leer, Actualizar, Eliminar) para la administración de consolas, clientes y juegos, con una interfaz moderna y responsiva.

## ✨ Características

- 📊 Dashboard interactivo con estadísticas en tiempo real
- 🎮 Gestión completa de consolas (CRUD)
- 👥 Administración de clientes
- 🎯 Seguimiento de alquileres activos
- 📈 Gráficas de rendimiento y popularidad
- 🌓 Modo claro/oscuro
- 📱 Diseño totalmente responsivo
- 🔄 Integración con MockAPI para persistencia de datos

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura de la aplicación
- **CSS3** - Estilos personalizados
- **TailwindCSS** - Framework CSS para diseño responsivo
- **JavaScript (Vanilla)** - Lógica de la aplicación
- **MockAPI** - Backend simulado para operaciones CRUD
- **Font Awesome** - Iconografía

## 🚀 Configuración de MockAPI

Para que la aplicación funcione correctamente, es necesario configurar MockAPI como backend. Sigue estos pasos:

### Paso 1: Crear una cuenta en MockAPI

1. Visita [https://mockapi.io](https://mockapi.io)
2. Crea una cuenta gratuita o inicia sesión

### Paso 2: Crear un nuevo proyecto

1. En el dashboard de MockAPI, haz clic en "New Project"
2. Asigna un nombre a tu proyecto (ej: "GameRent")
3. MockAPI generará una URL base para tu proyecto

### Paso 3: Crear los recursos (endpoints)

Crea los siguientes recursos en tu proyecto de MockAPI:

#### Recurso: `consolas`

Campos requeridos:
```json
{
  "nombre": "string",
  "modelo": "string",
  "estado": "string",
  "precioDia": "number"
}
```

**Ejemplo de datos:**
```json
{
  "id": "1",
  "nombre": "PlayStation 5",
  "modelo": "PS5 Standard",
  "estado": "Disponible",
  "precioDia": 15000
}
```

#### Recurso: `clientes`

Campos requeridos:
```json
{
  "nombre": "string",
  "email": "string",
  "telefono": "string",
  "direccion": "string"
}
```

#### Recurso: `juegos`

Campos requeridos:
```json
{
  "nombre": "string",
  "categoria": "string",
  "plataforma": "string",
  "estado": "string"
}
```

### Paso 4: Configurar la URL en la aplicación

1. Abre el archivo `api.js`
2. Localiza la línea que contiene `API_BASE_URL`
3. Reemplaza la URL con la URL de tu proyecto de MockAPI:

```javascript
const API_BASE_URL = 'https://[TU-PROYECTO-ID].mockapi.io/api/v1';
```

**Ejemplo:**
```javascript
const API_BASE_URL = 'https://673667d5aafa2ef222309a0d.mockapi.io/api/v1';
```

### Paso 5: Verificar la configuración

1. Abre la aplicación en tu navegador
2. Los datos deberían cargarse desde MockAPI
3. Puedes crear, editar y eliminar registros que se sincronizarán con MockAPI

## 📦 Instalación

1. Clona este repositorio:
```bash
git clone https://github.com/jdbcamilo/DasboardUnifi.git
```

2. Navega al directorio del proyecto:
```bash
cd DasboardUnifi
```

3. Configura MockAPI siguiendo los pasos anteriores

4. Abre el archivo `index.html` en tu navegador:
```bash
# Puedes usar un servidor local simple
python -m http.server 8000
# o
npx serve
```

5. Accede a la aplicación en: `http://localhost:8000`

## 💻 Uso

### Dashboard Principal

El dashboard muestra:
- Estadísticas generales (consolas totales, alquiladas, clientes activos)
- Gráficas de alquileres por consola
- Distribución de estados de consolas
- Ingresos mensuales
- Juegos más populares
- Tabla de alquileres activos

### Gestión de Consolas

1. Haz clic en "Consolas" en la barra lateral
2. Para agregar una nueva consola:
   - Haz clic en "Nueva Consola"
   - Completa el formulario
   - Haz clic en "Crear Consola"
3. Para editar una consola existente:
   - Haz clic en el icono de edición (✏️)
   - Modifica los campos necesarios
   - Haz clic en "Actualizar Consola"
4. Para eliminar una consola:
   - Haz clic en el icono de eliminar (🗑️)
   - Confirma la acción

### Cambiar Tema

Utiliza el switch en la esquina superior derecha para alternar entre modo claro y oscuro.

## 📁 Estructura del Proyecto

```
DasboardUnifi/
├── index.html          # Página principal y estructura HTML
├── api.js              # Servicio de integración con MockAPI
├── app.js              # Lógica de la aplicación y manejo del DOM
├── crud.js             # Gestores de CRUD y modales
└── README.md           # Este archivo
```

## 🔧 Configuración Avanzada

### Personalizar la URL de MockAPI

Si necesitas cambiar la URL base de MockAPI, edita el archivo `api.js`:

```javascript
const API_BASE_URL = 'https://tu-nuevo-proyecto.mockapi.io/api/v1';
```

### Agregar nuevos endpoints

Para agregar nuevos recursos:

1. Crea el endpoint en MockAPI
2. Crea una nueva instancia del servicio en `api.js`:
```javascript
const nuevoRecursoAPI = new APIService('nombreDelRecurso');
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/NuevaCaracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request

## 📝 Notas Importantes

- La aplicación utiliza MockAPI como backend, por lo que requiere conexión a internet
- MockAPI tiene límites en su plan gratuito (100 recursos por proyecto)
- Los datos en MockAPI se mantienen persistentes entre sesiones
- El tema (claro/oscuro) se guarda en localStorage del navegador

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 📞 Contacto

Para preguntas o sugerencias, contacta a los diseñadores:
- Juan Camilo Diaz
- Natalia Sofia Durango

---

**GameRent Dashboard** - Sistema de alquiler de consolas © 2023
