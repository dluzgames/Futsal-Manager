'use client';

import { useAthletes } from '@/lib/store';
import { AthleteForm } from '@/components/athlete-form';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { Athlete } from '@/lib/store';

export default function EditAthletePage() {
  const { athletes, updateAthlete, loading } = useAthletes();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [athlete, setAthlete] = useState<Athlete | undefined>(undefined);

  useEffect(() => {
    if (!loading && id) {
      const found = athletes.find((a) => a.id === id);
      if (found) {
        setAthlete(found);
      } else {
        toast.error('Atleta não encontrado');
        router.push('/athletes');
      }
    }
  }, [id, athletes, loading, router]);

  const handleSubmit = (data: any) => {
    try {
      updateAthlete(id, data);
      toast.success('Atleta atualizado com sucesso!');
      router.push('/athletes');
    } catch (error) {
      toast.error('Erro ao atualizar atleta.');
      console.error(error);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!athlete) {
    return <div>Atleta não encontrado.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Editar Atleta: {athlete.name}</h1>
      </div>
      <AthleteForm initialData={athlete} onSubmit={handleSubmit} />
    </div>
  );
}
