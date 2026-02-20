import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RentHistory } from '@/lib/supabase';

interface RentChartProps {
  data: RentHistory[];
}

export function RentChart({ data }: RentChartProps) {
  const chartData = [...data]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(item => ({
      date: new Date(item.date).toLocaleDateString('en-CA', { year: 'numeric', month: 'short' }),
      rent: item.rent_amount,
    }));

  if (chartData.length === 0) {
    return <div className="text-gray-500 text-center py-8">No rent history available</div>;
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={60} />
          <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `$${value}`} />
          <Tooltip formatter={(value: number) => [`$${value.toFixed(0)}`, 'Rent']} />
          <Line type="monotone" dataKey="rent" stroke="#dc2626" strokeWidth={3} dot={{ fill: '#dc2626', strokeWidth: 2, r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
