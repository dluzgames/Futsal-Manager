'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAthletes, Athlete } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function AthletesPage() {
  const { athletes, loading, deleteAthlete } = useAthletes();
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const filteredAthletes = athletes.filter((athlete) =>
    athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    athlete.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    athlete.jerseyNumber.toString().includes(searchTerm)
  );

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este atleta?')) {
      deleteAthlete(id);
      toast.success('Atleta excluído com sucesso');
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Atletas</h1>
        <Link href="/athletes/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Atleta
          </Button>
        </Link>
      </div>

      <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
          </div>
          <Input
            placeholder="Buscar por nome, posição ou número..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Atleta
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Posição
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estatísticas
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Ações</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAthletes.map((athlete) => (
              <tr key={athlete.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                      {athlete.jerseyNumber}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{athlete.name}</div>
                      <div className="text-sm text-gray-500">{athlete.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{athlete.position}</div>
                  <div className="text-xs text-gray-500">{athlete.dominantFoot}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge
                    variant={
                      athlete.status === 'Ativo'
                        ? 'success'
                        : athlete.status === 'Lesionado'
                        ? 'danger'
                        : 'neutral'
                    }
                  >
                    {athlete.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-4">
                    <span>Jogos: {athlete.stats.matches}</span>
                    <span>Gols: {athlete.stats.goals}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push(`/athletes/${athlete.id}`)}
                    >
                      <Edit className="h-4 w-4 text-indigo-600" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(athlete.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredAthletes.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            Nenhum atleta encontrado.
          </div>
        )}
      </div>
    </div>
  );
}
