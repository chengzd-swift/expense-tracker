"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import SummaryCards from '@/components/SummaryCards';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseTable from '@/components/ExpenseTable';
import ExpenseFilter from '@/components/ExpenseFilter';
import ExpenseChart from '@/components/ExpenseChart';
import { showSuccess, showError } from '@/utils/toast';
import { MadeWithDyad } from '@/components/made-with-dyad';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

const Index = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState("All");
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setExpenses(data || []);
    } catch (error: any) {
      showError("Failed to load expenses: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAddExpense = async (newExpense: Expense) => {
    try {
      const { error } = await supabase
        .from('expenses')
        .insert([newExpense]);

      if (error) throw error;
      
      setExpenses([newExpense, ...expenses]);
      showSuccess("Expense added successfully!");
    } catch (error: any) {
      showError("Failed to add expense: " + error.message);
    }
  };

  const handleUpdateExpense = async (updatedExpense: Expense) => {
    try {
      const { error } = await supabase
        .from('expenses')
        .update(updatedExpense)
        .eq('id', updatedExpense.id);

      if (error) throw error;

      setExpenses(expenses.map(e => e.id === updatedExpense.id ? updatedExpense : e));
      setEditingExpense(null);
      showSuccess("Expense updated successfully!");
    } catch (error: any) {
      showError("Failed to update expense: " + error.message);
    }
  };

  const handleDeleteExpense = async (id: string) => {
    try {
      const { error } = await supabase
        .from('expenses')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setExpenses(expenses.filter(e => e.id !== id));
      if (editingExpense?.id === id) {
        setEditingExpense(null);
      }
      showSuccess("Expense deleted.");
    } catch (error: any) {
      showError("Failed to delete expense: " + error.message);
    }
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

  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(categoryTotals).map(([category, amount]) => ({
    category,
    amount
  }));

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

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-slate-200 shadow-sm">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
              <p className="text-slate-500 font-medium">Fetching your expenses...</p>
            </div>
          ) : (
            <>
              <ExpenseTable 
                expenses={filteredExpenses} 
                onDelete={handleDeleteExpense} 
                onEdit={handleEditClick}
              />
              <ExpenseChart data={chartData} />
            </>
          )}
        </div>
      </main>

      <footer className="py-8">
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default Index;