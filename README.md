# 🌍 La Trivia Media - Quiz de la Tierra Media

Un juego de trivia interactivo sobre el universo de la Tierra Media (El Señor de los Anillos y El Hobbit), desarrollado con React y Tailwind CSS.

[![Demo en Vivo](https://img.shields.io/badge/Demo-En%20Vivo-green?style=for-the-badge)](https://cloirdev.github.io/la-trivia-media/)
[![React](https://img.shields.io/badge/React-19.1-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.1-purple?style=for-the-badge&logo=vite)](https://vitejs.dev/)

## 📋 Descripción

La Trivia Media es un juego de preguntas y respuestas temático sobre el universo creado por J.R.R. Tolkien. Pon a prueba tus conocimientos sobre personajes, lugares, eventos y detalles de las historias de la Tierra Media con dos modos de juego diferentes.

## ✨ Características

### 🎮 Modos de Juego
- **Modo Quiz**: 10 preguntas aleatorias de opción múltiple
- **Modo Rosco**: Estilo "Pasapalabra" con preguntas para cada letra del alfabeto

### 🏆 Sistema de Puntuación
- Sistema de puntos por respuestas correctas
- Tabla de clasificación (Top 10)
- Guardado automático de puntuaciones en localStorage
- Historial de partidas con fecha y modo de juego

### 🎨 Diseño
- Interfaz temática inspirada en la Tierra Media
- Landing page animada con efectos visuales
- Fondos rotatorios con transiciones suaves
- Diseño completamente responsive
- Efectos de glassmorphism y blur

### ⚙️ Funcionalidades
- Sistema de login con persistencia de usuario
- Preguntas aleatorias en modo Quiz
- Progreso visual en ambos modos
- Pantalla de resultados detallada
- Opción de "pasar" preguntas en modo Rosco
- Reinicio de partida y cambio de modo

## 🛠️ Tecnologías Utilizadas

- **React 19.1** - Biblioteca de UI
- **Vite 7.1** - Build tool y dev server
- **Tailwind CSS 4.1** - Framework de estilos utility-first
- **LocalStorage API** - Persistencia de datos
- **React Hooks** - Estado y efectos
- **SWC** - Compilador rápido para React

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 18 o superior
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/cloirdev/la-trivia-media.git

# Navegar al directorio
cd la-trivia-media

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Producción
npm run build        # Crea el build de producción
npm run preview      # Previsualiza el build localmente

# Deploy
npm run deploy       # Despliega a GitHub Pages

# Calidad de código
npm run lint         # Ejecuta ESLint
```

## 🎯 Cómo Jugar

### Inicio
1. Introduce tu nombre de usuario (se guarda automáticamente)
2. Selecciona un modo de juego

### Modo Quiz
1. Responde 10 preguntas de opción múltiple
2. Cada respuesta correcta suma puntos
3. Al finalizar, ve tu puntuación y posición en el ranking

### Modo Rosco
1. Responde preguntas para cada letra del alfabeto
2. Puedes "pasar" preguntas y volver a ellas después
3. Completa el mayor número de preguntas posibles
4. El juego termina cuando todas las preguntas estén respondidas

## 📂 Estructura del Proyecto

```
la-trivia-media/
├── public/
│   ├── images/          # Imágenes de fondo
│   └── favicon.svg      # Icono de la aplicación
├── src/
│   ├── components/      # Componentes de React
│   │   ├── LandingPage.jsx
│   │   ├── LoginScreen.jsx
│   │   ├── Quiz.jsx
│   │   ├── Rosco.jsx
│   │   ├── ResultsScreen.jsx
│   │   ├── Scoreboard.jsx
│   │   └── StartScreen.jsx
│   ├── data/
│   │   ├── questions.json   # Preguntas para modo Quiz
│   │   └── rosco.json       # Preguntas para modo Rosco
│   ├── App.jsx          # Componente principal
│   ├── App.css          # Estilos personalizados
│   └── main.jsx         # Punto de entrada
├── index.html
├── package.json
└── vite.config.js
```

## 🎨 Personalización

### Añadir Preguntas

**Para el Modo Quiz** - Edita `src/data/questions.json`:

```json
{
  "question": "¿Cuál es el nombre élfico de Gandalf?",
  "options": [
    "Mithrandir",
    "Olórin",
    "Incanus",
    "Tharkûn"
  ],
  "answer": "Olórin"
}
```

**Para el Modo Rosco** - Edita `src/data/rosco.json`:

```json
{
  "letter": "A",
  "question": "Contiene la A: Reino de los hombres del oeste",
  "answer": "Arnor"
}
```

### Cambiar Imágenes de Fondo

Reemplaza las imágenes en `public/images/` manteniendo los nombres:
- `bg1.jpg`
- `bg2.jpg`
- `bg3.jpg`
- `bg4.jpg`

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👤 Autor

**cloirdev**

- GitHub: [@cloirdev](https://github.com/cloirdev)

## 🙏 Agradecimientos

- Inspirado en el universo de J.R.R. Tolkien
- Preguntas basadas en "El Señor de los Anillos" y "El Hobbit"
- Diseño inspirado en la estética de la Tierra Media
- Comunidad de React y Tailwind CSS

## ⚠️ Nota Legal

Este es un proyecto fan-made no oficial. Todos los derechos de "El Señor de los Anillos" y "El Hobbit" pertenecen a Tolkien Estate y sus licenciatarios.

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!

🎮 [Juega ahora](https://cloirdev.github.io/la-trivia-media/)
