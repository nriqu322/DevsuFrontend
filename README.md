# Devsu Frontend test

# Getting Started

Asegurate de tener XCode instalado en tu computadora y el simulador de iOS.

Descargar el proyecto en tu computadora.

## Step 1: Instalar dependencias

Primero necesitas instalar abrir una terminal apuntando al folder **DevsuFrontend** e instalar las dependencias del proyecto.
Desde la raiz del proyecto ejecuta este comando en una terminal.

```bash
yarn install
```

Ahora tenemos que hacer instalar las dependencias para iOS ejecutando este comando

```bash
cd ios && pod install
```

## Step 2: Iniciar el proyecto frontend

### Para iOS

```bash
yarn ios
```

## Step 3: Ejecutar los tests unitarios

Desde la raiz del proyecto ejecuta el siguiente comando

```bash
yarn test
```

## Step 4: Iniciar el backend

- Abrir una terminal apuntando al folder **repo-interview-main**
- Instalar las dependencias
```bash
npm install
```
- Para correr el backend
```bash
npm run start:dev
```

El servicio corre en esta url http://localhost:3002