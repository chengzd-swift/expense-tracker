"use client";

import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Filter } from 'lucide-react';

interface ExpenseFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = ["All", "Food", "Transport", "Shopping", "Health", "Entertainment", "Other"];

const ExpenseFilter = ({ selectedCategory, onCategoryChange }: ExpenseFilterProps) => {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="flex items-center gap-2 text-slate-500">
        <Filter className="w-4 h-4" />
        <Label htmlFor="filter-category" className="text-sm font-medium">Filter by:</Label>
      </div>
      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger id="filter-category" className="w-[180px] bg-white">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          {categories.map(cat => (
            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ExpenseFilter;