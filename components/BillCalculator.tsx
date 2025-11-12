import React, { useState, useCallback } from 'react';
import type { BillDetails } from '../types';
import { calculateTnebBill } from '../lib/tariff';

interface BillCalculatorProps {
  onShowTariff: () => void;
}

export const BillCalculator: React.FC<BillCalculatorProps> = ({ onShowTariff }) => {
  const [units, setUnits] = useState<string>('');
  const [billDetails, setBillDetails] = useState<BillDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUnitsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUnits(value);
    setBillDetails(null); 

    if (value === '') {
      setError(null);
      return;
    }

    if (value.startsWith('-')) {
      setError('Units cannot be negative.');
      return;
    }

    if (/[^0-9]/.test(value)) {
      setError('Please enter a valid number.');
      return;
    }
    
    setError(null);
  };

  const handleCalculate = useCallback(() => {
    const consumedUnits = parseInt(units, 10);
    if (!isNaN(consumedUnits) && consumedUnits >= 0) {
      const details = calculateTnebBill(consumedUnits);
      setBillDetails(details);
    }
  }, [units]);

  const handleReset = useCallback(() => {
    setUnits('');
    setBillDetails(null);
    setError(null);
  }, []);

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 sm:p-8 space-y-6 animate-[fadeIn_0.5s_ease-in-out]">
      <div>
        <label htmlFor="units" className="block text-base sm:text-lg font-medium text-slate-700 dark:text-slate-300">
          Enter Bi-Monthly Consumed Units (kWh)
        </label>
        <input
          id="units"
          type="number"
          value={units}
          onChange={handleUnitsChange}
          placeholder="e.g., 350"
          className="mt-2 block w-full px-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-lg text-lg sm:text-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition appearance-none"
          min="0"
          aria-invalid={!!error}
          aria-describedby="units-error"
        />
        {error && (
          <p id="units-error" className="mt-2 text-sm text-red-600 dark:text-red-500" role="alert">
            {error}
          </p>
        )}
        <div className="text-right mt-2">
            <button
                onClick={onShowTariff}
                className="text-sm font-medium text-sky-600 dark:text-sky-400 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-slate-800 rounded"
            >
                View Detailed Tariff Chart
            </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleCalculate}
          disabled={!units || !!error}
          className="w-full flex-1 inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-slate-800 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed transition-transform duration-200 active:scale-[0.98]"
        >
          Calculate Bill
        </button>
        <button
          onClick={handleReset}
          className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 border border-slate-300 dark:border-slate-600 text-base font-medium rounded-md text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-slate-800 transition-colors"
        >
          Reset
        </button>
      </div>

      {billDetails && (
        <div className="pt-6 border-t border-slate-200 dark:border-slate-700 animate-[fadeIn_0.5s_ease-in-out]">
          <h2 className="text-xl font-semibold mb-4 text-center text-slate-800 dark:text-slate-100">Bill Details</h2>
          <div className="text-center bg-slate-100 dark:bg-slate-900/50 rounded-lg p-6 mb-6">
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">Estimated Bill Amount</p>
            <p className="text-4xl sm:text-5xl font-bold text-sky-600 dark:text-sky-400 tracking-tight mt-1">
              <span className="inline-block animate-[scaleIn_0.4s_ease-out]">
                ₹ {billDetails.totalAmount.toLocaleString('en-IN')}
              </span>
            </p>
          </div>
          
          <h3 className="text-lg font-medium mb-3 text-slate-800 dark:text-slate-200">Calculation Breakdown:</h3>
          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
            <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
              <thead className="text-xs text-slate-700 dark:text-slate-300 uppercase bg-slate-100 dark:bg-slate-700/80">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Slab</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">Units</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">Rate (₹)</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {billDetails.breakdown.map((item, index) => (
                  <tr key={index} className="bg-white dark:bg-slate-800 border-b last:border-b-0 dark:border-slate-700">
                    <th scope="row" className="px-4 py-3 font-medium text-slate-900 dark:text-white whitespace-nowrap">{item.slab}</th>
                    <td className="px-4 py-3 text-right tabular-nums">{item.units !== null ? item.units : '—'}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{item.rate !== null ? item.rate.toFixed(2) : '—'}</td>
                    <td className="px-4 py-3 text-right font-medium text-slate-700 dark:text-slate-200 tabular-nums">{item.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-semibold text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-700/50">
                    <th scope="row" colSpan={3} className="px-4 py-3 text-right text-base">Total Estimated Charges</th>
                    <td className="px-4 py-3 text-right text-base tabular-nums">₹ {billDetails.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};