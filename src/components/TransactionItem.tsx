import React, { useState } from 'react';
import { Trash2, Edit2 } from 'lucide-react';
import { Transaction } from '../types';
import { getCategoryIcon } from '../utils/categoryIcons';
import TransactionForm from './TransactionForm';

interface TransactionItemProps {
  transaction: Transaction;
  onDelete: (id: string) => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { id, description, amount, date, category, type } = transaction;

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const CategoryIcon = getCategoryIcon(category);

  if (isEditing) {
    return (
      <div className="mb-3">
        <TransactionForm 
          editTransaction={transaction} 
          onClose={() => setIsEditing(false)} 
        />
      </div>
    );
  }

  return (
    <div className={`
      bg-white rounded-lg p-4 mb-3 shadow-sm border-l-4
      ${type === 'income' ? 'border-l-green-500' : 'border-l-red-500'}
      transform transition-transform duration-200 hover:scale-[1.01] hover:shadow-md
    `}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`
            p-2 rounded-full 
            ${type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}
          `}>
            <CategoryIcon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-medium text-gray-800">{description}</h4>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <span className="mr-2">{formatDate(date)}</span>
              <span className="capitalize px-2 py-0.5 rounded-full bg-gray-100">{category}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className={`font-bold ${type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
            {type === 'income' ? '+' : '-'}{formatCurrency(Math.abs(amount))}
          </span>
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-400 hover:text-indigo-500 transition-colors"
            aria-label="Edit transaction"
          >
            <Edit2 className="w-5 h-5" />
          </button>
          <button 
            onClick={() => onDelete(id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Delete transaction"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;