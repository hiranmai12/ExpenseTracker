import React, { createContext, useContext, useEffect, useState } from 'react';
import { Transaction, TransactionContextType } from '../types';

const TransactionContext = createContext<TransactionContextType | null>(null);

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: crypto.randomUUID(),
    };
    setTransactions([...transactions, newTransaction]);
  };

  const updateTransaction = (id: string, updatedTransaction: Omit<Transaction, 'id'>) => {
    setTransactions(transactions.map(transaction => 
      transaction.id === id 
        ? { ...updatedTransaction, id } 
        : transaction
    ));
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  const totalIncome = transactions
    .filter(transaction => transaction.type === 'income')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpense = transactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        totalIncome,
        totalExpense,
        balance,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};