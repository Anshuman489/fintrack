export type SearchParams = Record<string, string | string[] | undefined>;

export interface ScannedReceipt {
  amount: number;
  date: Date;
  description?: string;
  category?: string;
  [key: string]: unknown;
}

export interface Account {
  id: string;
  name: string;
  balance: string;
  isDefault?: boolean;
}

export interface Transaction {
  id: string;
  accountId: string;
  date: string;
  description: string;
  type: "INCOME" | "EXPENSE";
  amount: number;
  category: string;
  isRecurring: boolean;
  recurringInterval?: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
  nextRecurringDate?: string;
}

export interface Category {
  id: string;
  name: string;
  type: "INCOME" | "EXPENSE";
  color?: string;
  icon?: string;
  subcategories?: string[];
}

export interface InitialTransactionData {
  id: string;
  type: "INCOME" | "EXPENSE";
  amount: number | string;
  description?: string;
  accountId: string;
  category?: string;
  date: string;
  isRecurring: boolean;
  recurringInterval?: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
}

export interface TransactionFormValues {
  type: "INCOME" | "EXPENSE";
  amount: string;
  description?: string;
  accountId: string;
  category?: string;
  date: Date;
  isRecurring: boolean;
  recurringInterval?: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
}

export interface AddTransactionFormProps {
  accounts: Account[];
  categories: Category[];
  editMode?: boolean;
  initialData?: InitialTransactionData | null;
}