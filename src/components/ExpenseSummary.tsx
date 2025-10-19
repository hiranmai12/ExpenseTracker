import React, { useMemo } from 'react';
import { PieChart, BarChart } from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

const ExpenseSummary: React.FC = () => {
  const { transactions } = useTransactions();
  const [activeChart, setActiveChart] = React.useState<'pie' | 'bar'>('pie');

  const expensesByCategory = useMemo(() => {
    const expenseTransactions = transactions.filter(t => t.type === 'expense');
    const categories: Record<string, number> = {};

    expenseTransactions.forEach(transaction => {
      const { category, amount } = transaction;
      categories[category] = (categories[category] || 0) + amount;
    });

    return Object.entries(categories)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount);
  }, [transactions]);

  const getCategoryColor = (index: number) => {
    const colors = [
      '#EF4444', '#3B82F6', '#10B981', '#F59E0B',
      '#8B5CF6', '#EC4899', '#6366F1', '#14B8A6',
      '#FB923C', '#06B6D4', '#84CC16', '#34D399'
    ];
    return colors[index % colors.length];
  };

  const totalExpenses = expensesByCategory.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Expense Summary</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveChart('pie')}
            className={`p-1.5 rounded-md ${activeChart === 'pie' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
            aria-label="Show pie chart"
          >
            <PieChart className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveChart('bar')}
            className={`p-1.5 rounded-md ${activeChart === 'bar' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
            aria-label="Show bar chart"
          >
            <BarChart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {totalExpenses === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No expense data to display</p>
          <p className="text-sm text-gray-400 mt-1">Add some expenses to see the summary</p>
        </div>
      ) : (
        <>
          {activeChart === 'pie' ? (
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={expensesByCategory}
                    dataKey="amount"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {expensesByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getCategoryColor(index)} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={expensesByCategory}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="category" type="category" />
                  <Tooltip />
                  <Bar dataKey="amount" barSize={18}>
                    {expensesByCategory.map((entry, index) => (
                      <Cell key={`bar-cell-${index}`} fill={getCategoryColor(index)} />
                    ))}
                  </Bar>
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ExpenseSummary;
