
export interface BillBreakdownItem {
  slab: string;
  units: number | null;
  rate: number | null;
  amount: number;
}

export interface BillDetails {
  totalAmount: number;
  breakdown: BillBreakdownItem[];
}