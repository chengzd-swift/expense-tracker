"use client";

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';
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
}

const categoryColors: Record<string, string> = {
  Food: "bg-orange-100 text-orange-700",
  Transport: "bg-blue-100 text-blue-700",
  Shopping: "bg-purple-100 text-purple-700",
  Health: "bg-green-100 text-green-700",
  Entertainment: "bg-pink-100 text-pink-700",
  Other: "bg-slate-100 text-slate-700",
};

const ExpenseTable = ({ expenses, onDelete }: ExpenseTableProps) => {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-dashed border-slate-300">
        <p className="text-slate-500">No expenses recorded yet. Start by adding one above!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="font-semibold">Description</TableHead>
            <TableHead className="font-semibold">Category</TableHead>
            <TableHead className="font-semibold text-right">Amount</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id} className="hover:bg-slate-50 transition-colors">
              <TableCell className="text-slate-600">{expense.date}</TableCell>
              <TableCell className="font-medium">{expense.description}</TableCell>
              <TableCell>
                <Badge variant="secondary" className={categoryColors[expense.category] || categoryColors.Other}>
                  {expense.category}
                </Badge>
              </TableCell>
              <TableCell className="text-right font-bold text-slate-900">
                ${expense.amount.toFixed(2)}
              </TableCell>
              <TableCell>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => onDelete(expense.id)}
                  className="text-slate-400 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExpenseTable;