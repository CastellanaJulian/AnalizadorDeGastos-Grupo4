# Instrucciones para correr el proyecto

## Requisitos previos

- Node.js y npm instalados
- Python 3.8+ instalado

---

## 1. Instalar dependencias del frontend

En la raíz del proyecto, ejecuta:

```bash
cd AnalizadorDeGastos-Grupo4
npm install
```

## 2. Iniciar el frontend

```bash
npm run dev
```
La app estará disponible normalmente en http://localhost:5173

---

## 3. Instalar dependencias del backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn
```

## 4. Iniciar el backend

Desde la carpeta `backend`:

```bash
uvicorn main:app --reload
```
El backend estará disponible en http://localhost:8000

---

## Notas
- El frontend se comunica con el backend en http://localhost:8000
