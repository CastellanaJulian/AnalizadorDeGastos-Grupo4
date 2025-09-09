import axios from 'axios';
import { Transaction } from '@/types/transaction';

const API_BASE_URL = 'http://localhost:8000';

// Mock data for development
const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-01-15',
    description: 'Supermercado Disco',
    amount: -2500,
    category: 'Alimentación',
    type: 'expense'
  },
  {
    id: '2', 
    date: '2024-01-16',
    description: 'Transferencia recibida',
    amount: 50000,
    category: 'Salario',
    type: 'income'
  },
  {
    id: '3',
    date: '2024-01-17',
    description: 'Starbucks',
    amount: -800,
    category: 'Entretenimiento',
    type: 'expense'
  },
  {
    id: '4',
    date: '2024-01-18',
    description: 'Farmacia del Ahorro',
    amount: -1200,
    category: 'Salud',
    type: 'expense'
  },
  {
    id: '5',
    date: '2024-01-19',
    description: 'Netflix',
    amount: -999,
    category: 'Entretenimiento',
    type: 'expense'
  },
  {
    id: '6',
    date: '2024-01-20',
    description: 'Uber',
    amount: -650,
    category: 'Transporte',
    type: 'expense'
  }
];

export const fetchTransactions = async (): Promise<Transaction[]> => {
  try {
    // Try to fetch from backend first
    const response = await axios.get(`${API_BASE_URL}/api/transactions`);
    return response.data;
  } catch (error) {
    // Fallback to mock data if backend is not available
    console.log('Backend no disponible, usando datos mock');
    return mockTransactions;
  }
};

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