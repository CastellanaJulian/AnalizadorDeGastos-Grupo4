from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from datetime import date

app = FastAPI()

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