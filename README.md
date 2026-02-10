# VenciTrack

Sistema de gestión de vencimientos y documentos con arquitectura segregada.

## 🏗️ Arquitectura Limpia (Separation of Concerns)

El sistema ha sido migrado a una arquitectura de contenedores especializados para garantizar escalabilidad y seguridad:

1.  **Frontend (`vencitrack-frontend`)**:
    *   Contenedor puro de UI (Next.js Standalone).
    *   **Sin acceso a Base de Datos**.
    *   Se comunica exclusivamente con el Backend vía API interna.
    *   Puerto: `3004`

2.  **Backend Logic (`vencitrack-backend`)**:
    *   Contenedor de Lógica de Negocio y Seguridad.
    *   Maneja autenticación, conexión a BD y transacciones.
    *   Puerto: `3003` (Interno `3001`)

3.  **Data Storage (`vencitrack-db`)**:
    *   PostgreSQL 15 optimizado.
    *   Persistencia de volumen aislado.

## 🚀 Despliegue con Docker (Producción)

1.  Generar secretos de producción:
    ```bash
    cp .env.example .env
    node scripts/generate-secret.js
    ```

2.  Levantar infraestructura:
    ```bash
    docker-compose up --build -d
    ```

3.  Acceso:
    *   **Frontend**: `http://localhost:3004`
    *   **API (Directo)**: `http://localhost:3003`

## 🛠️ Desarrollo

El proyecto mantiene una estructura unificada de código (Monorepo) para facilitar el desarrollo, pero se despliega segregado.

*   `src/app`: Componentes de UI y Páginas.
*   `src/server`: Lógica de negocio y consultas seguras.
*   `prisma`: Esquema de datos.

## 🛡️ Configuración
Las integraciones externas (SMTP, Analytics) se gestionan desde el Panel de Administración.
