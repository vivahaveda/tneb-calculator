import type { BillDetails, BillBreakdownItem } from './types';

// New Tariff Structure as of July 1, 2024
const TARIFF_RULES = [
  {
    maxUnits: 100,
    slabs: [
      { limit: 100, rate: 0.00 }, // 1-100
    ]
  },
  {
    maxUnits: 200,
    slabs: [
      { limit: 100, rate: 0.00 }, // 1-100
      { limit: 100, rate: 2.35 }, // 101-200
    ]
  },
  {
    maxUnits: 400,
    slabs: [
      { limit: 100, rate: 0.00 }, // 1-100
      { limit: 100, rate: 2.35 }, // 101-200
      { limit: 200, rate: 4.70 }, // 201-400
    ]
  },
  {
    maxUnits: 500,
    slabs: [
      { limit: 100, rate: 0.00 }, // 1-100
      { limit: 100, rate: 2.35 }, // 101-200
      { limit: 200, rate: 4.70 }, // 201-400
      { limit: 100, rate: 6.30 }, // 401-500
    ]
  },
  {
    maxUnits: 600,
    slabs: [
      { limit: 100, rate: 0.00 },   // 1-100
      { limit: 300, rate: 4.70 },   // 101-400
      { limit: 100, rate: 6.30 },   // 401-500
      { limit: 100, rate: 8.40 },   // 501-600
    ]
  },
  {
    maxUnits: 800,
    slabs: [
      { limit: 100, rate: 0.00 },   // 1-100
      { limit: 300, rate: 4.70 },   // 101-400
      { limit: 100, rate: 6.30 },   // 401-500
      { limit: 100, rate: 8.40 },   // 501-600
      { limit: 200, rate: 9.45 },   // 601-800
    ]
  },
  {
    maxUnits: 1000,
    slabs: [
      { limit: 100, rate: 0.00 },   // 1-100
      { limit: 300, rate: 4.70 },   // 101-400
      { limit: 100, rate: 6.30 },   // 401-500
      { limit: 100, rate: 8.40 },   // 501-600
      { limit: 200, rate: 9.45 },   // 601-800
      { limit: 200, rate: 10.50 },  // 801-1000
    ]
  },
  {
    maxUnits: Infinity,
    slabs: [
      { limit: 100, rate: 0.00 },    // 1-100
      { limit: 300, rate: 4.70 },    // 101-400
      { limit: 100, rate: 6.30 },    // 401-500
      { limit: 100, rate: 8.40 },    // 501-600
      { limit: 200, rate: 9.45 },    // 601-800
      { limit: 200, rate: 10.50 },   // 801-1000
      { limit: Infinity, rate: 11.55 }, // > 1000
    ]
  }
];

export const calculateTnebBill = (units: number): BillDetails => {
  if (units <= 0) {
    return { totalAmount: 0, breakdown: [] };
  }

  let slabsToUse: { limit: number; rate: number; }[] = [];
  for (const rule of TARIFF_RULES) {
    if (units <= rule.maxUnits) {
      slabsToUse = rule.slabs;
      break;
    }
  }
  
  const breakdown: BillBreakdownItem[] = [];
  let energyCharge = 0;
  let remainingUnits = units;
  let consumedUnitsInPreviousSlabs = 0;

  for (const slab of slabsToUse) {
    if (remainingUnits <= 0) break;

    const unitsInThisSlab = Math.min(remainingUnits, slab.limit);
    const amountForSlab = unitsInThisSlab * slab.rate;
    energyCharge += amountForSlab;

    const slabStartUnit = consumedUnitsInPreviousSlabs;
    const slabEndUnit = consumedUnitsInPreviousSlabs + unitsInThisSlab;
    let slabLabel: string;

    if (slab.limit !== Infinity) {
      if (slabStartUnit === 0) {
        slabLabel = `1 - ${slabEndUnit} Units`;
        if (slab.rate === 0) {
          slabLabel += ' (Subsidy)';
        }
      } else {
        slabLabel = `${slabStartUnit + 1} - ${slabEndUnit} Units`;
      }
    } else {
      slabLabel = `> ${slabStartUnit} Units`;
    }

    breakdown.push({
      slab: slabLabel,
      units: unitsInThisSlab,
      rate: slab.rate,
      amount: amountForSlab,
    });

    remainingUnits -= unitsInThisSlab;
    consumedUnitsInPreviousSlabs += slab.limit;
  }

  const totalAmount = energyCharge;

  return { totalAmount: Math.round(totalAmount), breakdown };
};