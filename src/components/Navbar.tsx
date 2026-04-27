"use client";

import React from 'react';
import { Wallet } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-[#0a192f] text-white py-4 px-6 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center gap-2">
        <Wallet className="w-6 h-6 text-blue-400" />
        <span className="text-xl font-bold tracking-tight">MyExpenses</span>
      </div>
    </nav>
  );
};

export default Navbar;