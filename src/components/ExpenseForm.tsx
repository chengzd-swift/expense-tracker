"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Save, X, AlertCircle } from 'lucide-react';

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
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingExpense) {
      setDescription(editingExpense.description);
      setAmount(editingExpense.amount.toString());
      setCategory(editingExpense.category);
      setDate(editingExpense.date);
      setErrors({});
    } else {
      resetForm();
    }
  }, [editingExpense]);

  const resetForm = () => {
    setDescription("");
    setAmount("");
    setCategory("");
    setDate(new Date().toISOString().split('T')[0]);
    setErrors({});
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!description.trim()) {
      newErrors.description = "Description is required";
    }
    
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }
    
    if (!category) {
      newErrors.category = "Please select a category";
    }
    
    if (!date) {
      newErrors.date = "Date is required";
    } else {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(23, 59, 59, 999); // Allow today
      if (selectedDate > today) {
        newErrors.date = "Date cannot be in the future";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    const expenseData = {
      id: editingExpense ? editingExpense.id : crypto.randomUUID(),
      description: description.trim(),
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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="description" className={errors.description ? "text-rose-600" : ""}>Description</Label>
              <Input 
                id="description" 
                placeholder="What did you buy?" 
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (errors.description) setErrors(prev => ({ ...prev, description: "" }));
                }}
                className={errors.description ? "border-rose-500 focus-visible:ring-rose-500" : ""}
              />
              {errors.description && (
                <p className="text-xs font-medium text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.description}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount" className={errors.amount ? "text-rose-600" : ""}>Amount</Label>
              <Input 
                id="amount" 
                type="number" 
                step="0.01" 
                placeholder="0.00" 
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  if (errors.amount) setErrors(prev => ({ ...prev, amount: "" }));
                }}
                className={errors.amount ? "border-rose-500 focus-visible:ring-rose-500" : ""}
              />
              {errors.amount && (
                <p className="text-xs font-medium text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.amount}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category" className={errors.category ? "text-rose-600" : ""}>Category</Label>
              <Select 
                value={category} 
                onValueChange={(val) => {
                  setCategory(val);
                  if (errors.category) setErrors(prev => ({ ...prev, category: "" }));
                }}
              >
                <SelectTrigger className={errors.category ? "border-rose-500 focus:ring-rose-500" : ""}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-xs font-medium text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.category}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date" className={errors.date ? "text-rose-600" : ""}>Date</Label>
              <Input 
                id="date" 
                type="date" 
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  if (errors.date) setErrors(prev => ({ ...prev, date: "" }));
                }}
                className={errors.date ? "border-rose-500 focus-visible:ring-rose-500" : ""}
              />
              {errors.date && (
                <p className="text-xs font-medium text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.date}
                </p>
              )}
            </div>
          </div>
          
          <Button type="submit" className={`${editingExpense ? 'bg-blue-700' : 'bg-blue-600'} hover:bg-blue-800 text-white w-full md:w-auto px-8`}>
            {editingExpense ? 'Update Expense' : 'Add Expense'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ExpenseForm;