import React from 'react';
import { 
  ShoppingCart, Coffee, Car, Tv, Home, HeartPulse, 
  GraduationCap, Shirt, IndianRupee, TrendingUp, Gift, 
  Receipt, SprayCan, FileText 
} from 'lucide-react';

type IconComponent = React.FC<{ className?: string }>;

export const getCategoryIcon = (category: string): IconComponent => {
  switch (category) {
    case 'food':
      return Coffee;
    case 'transportation':
      return Car;
    case 'entertainment':
      return Tv;
    case 'utilities':
      return Receipt;
    case 'housing':
      return Home;
    case 'healthcare':
      return HeartPulse;
    case 'personal':
      return SprayCan;
    case 'education':
      return GraduationCap;
    case 'shopping':
      return ShoppingCart;
    case 'salary':
      return IndianRupee;
    case 'investment':
      return TrendingUp;
    case 'gift':
      return Gift;
    default:
      return FileText;
  }
};