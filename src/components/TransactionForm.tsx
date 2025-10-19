import React, { useState, useEffect } from 'react';
import { PlusCircle, X } from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';
import { TransactionType, Transaction } from '../types';

const categories = [
  { value: 'food', label: 'Food & Dining' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'utilities', label: 'Utilities' },
  { value: 'housing', label: 'Housing' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'personal', label: 'Personal' },
  { value: 'education', label: 'Education' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'salary', label: 'Salary' },
  { value: 'investment', label: 'Investment' },
  { value: 'gift', label: 'Gift' },
  { value: 'other', label: 'Other' },
];

interface FormData {
  description: string;
  amount: string;
  date: string;
  category: string;
  type: TransactionType;
}

interface FormErrors {
  description?: string;
  amount?: string;
  date?: string;
  category?: string;
}

interface TransactionFormProps {
  editTransaction?: Transaction;
  onClose?: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ editTransaction, onClose }) => {
  const { addTransaction, updateTransaction } = useTransactions();
  const [formData, setFormData] = useState<FormData>({
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    type: 'expense',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    if (editTransaction) {
      setFormData({
        description: editTransaction.description,
        amount: editTransaction.amount.toString(),
        date: editTransaction.date,
        category: editTransaction.category,
        type: editTransaction.type,
      });
      setIsFormVisible(true);
    }
  }, [editTransaction]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleTypeChange = (type: TransactionType) => {
    setFormData(prev => ({ ...prev, type }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const transactionData = {
        description: formData.description,
        amount: Number(formData.amount),
        date: formData.date,
        category: formData.category,
        type: formData.type,
      };

      if (editTransaction) {
        updateTransaction(editTransaction.id, transactionData);
        if (onClose) onClose();
      } else {
        addTransaction(transactionData);
        setFormData({
          description: '',
          amount: '',
          date: new Date().toISOString().split('T')[0],
          category: '',
          type: 'expense',
        });
        setIsFormVisible(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          {editTransaction ? 'Edit Transaction' : 'Add Transaction'}
        </h2>
        {!editTransaction && (
          <button 
            onClick={() => setIsFormVisible(!isFormVisible)}
            className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm font-medium"
          >
            <PlusCircle className="w-5 h-5 mr-1" />
            {isFormVisible ? 'Hide Form' : 'Show Form'}
          </button>
        )}
        {editTransaction && onClose && (
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close form"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      
      {(isFormVisible || editTransaction) && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-4 mb-4">
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                formData.type === 'expense'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => handleTypeChange('expense')}
            >
              Expense
            </button>
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                formData.type === 'income'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => handleTypeChange('income')}
            >
              Income
            </button>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Description of the transaction"
            />
            {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              min="0.01"
              step="0.01"
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                errors.amount ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0.00"
            />
            {errors.amount && <p className="mt-1 text-xs text-red-500">{errors.amount}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  errors.date ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date}</p>}
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category}</p>}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {editTransaction ? 'Update Transaction' : 'Add Transaction'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TransactionForm;