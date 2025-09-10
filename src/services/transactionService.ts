
import axios from 'axios';
import { Transaction } from '@/types/transaction';

const API_BASE_URL = 'http://localhost:8000';

// Obtiene todos los registros desde el backend
export const fetchTransactions = async (): Promise<Transaction[]> => {
  const response = await axios.get(`${API_BASE_URL}/registros`);
  // Adaptar los datos del backend al modelo Transaction del frontend
  return response.data.map((r: any) => ({
    id: r.id.toString(),
    date: r.fecha,
    description: r.descripcion,
    amount: r.monto,
    category: '', // Puedes categorizar en el frontend si lo deseas
    type: r.monto >= 0 ? 'income' : 'expense',
  }));
};

// Agrega un nuevo registro al backend
export const agregarRegistro = async (fecha: string, monto: number, descripcion: string) => {
  const response = await axios.post(`${API_BASE_URL}/registros`, {
    fecha,
    monto,
    descripcion,
  });
  return response.data;
};

// Elimina un registro por ID
export const eliminarRegistro = async (id: number | string) => {
  const response = await axios.delete(`${API_BASE_URL}/registros/${id}`);
  return response.data;
};

// Función para categorizar transacciones (opcional, sigue disponible)
export const categorizeTransaction = (description: string): string => {
  const categories = {
    'Alimentación': ['supermercado', 'disco', 'carrefour', 'dia', 'coto', 'mcdonalds', 'burger', 'pizza'],
    'Transporte': ['uber', 'cabify', 'sube', 'estacionamiento', 'nafta', 'combustible'],
    'Entretenimiento': ['netflix', 'spotify', 'cine', 'teatro', 'bar', 'restaurant', 'starbucks'],
    'Salud': ['farmacia', 'hospital', 'clinica', 'medico', 'odontologo'],
    'Servicios': ['luz', 'gas', 'agua', 'telefono', 'internet', 'cable'],
    'Salario': ['transferencia', 'sueldo', 'honorarios', 'pago']
  };

  const desc = description.toLowerCase();
  
  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => desc.includes(keyword))) {
      return category;
    }
  }
  
  return 'Otros';
};