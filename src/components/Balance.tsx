import React from 'react';
import { useTransactions } from '../context/TransactionContext';
import { ArrowDownCircle, ArrowUpCircle, IndianRupee } from 'lucide-react';

const Balance: React.FC = () => {
  const { totalIncome, totalExpense, balance } = useTransactions();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
      <div className="bg-white rounded-xl shadow-md p-6 transform transition-transform duration-200 hover:scale-105">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-600 font-medium">Total Income</h3>
          <ArrowUpCircle className="w-6 h-6 text-green-500" />
        </div>
        <p className="text-2xl font-bold text-green-500">{formatCurrency(totalIncome)}</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 transform transition-transform duration-200 hover:scale-105">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-600 font-medium">Total Expenses</h3>
          <ArrowDownCircle className="w-6 h-6 text-red-500" />
        </div>
        <p className="text-2xl font-bold text-red-500">{formatCurrency(totalExpense)}</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 transform transition-transform duration-200 hover:scale-105">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-600 font-medium">Net Balance</h3>
          <IndianRupee className="w-6 h-6 text-indigo-500" />
        </div>
        <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {formatCurrency(balance)}
        </p>
      </div>
    </div>
  );
};

export default Balance;