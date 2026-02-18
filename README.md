# VenciTrack

Sistema corporativo para la gestión de vencimientos y documentos críticos.

## 🚀 Guía Rápida

### Prerrequisitos
- **Docker Desktop** (encendido)
- Node.js 20+ (Opcional, solo para desarrollo local)

### 📦 Instalación y Despliegue (Recomendado)

#### En Windows (PowerShell)
```powershell
./scripts/setup.ps1
```

#### En Linux / Mac
```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

**¿Qué hacen estos scripts?**
1. Generan un archivo `.env` seguro con credenciales aleatorias.
2. Construyen los contenedores Docker.
3. Inician el sistema completo.

---

## 🌐 Acceso al Sistema

Una vez iniciado, el sistema estará disponible en:

| Módulo | Dirección | Credenciales por Defecto |
| :--- | :--- | :--- |
| **Plataforma Web** | [http://localhost:3006](http://localhost:3006) | Registro disponible en `/register` |
| **API Backend** | [http://localhost:3007/api](http://localhost:3007/api) | - |
| **Base de Datos** | Puerto `5435` | Ver archivo `.env` generado |

---

## 🛠️ Comandos de Mantenimiento

### Detener el sistema
```bash
docker-compose down
```

### Reiniciar y reconstruir (Updates)
Si descargas cambios del repositorio, actualiza tu entorno:
```bash
docker-compose up -d --build --force-recreate
```

### Ver logs
```bash
docker-compose logs -f
```

---

## 📂 Solución de Problemas

**Error: "Port already in use"**
- Verifica que los puertos `3006`, `3007` o `5435` no estén ocupados.
- Edita el archivo `.env` si necesitas cambiarlos.

**Error: Base de datos no conecta**
- Espera 10 segundos tras el primer inicio para que PostgreSQL inicialice.
- Verifica logs: `docker-compose logs db`.

---
© 2026 VenciTrack - Manual de Operación
