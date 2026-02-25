'use client';

import { useAthletes } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Users, Goal, Activity, AlertCircle } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Dashboard() {
  const { athletes, loading } = useAthletes();

  if (loading) {
    return <div>Carregando...</div>;
  }

  const totalAthletes = athletes.length;
  const activeAthletes = athletes.filter((a) => a.status === 'Ativo').length;
  const injuredAthletes = athletes.filter((a) => a.status === 'Lesionado').length;
  const totalGoals = athletes.reduce((acc, curr) => acc + curr.stats.goals, 0);

  const positionData = [
    { name: 'Goleiro', value: athletes.filter((a) => a.position === 'Goleiro').length },
    { name: 'Fixo', value: athletes.filter((a) => a.position === 'Fixo').length },
    { name: 'Ala', value: athletes.filter((a) => a.position === 'Ala').length },
    { name: 'Pivô', value: athletes.filter((a) => a.position === 'Pivô').length },
  ].filter((d) => d.value > 0);

  const topScorers = [...athletes]
    .sort((a, b) => b.stats.goals - a.stats.goals)
    .slice(0, 5)
    .map((a) => ({
      name: a.name.split(' ')[0], // First name only for chart
      goals: a.stats.goals,
    }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="flex items-center p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <Users className="h-6 w-6" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Total de Atletas</p>
            <p className="text-2xl font-semibold text-gray-900">{totalAthletes}</p>
          </div>
        </Card>

        <Card className="flex items-center p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
            <Activity className="h-6 w-6" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Ativos</p>
            <p className="text-2xl font-semibold text-gray-900">{activeAthletes}</p>
          </div>
        </Card>

        <Card className="flex items-center p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
            <AlertCircle className="h-6 w-6" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Lesionados</p>
            <p className="text-2xl font-semibold text-gray-900">{injuredAthletes}</p>
          </div>
        </Card>

        <Card className="flex items-center p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
            <Goal className="h-6 w-6" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Gols na Temporada</p>
            <p className="text-2xl font-semibold text-gray-900">{totalGoals}</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Atletas por Posição</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={positionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {positionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex justify-center gap-4">
            {positionData.map((entry, index) => (
              <div key={entry.name} className="flex items-center">
                <div
                  className="h-3 w-3 rounded-full mr-2"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm text-gray-600">
                  {entry.name} ({entry.value})
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Top Artilheiros</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topScorers}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="goals" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
