# Definición de Puertos del Proyecto

Este archivo actúa como la **Única Fuente de Verdad** para los puertos del proyecto.
Todos los entornos (Desarrollo y Docker) deben respetar estrictamente estos valores para evitar conflictos con otras aplicaciones.

## Tabla de Puertos Asignados

| Servicio | Puerto Host (Local) | Puerto Docker (Interno) | Descripción |
| :--- | :--- | :--- | :--- |
| **Frontend (Cliente)** | **3006** | 80 | Vite / Nginx Static Server |
| **Backend (API)** | **3007** | 3000 | Next.js API Server |
| **Base de Datos** | **5435** | 5432 | PostgreSQL (Puerto no estándar para evitar conflictos) |
| **Prisma Studio** | **5556** | 5555 | GUI de Base de Datos |

## Reglas de Implementación

1.  **NO usar puertos dinámicos**: Si el puerto 3006 está ocupado, el servidor debe fallar y notificar, no buscar otro puerto. Esto evita "zombis".
2.  **Exclusividad**: Estos puertos (3006, 3007, 5435) están reservados exclusivamente para VenciTrack.
3.  **Configuración**:
    *   `client/vite.config.ts`: Debe forzar el puerto 3006.
    *   `package.json`: Los scripts de dev deben usar `-p 3007` para la API.
    *   `docker-compose.yml`: Debe mapear `3006:80` y `3007:3000`.

## Resolución de Conflictos

Si obtienes un error `EADDRINUSE`:

**Windows (PowerShell):**
```powershell
# Matar proceso en puerto 3006
Get-Process -Id (Get-NetTCPConnection -LocalPort 3006).OwningProcess -ErrorAction SilentlyContinue | Stop-Process -Force

# Matar proceso en puerto 3007
Get-Process -Id (Get-NetTCPConnection -LocalPort 3007).OwningProcess -ErrorAction SilentlyContinue | Stop-Process -Force
```
