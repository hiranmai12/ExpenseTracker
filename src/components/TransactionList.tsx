import React, { useState, useMemo } from 'react';
import { Filter, SortDesc, SortAsc } from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';
import TransactionItem from './TransactionItem';
import { Transaction, TransactionType } from '../types';

const TransactionList: React.FC = () => {
  const { transactions, deleteTransaction } = useTransactions();
  const [filter, setFilter] = useState<TransactionType | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = transactions;
    
    // Apply type filter
    if (filter !== 'all') {
      filtered = transactions.filter(transaction => transaction.type === filter);
    }
    
    // Apply sorting
    return [...filtered].sort((a, b) => {
      if (sortBy === 'date') {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        return sortDirection === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      }
    });
  }, [transactions, filter, sortBy, sortDirection]);

  const toggleSort = (field: 'date' | 'amount') => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('desc');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Recent Transactions</h2>
        <button 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors"
        >
          <Filter className="w-5 h-5 mr-1" />
          <span className="text-sm font-medium">Filter</span>
        </button>
      </div>

      {isFilterOpen && (
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="flex flex-wrap gap-3">
            <div>
              <p className="text-sm text-gray-600 mb-2">Transaction Type</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 text-sm rounded-full ${
                    filter === 'all'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('income')}
                  className={`px-3 py-1 text-sm rounded-full ${
                    filter === 'income'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Income
                </button>
                <button
                  onClick={() => setFilter('expense')}
                  className={`px-3 py-1 text-sm rounded-full ${
                    filter === 'expense'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Expense
                </button>
              </div>
            </div>

            <div className="ml-auto">
              <p className="text-sm text-gray-600 mb-2">Sort By</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleSort('date')}
                  className={`px-3 py-1 text-sm rounded-full flex items-center ${
                    sortBy === 'date'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Date
                  {sortBy === 'date' && (
                    sortDirection === 'asc' ? 
                    <SortAsc className="w-4 h-4 ml-1" /> : 
                    <SortDesc className="w-4 h-4 ml-1" />
                  )}
                </button>
                <button
                  onClick={() => toggleSort('amount')}
                  className={`px-3 py-1 text-sm rounded-full flex items-center ${
                    sortBy === 'amount'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Amount
                  {sortBy === 'amount' && (
                    sortDirection === 'asc' ? 
                    <SortAsc className="w-4 h-4 ml-1" /> : 
                    <SortDesc className="w-4 h-4 ml-1" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-1">
        {filteredAndSortedTransactions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No transactions found</p>
            <p className="text-sm text-gray-400 mt-1">Add some transactions to get started</p>
          </div>
        ) : (
          filteredAndSortedTransactions.map((transaction: Transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onDelete={deleteTransaction}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionList;