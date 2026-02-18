# VenciTrack

Sistema de gestión de vencimientos y documentos críticos con arquitectura segregada y despliegue contenerizado.

![Version](https://img.shields.io/badge/version-1.1.0-blue.svg) ![Build Status](https://img.shields.io/badge/build-passing-brightgreen)

## 🏗️ Arquitectura del Sistema

El proyecto opera bajo una arquitectura de microservicios simplificada (Monorepo), separando claramente las responsabilidades:

| Servicio | Tecnología | Puerto (Host) | Puerto (Contenedor) | Descripción |
| :--- | :--- | :--- | :--- | :--- |
| **Frontend** | React 18 + Vite | `3006` | `80` | Interfaz de usuario (SPA) servida por Nginx. |
| **Backend** | Next.js 16 | `3007` | `3000` | API REST, Autenticación y Lógica de Negocio. |
| **Database** | PostgreSQL 15 | `5435` | `5432` | Persistencia de datos relacional. |

## 🚀 Despliegue (Producción con Docker)

El método recomendado de despliegue es mediante Docker Compose, garantizando un entorno consistente.

1.  **Configurar Entorno**:
    ```bash
    cp .env.example .env
    # Editar .env con credenciales seguras
    ```

2.  **Iniciar Servicios**:
    ```bash
    docker-compose up -d --build
    ```

3.  **Acceso**:
    *   **Dashboard**: [http://localhost:3006](http://localhost:3006)
    *   **API Health**: [http://localhost:3007/api/health](http://localhost:3007/api/health)

## 🛠️ Desarrollo Local

Para desarrollo, se recomienda usar Docker para la base de datos y correr los servicios de aplicación localmente para tener *hot-reload*.

### Prerrequisitos
*   Node.js 20+
*   Docker & Docker Compose

### Instalación
1.  Instalar dependencias raíz y subsistemas:
    ```bash
    npm install --legacy-peer-deps
    cd api && npm install --legacy-peer-deps
    cd ../client && npm install --legacy-peer-deps
    ```

2.  Levantar Base de Datos:
    ```bash
    docker-compose up -d db
    ```

3.  Iniciar Entorno de Desarrollo (Híbrido):
    ```bash
    # En la raíz, corre Backend (3007) y Frontend (3006) concurrentemente
    npm run dev
    ```

## 📂 Estructura del Proyecto

```bash
VenciTrack/
├── api/                 # Backend (Next.js App Router)
├── client/              # Frontend (Vite + React)
├── prisma/              # Schema de Base de Datos (Compartido)
├── scripts/             # Utilidades de mantenimiento
├── docker-compose.yml   # Orquestación de servicios
└── nginx.conf           # Configuración de servidor web (Frontend)
```

## 🔒 Auditoría y Calidad

El proyecto incluye pipelines de verificación automática:
*   **CI/CD**: `.github/workflows/ci.yml` verifica la compilación en cada push.
*   **Linting**: `npm run lint` (Frontend & Backend).
*   **Seguridad**: Validación estricta de variables de entorno en producción.

---
© 2026 VenciTrack - Documentación Técnica
