'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Athlete, Position, DominantFoot, Status } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const athleteSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  position: z.enum(['Goleiro', 'Fixo', 'Ala', 'Pivô']),
  jerseyNumber: z.coerce.number().min(1, 'Número deve ser maior que 0'),
  age: z.coerce.number().min(16, 'Idade mínima é 16 anos'),
  height: z.coerce.number().min(100, 'Altura inválida'),
  weight: z.coerce.number().min(30, 'Peso inválido'),
  dominantFoot: z.enum(['Destro', 'Canhoto', 'Ambidestro']),
  phone: z.string().min(10, 'Telefone inválido'),
  email: z.string().email('Email inválido'),
  status: z.enum(['Ativo', 'Lesionado', 'Inativo']),
  stats: z.object({
    matches: z.coerce.number().min(0),
    goals: z.coerce.number().min(0),
    assists: z.coerce.number().min(0),
  }),
});

type AthleteFormData = z.infer<typeof athleteSchema>;

interface AthleteFormProps {
  initialData?: Athlete;
  onSubmit: (data: AthleteFormData) => void;
  isSubmitting?: boolean;
}

export function AthleteForm({ initialData, onSubmit, isSubmitting }: AthleteFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(athleteSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          position: initialData.position,
          jerseyNumber: initialData.jerseyNumber,
          age: initialData.age,
          height: initialData.height,
          weight: initialData.weight,
          dominantFoot: initialData.dominantFoot,
          phone: initialData.phone,
          email: initialData.email,
          status: initialData.status,
          stats: initialData.stats,
        }
      : {
          name: '',
      position: 'Ala',
      jerseyNumber: 0,
      age: 18,
      height: 170,
      weight: 70,
      dominantFoot: 'Destro',
      phone: '',
      email: '',
      status: 'Ativo',
      stats: { matches: 0, goals: 0, assists: 0 },
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white p-6 rounded-lg shadow">
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <Input
            label="Nome Completo"
            id="name"
            {...register('name')}
            error={errors.name?.message}
          />
        </div>

        <div className="sm:col-span-3">
          <Input
            label="Email"
            id="email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
        </div>

        <div className="sm:col-span-2">
          <Select
            label="Posição"
            id="position"
            options={[
              { label: 'Goleiro', value: 'Goleiro' },
              { label: 'Fixo', value: 'Fixo' },
              { label: 'Ala', value: 'Ala' },
              { label: 'Pivô', value: 'Pivô' },
            ]}
            {...register('position')}
            error={errors.position?.message}
          />
        </div>

        <div className="sm:col-span-2">
          <Input
            label="Número da Camisa"
            id="jerseyNumber"
            type="number"
            {...register('jerseyNumber')}
            error={errors.jerseyNumber?.message}
          />
        </div>

        <div className="sm:col-span-2">
          <Select
            label="Status"
            id="status"
            options={[
              { label: 'Ativo', value: 'Ativo' },
              { label: 'Lesionado', value: 'Lesionado' },
              { label: 'Inativo', value: 'Inativo' },
            ]}
            {...register('status')}
            error={errors.status?.message}
          />
        </div>

        <div className="sm:col-span-2">
          <Input
            label="Idade"
            id="age"
            type="number"
            {...register('age')}
            error={errors.age?.message}
          />
        </div>

        <div className="sm:col-span-2">
          <Input
            label="Altura (cm)"
            id="height"
            type="number"
            {...register('height')}
            error={errors.height?.message}
          />
        </div>

        <div className="sm:col-span-2">
          <Input
            label="Peso (kg)"
            id="weight"
            type="number"
            {...register('weight')}
            error={errors.weight?.message}
          />
        </div>

        <div className="sm:col-span-3">
          <Select
            label="Pé Dominante"
            id="dominantFoot"
            options={[
              { label: 'Destro', value: 'Destro' },
              { label: 'Canhoto', value: 'Canhoto' },
              { label: 'Ambidestro', value: 'Ambidestro' },
            ]}
            {...register('dominantFoot')}
            error={errors.dominantFoot?.message}
          />
        </div>

        <div className="sm:col-span-3">
          <Input
            label="Telefone"
            id="phone"
            {...register('phone')}
            error={errors.phone?.message}
          />
        </div>

        <div className="col-span-full border-t pt-6">
          <h3 className="text-base font-semibold leading-7 text-gray-900">Estatísticas Iniciais</h3>
          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
            <Input
              label="Partidas Jogadas"
              id="matches"
              type="number"
              {...register('stats.matches')}
              error={errors.stats?.matches?.message}
            />
            <Input
              label="Gols"
              id="goals"
              type="number"
              {...register('stats.goals')}
              error={errors.stats?.goals?.message}
            />
            <Input
              label="Assistências"
              id="assists"
              type="number"
              {...register('stats.assists')}
              error={errors.stats?.assists?.message}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-x-6 border-t pt-6">
        <Button type="button" variant="ghost" onClick={() => router.back()}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {initialData ? 'Atualizar Atleta' : 'Cadastrar Atleta'}
        </Button>
      </div>
    </form>
  );
}
