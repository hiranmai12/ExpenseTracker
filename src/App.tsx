import React from 'react';
import Dashboard from './components/Dashboard';
import { TransactionProvider } from './context/TransactionContext';

function App() {
  return (
    <TransactionProvider>
      <Dashboard />
    </TransactionProvider>
  );
}

export default App;