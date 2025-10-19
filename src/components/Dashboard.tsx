import React from 'react';
import Header from './Header';
import Balance from './Balance';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import ExpenseSummary from './ExpenseSummary';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <Balance />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <TransactionForm />
            <TransactionList />
          </div>
          <div className="lg:col-span-1">
            <ExpenseSummary />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;