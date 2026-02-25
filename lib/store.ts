import { useState, useEffect } from 'react';

export type Position = 'Goleiro' | 'Fixo' | 'Ala' | 'Pivô';
export type DominantFoot = 'Destro' | 'Canhoto' | 'Ambidestro';
export type Status = 'Ativo' | 'Lesionado' | 'Inativo';

export interface Athlete {
  id: string;
  name: string;
  position: Position;
  jerseyNumber: number;
  age: number;
  height: number; // cm
  weight: number; // kg
  dominantFoot: DominantFoot;
  phone: string;
  email: string;
  status: Status;
  stats: {
    matches: number;
    goals: number;
    assists: number;
  };
  createdAt: string;
}

const STORAGE_KEY = 'futsal_manager_athletes';

const initialAthletes: Athlete[] = [
  {
    id: '1',
    name: 'Ricardo Silva',
    position: 'Fixo',
    jerseyNumber: 5,
    age: 28,
    height: 182,
    weight: 78,
    dominantFoot: 'Destro',
    phone: '(11) 98765-4321',
    email: 'ricardo.silva@example.com',
    status: 'Ativo',
    stats: { matches: 15, goals: 3, assists: 8 },
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Lucas Oliveira',
    position: 'Ala',
    jerseyNumber: 10,
    age: 24,
    height: 175,
    weight: 70,
    dominantFoot: 'Canhoto',
    phone: '(11) 91234-5678',
    email: 'lucas.oliveira@example.com',
    status: 'Ativo',
    stats: { matches: 14, goals: 12, assists: 5 },
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Marcos Santos',
    position: 'Goleiro',
    jerseyNumber: 1,
    age: 30,
    height: 188,
    weight: 85,
    dominantFoot: 'Destro',
    phone: '(11) 99876-5432',
    email: 'marcos.santos@example.com',
    status: 'Lesionado',
    stats: { matches: 10, goals: 0, assists: 2 },
    createdAt: new Date().toISOString(),
  },
];

export function useAthletes() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setAthletes(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse athletes from local storage', e);
        setAthletes(initialAthletes);
      }
    } else {
      setAthletes(initialAthletes);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialAthletes));
    }
    setLoading(false);
  }, []);

  const saveAthletes = (newAthletes: Athlete[]) => {
    setAthletes(newAthletes);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newAthletes));
  };

  const addAthlete = (athlete: Omit<Athlete, 'id' | 'createdAt'>) => {
    const newAthlete: Athlete = {
      ...athlete,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    saveAthletes([...athletes, newAthlete]);
    return newAthlete;
  };

  const updateAthlete = (id: string, updates: Partial<Athlete>) => {
    const newAthletes = athletes.map((a) => (a.id === id ? { ...a, ...updates } : a));
    saveAthletes(newAthletes);
  };

  const deleteAthlete = (id: string) => {
    const newAthletes = athletes.filter((a) => a.id !== id);
    saveAthletes(newAthletes);
  };

  const getAthlete = (id: string) => athletes.find((a) => a.id === id);

  return {
    athletes,
    loading,
    addAthlete,
    updateAthlete,
    deleteAthlete,
    getAthlete,
  };
}
