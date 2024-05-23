# Disruptive Multimedia Frontend  

Frontend app para prueba técnica Disruptive Studio 

# Tabla de contenido

- [Disruptive Multimedia Frontend](#disruptive-multimedia-frontend)
- [Tabla de contenido](#tabla-de-contenido)
- [Stack y dependencias](#stack-y-dependencias)
- [Estructura de Archivos](#estructura-de-archivos)
  - [App Router](#app-router)
  - [components](#components)
    - [form](#form)
    - [ui](#ui)
  - [Datasource](#datasource)
  - [lib](#lib)
  - [Como Correr App](#como-correr-app)
  - [Next Steps](#next-steps)

# Stack y dependencias

El stack para el frontend involucra principalmente las siguientes dependencias:
  - [NextJs](https://nextjs.org/)
  - [Tailwind](https://tailwindcss.com/) sistema de estilos
  - [ShadCN](https://ui.shadcn.com/) Libreria de componentes
  - [React Hook Form](https://react-hook-form.com/) Manejo de formularios
  - [Tanstack Query](https://tanstack.com/query/latest) Manejo de estados Asíncronos
   
# Estructura de Archivos

La estructura de archivos está pensada para mantener cierto balance entre modularidad y verbosidad entre el proyecto

## App Router
Se está utilizando el app router de NextJs para las rutas, cada ruta tiene sus propios componentes y modelos, esto para permitir la fácil modificación de un solo modulo sin afectar la integridad del proyecto

## components

Componentes compartidos entre diferentes rutas, también wrappers de componentes para permitir integraciones con librerias

### form 

Componente de formulario, es un componente que dado un JSON genera un formulario, esto me permite crear formularios desde los modelos sin esfuerzo, está construido sobre React-hook-form y componentes controlados

### ui

Componentes de ShadCN, generalmente son componentes generados

## Datasource

Datasource representa toda la fuente de información, aquí están los archivos de todas las peticiones realizadas al Backend y servicios

## lib

Utilidades, también se intento dejar bases para INTL, escribiendo todas las cadenas de texto en un archivo, sin embargo, por falta de tiempo no fue posible mantener el patrón

## Como Correr App

- Ejecuter `npm install`, luego `npm run`.

## Next Steps

- No se manejaron las Busquedas
- No se pudo realizar pruebas
- Implementar un RouterGuard para proteger las rutas
- Faltaron componentes de actualización y eliminación en la mayoría de entidades
- No se implementó el webSocket para manejar las listas de los contenidos
- Proteger los tipos de archivos en input
