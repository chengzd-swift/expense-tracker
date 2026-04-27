"use client";

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

interface ExpenseTableProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
  onEdit: (expense: Expense) => void;
}

const categoryColors: Record<string, string> = {
  Food: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Transport: "bg-blue-100 text-blue-700 border-blue-200",
  Shopping: "bg-purple-100 text-purple-700 border-purple-200",
  Health: "bg-rose-100 text-rose-700 border-rose-200",
  Entertainment: "bg-amber-100 text-amber-700 border-amber-200",
  Other: "bg-slate-100 text-slate-700 border-slate-200",
};

const ExpenseTable = ({ expenses, onDelete, onEdit }: ExpenseTableProps) => {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
        <p className="text-slate-500">No expenses recorded yet. Start by adding one above!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow className="hover:bg-transparent border-b border-slate-200">
            <TableHead className="font-bold text-slate-700 py-4">Date</TableHead>
            <TableHead className="font-bold text-slate-700 py-4">Description</TableHead>
            <TableHead className="font-bold text-slate-700 py-4">Category</TableHead>
            <TableHead className="font-bold text-slate-700 py-4 text-right">Amount</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow 
              key={expense.id} 
              className="even:bg-blue-50/30 hover:bg-blue-50/50 transition-colors border-b border-slate-100 last:border-0"
            >
              <TableCell className="text-slate-500 font-medium">{expense.date}</TableCell>
              <TableCell className="font-semibold text-slate-900">{expense.description}</TableCell>
              <TableCell>
                <Badge 
                  variant="outline" 
                  className={`font-semibold px-2.5 py-0.5 rounded-full ${categoryColors[expense.category] || categoryColors.Other}`}
                >
                  {expense.category}
                </Badge>
              </TableCell>
              <TableCell className="text-right font-bold text-slate-900">
                ${expense.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onEdit(expense)}
                    className="text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onDelete(expense.id)}
                    className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExpenseTable;