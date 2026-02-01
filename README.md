# VenciTrack

> **La herramienta que piensa por ti.**
> Gestión inteligente de vencimientos diseñada para humanos. Olvida las multas, el estrés y los trámites de última hora.

![VenciTrack Banner](https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop)

## 📋 Sobre el Proyecto

**VenciTrack** es una plataforma de gestión de fechas críticas que elimina el error humano de la ecuación. A diferencia de un calendario tradicional, VenciTrack está diseñado con una filosofía de **insistencia inteligente**:

1.  **Registro Rápido:** Captura fechas de SOAT, licencias, pasaportes o hipotecas en menos de 30 segundos.
2.  **Alertas Persistentes:** Enviamos recordatorios preventivos vía correo electrónico con frecuencia incremental hasta que se toma acción.
3.  **Acción sin Fricción:** Actualiza las fechas renovadas directamente desde el correo mediante **enlaces seguros (Magic Links)**, sin necesidad de iniciar sesión.

### 🌟 Pilares de Diseño
- **Simplicidad Radical:** Interfaz limpia, sin configuraciones complejas.
- **Dark/Light Mode:** Soporte nativo para temas claro y oscuro, respetando la preferencia del sistema del usuario.
- **Voz Humanizada:** Comunicación clara, directa y libre de tecnicismos ("núcleos", "protocolos").
- **Multi-Categoría:** Soporte para Vehículos, Salud, Finanzas, Viajes y más.

---

## 🛠️ Stack Tecnológico

Construido con una arquitectura moderna enfocada en rendimiento, seguridad y experiencia de usuario:

-   **Frontend:** [Next.js 14](https://nextjs.org/) (App Router), [React](https://react.dev/)
-   **Estilos:** [Tailwind CSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/)
-   **Animaciones:** [Framer Motion](https://www.framer.com/motion/)
-   **Base de Datos:** [Prisma ORM](https://www.prisma.io/) (SQLite en dev, PostgreSQL recomendado para prod)
-   **Iconografía:** [Lucide React](https://lucide.dev/)
-   **Tipografía:** Inter (Google Fonts)

---

## 🚀 Instalación y Despliegue

### Requisitos Previos
-   Node.js 18.17 o superior
-   npm o pnpm

### Desarrollo Local

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/vencitrack.git
    cd vencitrack
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    # o
    npm install --legacy-peer-deps
    ```

3.  **Configurar Base de Datos:**
    El proyecto utiliza SQLite por defecto para desarrollo local.
    ```bash
    npx prisma generate
    npx prisma db push
    ```

4.  **Iniciar Servidor de Desarrollo:**
    ```bash
    npm run dev
    ```
    Visita `http://localhost:3000` para ver la aplicación.

### Despliegue en Producción (Vercel)

Para desplegar en Vercel, asegúrate de migrar la base de datos a un proveedor compatible con Edge/Serverless (como **Vercel Postgres** o **Neon**).

1.  Actualiza `schema.prisma` para usar `provider = "postgresql"`.
2.  Configura `DATABASE_URL` en las variables de entorno de Vercel.
3.  Ejecuta `npx prisma migrate deploy` durante el build.

---

## 📂 Estructura del Proyecto

```
/src
  /app              # Rutas y páginas (Next.js App Router)
  /components
    /ui             # Componentes base (Botones, Inputs, Cards)
  /lib              # Utilidades y configuración (utils.ts, prisma.ts)
/prisma             # Esquema de base de datos y migraciones
/public             # Assets estáticos
```

---

## 🔒 Privacidad y Seguridad

VenciTrack está diseñado bajo el principio de **privacidad primero**.
-   **Enlaces Mágicos:** Los tokens de actualización son de uso único y expiran por seguridad.
-   **Datos Mínimos:** Solo almacenamos la información estrictamente necesaria para el recordatorio.

---

© 2026 VenciTrack Engineering. Todos los derechos reservados.
