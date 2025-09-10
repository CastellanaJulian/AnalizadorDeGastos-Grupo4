from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from datetime import date
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todas las URLs. Cambia esto por la URL de tu frontend en producción.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Lo usamosp para simplificar el almacenamiento en memoria
registros = []
contador_id = 1

class Registro(BaseModel):
    fecha: date
    monto: float
    descripcion: str

@app.post("/registros")
def agregar_registro(registro: Registro):
    global contador_id
    nuevo = registro.dict()
    nuevo["id"] = contador_id
    registros.append(nuevo)
    contador_id += 1
    return nuevo

@app.delete("/registros/{id}")
def eliminar_registro(id: int):
    for r in registros:
        if r["id"] == id:
            registros.remove(r)
            return {"mensaje": "Registro eliminado"}
    raise HTTPException(status_code=404, detail="Registro no encontrado")

@app.get("/registros")
def listar_registros():
    return registros