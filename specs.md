# specifications.md - VenciTrack Project

## Resumen Ejecutivo
VenciTrack es un sistema de grado empresarial para la gestión preventiva de vencimientos de documentos críticos. Su misión es eliminar el riesgo de multas y negligencias mediante un monitoreo activo y notificaciones automatizadas. El sistema utiliza una arquitectura segregada para maximizar la seguridad y el rendimiento, con un enfoque estricto en la integridad de los datos y la privacidad del usuario.

## 2.1 Bloque de Metadatos (ReqIF Standard)

| Atributo | Valor |
| :--- | :--- |
| **GUID** | `vt-spec-df8a21-9922` |
| **Project Name** | VenciTrack |
| **Version** | 1.1.0 |
| **Status** | Audited & Standardized |
| **Stakeholders** | Antigravity AI, User/Client |
| **Last Updated** | 2026-02-18 |

---

## 2.2 Fase de Requerimientos (Agile & Rigorous)

### User Stories

| ID | Story |
| :--- | :--- |
| **US-001** | Como **Administrador**, quiero **configurar tipos de documentos globales**, para **estandarizar los vencimientos que los usuarios deben rastrear**. |
| **US-002** | Como **Usuario**, quiero **registrar mis documentos con su fecha de vencimiento**, para **recibir alertas preventivas antes de que expiren**. |
| **US-003** | Como **Usuario**, quiero **visualizar el estado de mis documentos en un dashboard**, para **tener control total sobre mis obligaciones legales**. |
| **US-004** | Como **Sistema**, quiero **auditar todas las acciones críticas (login, borrado, edición)**, para **mantener un registro histórico de seguridad**. |

### Criterios de Aceptación (Gherkin)

#### REQ-ID: US-001 (Configuración Documentos)
*   **Dado que** soy un administrador autenticado.
*   **Cuando** ingreso un nuevo tipo de documento con nombre, categoría y días de gracia.
*   **Entonces** el sistema debe validar que el nombre sea único (SEC-006) y persistirlo en la tabla `DocumentType`.

#### REQ-ID: US-002 (Registro Documentos)
*   **Dado que** soy un usuario registrado y autenticado.
*   **Cuando** asocio un documento a un tipo existente y defino la fecha de expiración.
*   **Entonces** el sistema debe calcular automáticamente las alertas basadas en las preferencias del usuario.

---

## 2.3 Fase de Diseño y Arquitectura

### Constitución Técnica

*   **Frontend:** React 18 (Vite) + Tailwind CSS v4 + Framer Motion.
*   **Backend:** Next.js 16 (API Routes) + Prisma Proxy Bridge (pg direct).
*   **Persistence:** PostgreSQL 15 (Dockerized).
*   **Security:** JWT (jose) + bcryptjs (SEC-008, SEC-009).

### Diagrama de Secuencia: Autenticación (SEC-008, SEC-011)

1.  `Client` envía `POST /api/auth/login` con credenciales.
2.  `API` valida input vía esquema estricto (SEC-006).
3.  `API` consulta hash en `DB` y verifica con `bcrypt` (SEC-009).
4.  `API` genera JWT firmado con `jose` y expira en 15m (SEC-011).
5.  `API` registra evento en `AuditLog` (SEC-015 - sin data sensible).
6.  `API` responde con cookie `httpOnly` y segura (SEC-003).

### Definición de API (Core Endpoints)

#### `POST /api/auth/login`
- **Input:** `{ email, password }`
- **Output:** `{ success: boolean, user: Object }`
- **Security:** SEC-004, SEC-006, SEC-009.

#### `GET /api/documents`
- **Input:** Header `Authorization` / Session Cookie
- **Output:** `Array<Document>`
- **Security:** SEC-010 (Resource level ownership).

---

## 2.4 Fase de Implementación (Task List)

- [x] **TASK-001:** Implementar reconstrucción de Landing Page con alto contraste (Aesthetics/Readability). -> **Vínculo [US-003]**
- [x] **TASK-002:** Configurar `Prisma Bridge` para emular ORM con consultas parametrizadas directas. -> **Vínculo [SEC-002]**
- [x] **TASK-003:** Implementar validación de Zod en todos los endpoints de `api/src/app/api`. -> **Vínculo [SEC-006]**
- [x] **TASK-004:** Migrar expiración de tokens de 7d a 15m para cumplimiento estricto. -> **Vínculo [SEC-011]**
- [x] **TASK-005:** Ejecución de Auditoría Técnica 360° (Estructura, Código, Docker, Config). -> **Vínculo [SEC-AUDIT]**

---

## 4. Matriz de Trazabilidad de Cumplimiento (CSDD)

| ID Requerimiento | Principio Seguridad | Archivo / Componente | Técnica de Validación |
| :--- | :--- | :--- | :--- |
| **REQ-AUTH** | SEC-008 (JWT) | `api/src/shared/lib/auth-edge.ts` | Firmado con `jose` HS256 |
| **REQ-DB** | SEC-002 (SQLi) | `api/src/server/db/prisma.ts` | Consultas parametrizadas ($1, $2...) |
| **REQ-PASS** | SEC-009 (Bcrypt) | `api/src/shared/lib/auth.ts` | Hashing con salt cost 10+ |
| **REQ-SES** | SEC-011 (Exp) | `api/src/shared/lib/auth-edge.ts` | `setExpirationTime("15m")` |
| **REQ-INPUT** | SEC-006 (Valid) | `api/src/app/api/auth/login/route.ts` | Validación manual/esquema |
| **REQ-LOG** | SEC-015 (Logs) | `api/src/app/api/auth/login/route.ts` | Redacción de datos sensibles en Auditoría |

---

## Checklist Final de Validación

1.  **INVEST Compliance:** [YES] - Historias independientes y de valor atómico.
2.  **CSDD 15-Point Coverage:** [YES] - Aplicados principios SEC-001 a SEC-015.
3.  **Traceability:** [YES] - Vínculo entre US, Tasks y CSDD.
4.  **Ambiguity Filter:** [YES] - Eliminados adjetivos vacíos; métricas operativas definidas.
5.  **Design Sufficiency:** [YES] - Arquitectura soporta el modelo de datos de `init.sql`.
6.  **Adversarial Resistance:** [YES] - Definiciones de seguridad no admiten excepciones laxas.
