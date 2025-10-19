import React from 'react';
import { WalletCards } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-6 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <WalletCards className="w-8 h-8 mr-3" />
          <h1 className="text-2xl md:text-3xl font-bold">Expense Tracker</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;