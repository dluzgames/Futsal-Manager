'use client';

import { useAthletes } from '@/lib/store';
import { AthleteForm } from '@/components/athlete-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function NewAthletePage() {
  const { addAthlete } = useAthletes();
  const router = useRouter();

  const handleSubmit = (data: any) => {
    try {
      addAthlete(data);
      toast.success('Atleta cadastrado com sucesso!');
      router.push('/athletes');
    } catch (error) {
      toast.error('Erro ao cadastrar atleta.');
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Novo Atleta</h1>
      </div>
      <AthleteForm onSubmit={handleSubmit} />
    </div>
  );
}
