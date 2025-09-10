import React, { useState } from "react";
import { agregarRegistro } from "../services/transactionService";

// Componente para agregar un nuevo movimiento
const FormularioMovimiento: React.FC<{ onAgregado: () => void }> = ({ onAgregado }) => {
  // Estados para los campos del formulario
  const [fecha, setFecha] = useState("");
  const [monto, setMonto] = useState<number>(0);
  const [descripcion, setDescripcion] = useState("");

  // Maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fecha || !descripcion) return;
    await agregarRegistro(fecha, monto, descripcion);
    // Limpia los campos
    setFecha("");
    setMonto(0);
    setDescripcion("");
    // Notifica al padre que se agregó un registro
    onAgregado();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-sm mx-auto">
      {/* Campo para la fecha */}
      <label>
        Fecha:
        <input
          type="date"
          value={fecha}
          onChange={e => setFecha(e.target.value)}
          required
          className="border rounded px-2 py-1 w-full"
        />
      </label>
      {/* Campo para el monto */}
      <label>
        Monto:
        <input
          type="number"
          value={monto}
          onChange={e => setMonto(Number(e.target.value))}
          required
          className="border rounded px-2 py-1 w-full"
        />
      </label>
      {/* Campo para la descripción */}
      <label>
        Descripción:
        <input
          type="text"
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
          required
          className="border rounded px-2 py-1 w-full"
        />
      </label>
      <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 mt-2">Agregar movimiento</button>
    </form>
  );
};

export default FormularioMovimiento;
