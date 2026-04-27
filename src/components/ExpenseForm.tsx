"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Save, X } from 'lucide-react';

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

interface ExpenseFormProps {
  onAdd: (expense: Expense) => void;
  onUpdate: (expense: Expense) => void;
  editingExpense: Expense | null;
  onCancelEdit: () => void;
}

const categories = ["Food", "Transport", "Shopping", "Health", "Entertainment", "Other"];

const ExpenseForm = ({ onAdd, onUpdate, editingExpense, onCancelEdit }: ExpenseFormProps) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (editingExpense) {
      setDescription(editingExpense.description);
      setAmount(editingExpense.amount.toString());
      setCategory(editingExpense.category);
      setDate(editingExpense.date);
    } else {
      resetForm();
    }
  }, [editingExpense]);

  const resetForm = () => {
    setDescription("");
    setAmount("");
    setCategory("");
    setDate(new Date().toISOString().split('T')[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !category || !date) return;

    const expenseData = {
      id: editingExpense ? editingExpense.id : crypto.randomUUID(),
      description,
      amount: parseFloat(amount),
      category,
      date
    };

    if (editingExpense) {
      onUpdate(expenseData);
    } else {
      onAdd(expenseData);
    }

    resetForm();
  };

  return (
    <Card className={`mb-8 shadow-sm transition-all duration-300 ${editingExpense ? 'ring-2 ring-blue-500 bg-blue-50/30' : ''}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          {editingExpense ? (
            <>
              <Save className="w-5 h-5 text-blue-600" />
              Edit Expense
            </>
          ) : (
            <>
              <PlusCircle className="w-5 h-5 text-blue-600" />
              Add New Expense
            </>
          )}
        </CardTitle>
        {editingExpense && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onCancelEdit}
            className="text-slate-500 hover:text-slate-700"
          >
            <X className="w-4 h-4 mr-1" />
            Cancel
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input 
              id="description" 
              placeholder="What did you buy?" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input 
              id="amount" 
              type="number" 
              step="0.01" 
              placeholder="0.00" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input 
              id="date" 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          
          <Button type="submit" className={`${editingExpense ? 'bg-blue-700' : 'bg-blue-600'} hover:bg-blue-800 text-white w-full`}>
            {editingExpense ? 'Update Expense' : 'Add Expense'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ExpenseForm;