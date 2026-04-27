"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Calendar, List } from 'lucide-react';

interface SummaryProps {
  total: number;
  thisMonth: number;
  count: number;
}

const SummaryCards = ({ total, thisMonth, count }: SummaryProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="rounded-2xl border-none shadow-md hover:shadow-lg transition-shadow duration-300 bg-white overflow-hidden">
        <div className="h-1 bg-blue-600 w-full" />
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Expenses</CardTitle>
          <div className="p-2 bg-blue-50 rounded-lg">
            <DollarSign className="h-5 w-5 text-blue-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-slate-900">${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          <p className="text-xs text-slate-400 mt-1">Lifetime spending</p>
        </CardContent>
      </Card>
      
      <Card className="rounded-2xl border-none shadow-md hover:shadow-lg transition-shadow duration-300 bg-white overflow-hidden">
        <div className="h-1 bg-indigo-500 w-full" />
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider">This Month</CardTitle>
          <div className="p-2 bg-indigo-50 rounded-lg">
            <Calendar className="h-5 w-5 text-indigo-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-slate-900">${thisMonth.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          <p className="text-xs text-slate-400 mt-1">Current billing cycle</p>
        </CardContent>
      </Card>
      
      <Card className="rounded-2xl border-none shadow-md hover:shadow-lg transition-shadow duration-300 bg-white overflow-hidden">
        <div className="h-1 bg-emerald-500 w-full" />
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Entries</CardTitle>
          <div className="p-2 bg-emerald-50 rounded-lg">
            <List className="h-5 w-5 text-emerald-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-slate-900">{count}</div>
          <p className="text-xs text-slate-400 mt-1">Total transactions</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;