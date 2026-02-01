# VenciTrack

Sistema de Gestión y Recordatorios de Vencimientos.

## Requisitos
- Node.js 18+
- npm

## Instalación y Ejecución
1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Preparar Base de Datos:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```
3. Iniciar en modo desarrollo:
   ```bash
   npm run dev
   ```

## Funcionalidades Implementadas
- **Dashboard**: Vista general de documentos por vencer.
- **Motor de Recordatorios**: API en `/api/cron/reminders` que procesa vencimientos.
- **Enlaces Seguros**: Acceso público sin login para actualizar fechas vía tokens en `/u/[token]`.
- **Diseño**: Interfaz moderna basada en Antigravity UI.

## Documentación Detallada
Consulta el archivo `DOCS.md` para diagramas lógicos, modelo de datos y flujos del sistema.
