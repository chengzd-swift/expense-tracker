"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import SummaryCards from '@/components/SummaryCards';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseTable from '@/components/ExpenseTable';
import ExpenseFilter from '@/components/ExpenseFilter';
import { showSuccess } from '@/utils/toast';
import { MadeWithDyad } from '@/components/made-with-dyad';

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

const Index = () => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [filterCategory, setFilterCategory] = useState("All");
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = (newExpense: Expense) => {
    setExpenses([newExpense, ...expenses]);
    showSuccess("Expense added successfully!");
  };

  const handleUpdateExpense = (updatedExpense: Expense) => {
    setExpenses(expenses.map(e => e.id === updatedExpense.id ? updatedExpense : e));
    setEditingExpense(null);
    showSuccess("Expense updated successfully!");
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
    if (editingExpense?.id === id) {
      setEditingExpense(null);
    }
    showSuccess("Expense deleted.");
  };

  const handleEditClick = (expense: Expense) => {
    setEditingExpense(expense);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredExpenses = filterCategory === "All" 
    ? expenses 
    : expenses.filter(e => e.category === filterCategory);

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const thisMonthExpenses = expenses
    .filter(e => {
      const d = new Date(e.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow p-4 md:p-8 max-w-6xl mx-auto w-full">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500">Track and manage your daily spending</p>
        </header>

        <SummaryCards 
          total={totalExpenses} 
          thisMonth={thisMonthExpenses} 
          count={expenses.length} 
        />

        <ExpenseForm 
          onAdd={handleAddExpense} 
          onUpdate={handleUpdateExpense}
          editingExpense={editingExpense}
          onCancelEdit={() => setEditingExpense(null)}
        />

        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-slate-800">Recent Transactions</h2>
            <ExpenseFilter 
              selectedCategory={filterCategory} 
              onCategoryChange={setFilterCategory} 
            />
          </div>
          <ExpenseTable 
            expenses={filteredExpenses} 
            onDelete={handleDeleteExpense} 
            onEdit={handleEditClick}
          />
        </div>
      </main>

      <footer className="py-8">
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default Index;