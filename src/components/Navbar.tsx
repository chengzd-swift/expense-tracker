"use client";

import React from 'react';
import { Wallet, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const { signOut, user } = useAuth();

  return (
    <nav className="bg-[#0a192f] text-white py-4 px-6 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wallet className="w-6 h-6 text-blue-400" />
          <span className="text-xl font-bold tracking-tight">MyExpenses</span>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-sm text-slate-400">{user?.email}</span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={signOut}
            className="text-slate-300 hover:text-white hover:bg-slate-800 gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;