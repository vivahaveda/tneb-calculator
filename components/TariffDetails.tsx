import React from 'react';

interface TariffDetailsProps {
  onBack: () => void;
}

const TARIFF_DISPLAY_DATA = [
  {
      usageLimit: 'Up to 100 Units',
      slabs: [ { range: '1 - 100', rate: '₹ 0.00' } ]
  },
  {
      usageLimit: 'Up to 200 Units',
      slabs: [ { range: '1 - 100', rate: '₹ 0.00' }, { range: '101 - 200', rate: '₹ 2.35' } ]
  },
  {
      usageLimit: 'Up to 400 Units',
      slabs: [ { range: '1 - 100', rate: '₹ 0.00' }, { range: '101 - 200', rate: '₹ 2.35' }, { range: '201 - 400', rate: '₹ 4.70' } ]
  },
  {
      usageLimit: 'Up to 500 Units',
      slabs: [ { range: '1 - 100', rate: '₹ 0.00' }, { range: '101 - 200', rate: '₹ 2.35' }, { range: '201 - 400', rate: '₹ 4.70' }, { range: '401 - 500', rate: '₹ 6.30' } ]
  },
  {
      usageLimit: 'Up to 600 Units',
      slabs: [ { range: '1 - 100', rate: '₹ 0.00' }, { range: '101 - 400', rate: '₹ 4.70' }, { range: '401 - 500', rate: '₹ 6.30' }, { range: '501 - 600', rate: '₹ 8.40' } ]
  },
  {
      usageLimit: 'Up to 800 Units',
      slabs: [ { range: '1 - 100', rate: '₹ 0.00' }, { range: '101 - 400', rate: '₹ 4.70' }, { range: '401 - 500', rate: '₹ 6.30' }, { range: '501 - 600', rate: '₹ 8.40' }, { range: '601 - 800', rate: '₹ 9.45' } ]
  },
  {
      usageLimit: 'Up to 1,000 Units',
      slabs: [ { range: '1 - 100', rate: '₹ 0.00' }, { range: '101 - 400', rate: '₹ 4.70' }, { range: '401 - 500', rate: '₹ 6.30' }, { range: '501 - 600', rate: '₹ 8.40' }, { range: '601 - 800', rate: '₹ 9.45' }, { range: '801 - 1,000', rate: '₹ 10.50' } ]
  },
  {
      usageLimit: 'Above 1,000 Units',
      slabs: [ { range: '1 - 100', rate: '₹ 0.00' }, { range: '101 - 400', rate: '₹ 4.70' }, { range: '401 - 500', rate: '₹ 6.30' }, { range: '501 - 600', rate: '₹ 8.40' }, { range: '601 - 800', rate: '₹ 9.45' }, { range: '801 - 1,000', rate: '₹ 10.50' }, { range: '1,001 and Above', rate: '₹ 11.55' } ]
  }
];

export const TariffDetails: React.FC<TariffDetailsProps> = ({ onBack }) => {
  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 sm:p-8 space-y-8 animate-[fadeIn_0.5s_ease-in-out]">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          TNEB Domestic Tariff Details (July 2024 Revision)
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          For Domestic Consumers (LT-1A) - Bi-Monthly Rates
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">Energy Charges per Unit</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          The applicable slab rates depend on your total bi-monthly consumption. Find your consumption range below to see the rates that apply to you.
        </p>
        <div className="space-y-8">
          {TARIFF_DISPLAY_DATA.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h4 className="text-md font-semibold text-slate-700 dark:text-slate-300 mb-0 bg-slate-100 dark:bg-slate-700/50 p-3 rounded-t-lg border-x border-t border-slate-200 dark:border-slate-700">
                If Total Consumption is {group.usageLimit}
              </h4>
              <div className="overflow-x-auto rounded-b-lg border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
                  <thead className="text-xs text-slate-700 dark:text-slate-300 uppercase bg-slate-50 dark:bg-slate-900/50">
                    <tr>
                      <th scope="col" className="px-6 py-3 font-semibold">Slab Range (Units)</th>
                      <th scope="col" className="px-6 py-3 text-right font-semibold">Rate per Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.slabs.map((slab, slabIndex) => (
                      <tr key={slabIndex} className="bg-white dark:bg-slate-800 border-t last:border-t-0 dark:border-slate-700">
                        <th scope="row" className="px-6 py-4 font-medium text-slate-900 dark:text-white whitespace-nowrap">{slab.range}</th>
                        <td className="px-6 py-4 text-right font-mono tabular-nums">{slab.rate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400 mt-4 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
          <p><strong>*Note on Subsidy:</strong> The first 100 units are provided free of charge (subsidy) for all domestic consumers, irrespective of their total consumption.</p>
        </div>
      </div>

      <div className="pt-4 text-center">
        <button
          onClick={onBack}
          className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 border border-slate-300 dark:border-slate-600 text-base font-medium rounded-md text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-slate-800 transition"
        >
          Back to Calculator
        </button>
      </div>
    </div>
  );
};