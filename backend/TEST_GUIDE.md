# 🧪 VectraGuard Backend - Test Suite

## Overview
Se ha implementado una suite de pruebas exhaustivas usando **Jest** para cubrir todos los componentes principales del backend de VectraGuard.

## Estructura de Pruebas

### 📂 Archivos de Prueba
```
backend/
├── auth.controller.test.js       # Pruebas del controlador de autenticación
├── incidents.controller.test.js  # Pruebas del controlador de incidentes
├── users.controller.test.js      # Pruebas del controlador de usuarios
├── auth.middleware.test.js       # Pruebas del middleware de autenticación
├── csvImporter.test.js          # Pruebas del servicio de importación CSV
├── routes.test.js               # Pruebas de enrutamiento
└── jest.config.js               # Configuración de Jest
```

## Cobertura de Pruebas

### 1. **Auth Controller** (`auth.controller.test.js`)
- ✅ Login exitoso con token válido
- ✅ Manejo de errores cuando falla la creación del token
- ✅ Validación de UID faltante
- ✅ Validación de UID vacío

### 2. **Incidents Controller** (`incidents.controller.test.js`)
- ✅ Obtener todos los incidentes
- ✅ Manejo de lista vacía de incidentes
- ✅ Manejo de errores de Firebase
- ✅ Crear incidentes con datos válidos
- ✅ Validación de datos faltantes
- ✅ Manejo de errores de permisos
- ✅ Soporte de múltiples niveles de severidad

### 3. **Users Controller** (`users.controller.test.js`)
- ✅ Obtener todos los usuarios
- ✅ Manejo de lista vacía de usuarios
- ✅ Soporte para listas grandes (1000+ usuarios)
- ✅ Preservación de estructura de datos

### 4. **Auth Middleware** (`auth.middleware.test.js`)
- ✅ Validación exitosa de tokens
- ✅ Error 403 cuando no hay token
- ✅ Error 403 cuando el header está vacío
- ✅ Error 401 cuando el token es inválido
- ✅ Manejo de tokens sin prefijo "Bearer"
- ✅ Manejo de tokens expirados
- ✅ Extracción correcta del token
- ✅ Headers malformados

### 5. **CSV Importer** (`csvImporter.test.js`)
- ✅ Importación exitosa de archivos CSV
- ✅ Manejo de archivos CSV vacíos
- ✅ Soporte para múltiples tipos de datos
- ✅ Mensaje de completación
- ✅ Soporte para archivos grandes (1000+ registros)

### 6. **Routes** (`routes.test.js`)
- ✅ Verificación de endpoints POST /login
- ✅ Verificación de endpoints GET /incidents
- ✅ Verificación de endpoints POST /incidents
- ✅ Registro correcto de manejadores

## Ejecutar Pruebas

### Instalación de Dependencias
```bash
npm install
```

### Ejecutar Todas las Pruebas
```bash
npm test
```

### Modo Watch (Reejecutar en cambios)
```bash
npm run test:watch
```

### Generar Reporte de Cobertura
```bash
npm run test:coverage
```

## Configuración de Jest

### Archivo: `jest.config.js`
```javascript
export default {
  testEnvironment: 'node',
  collectCoverageFrom: [
    'controllers/**/*.js',
    'services/**/*.js',
    'middleware/**/*.js',
    'routes/**/*.js',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  testMatch: ['**/*.test.js'],
};
```

## Mocking Estrategia

### Firebase Mocking
Todas las pruebas mockan Firebase para evitar dependencias externas:
```javascript
jest.mock('../firebase.js', () => ({
  db: { collection: jest.fn() },
  auth: { createCustomToken: jest.fn() },
}));
```

### Request/Response Mocking
Se crean objetos mock para las funciones de Express:
```javascript
const req = { body: {}, headers: {} };
const res = {
  json: jest.fn().mockReturnThis(),
  status: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis(),
};
```

## Casos de Prueba Por Módulo

### Total de Casos: **60+ pruebas**
- Auth Controller: 4 pruebas
- Incidents Controller: 8 pruebas
- Users Controller: 4 pruebas
- Auth Middleware: 8 pruebas
- CSV Importer: 6 pruebas
- Routes: 5 pruebas

## Mejores Prácticas Implementadas

✅ **Aislamiento**: Cada prueba es independiente y no afecta a otras
✅ **Limpieza**: `beforeEach()` reseta mocks entre pruebas
✅ **Mocking**: Se mockean dependencias externas (Firebase)
✅ **Cobertura**: Cubre casos exitosos, errores y edge cases
✅ **Nomenclatura**: Nombres descriptivos para fácil entendimiento
✅ **Asincronía**: Manejo correcto de promesas y callbacks

## Próximos Pasos

Para mejorar aún más la cobertura:
1. Agregar pruebas de integración E2E
2. Implementar test coverage > 80%
3. Agregar pruebas de rendimiento
4. Implementar CI/CD con GitHub Actions

---
**Última actualización**: 2024
