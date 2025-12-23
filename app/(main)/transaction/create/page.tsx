import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import React, { Suspense } from "react";
import AddTransactionForm from "../_components/transaction-form";
import { BarLoader } from "react-spinners";

// Create a separate server component for data fetching
async function TransactionFormWrapper() {
  const accounts = await getUserAccounts();
  
  return (
    <AddTransactionForm
      accounts={accounts}
      categories={defaultCategories}
    />
  );
}

const AddTransactionPage = () => {
  return (
    <div className="max-w-3xl mx-auto px-5">
      <h1 className="text-5xl gradient gradient-title mb-8">Add Transaction</h1>

      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
      >
        <TransactionFormWrapper />
      </Suspense>
    </div>
  );
};

export default AddTransactionPage;
