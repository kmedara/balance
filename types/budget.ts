import type { IResourcable } from "./resourcable";

export type Budget = {
  title: string;
  description?: string;
  startDate: Date;
  amount: number;
  type: "Income" | "Expense";
  category: string;
  subcategory: string;
  frequency:
    | "Once"
    | "Daily"
    | "Weekly"
    | "Bi-Weekly"
    | "Semi-Monthly"
    | "Monthly"
    | "Quarterly"
    | "Semi-Annually"
    | "Annually";
} & IResourcable;

export type BudgetType = Budget["type"];
export type BudgetFrequency = Budget["frequency"];
