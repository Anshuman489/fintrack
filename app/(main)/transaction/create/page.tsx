import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import React, { Suspense } from "react";
import AddTransactionForm from "../_components/transaction-form";
import { BarLoader } from "react-spinners";
import { getTransaction } from "@/actions/transaction";
import { SearchParams } from "@/types";

// Create a separate server component for data fetching
async function TransactionFormWrapper({ searchParams }: { searchParams: SearchParams }) {
  const accounts = await getUserAccounts();

  // Await searchParams before using its properties
  // Await searchParams before using its properties
  const params = await searchParams;
  const rawEdit = params.edit;
  const editId = Array.isArray(rawEdit) ? rawEdit[0] : rawEdit;

  let initialData = null;
  if (editId) {
    const transaction = await getTransaction(editId);
    initialData = transaction;
  }

  return (
    <>
      <h1 className="text-5xl gradient gradient-title mb-8">
        {editId ? "Edit" : "Add"} Transaction
      </h1>
      <AddTransactionForm
        accounts={accounts}
        categories={defaultCategories}
        editMode={!!editId}
        initialData={initialData}
      />
    </>
  );
}

const AddTransactionPage = ({ searchParams }: { searchParams: SearchParams }) => {
  return (
    <div className="max-w-3xl mx-auto px-5">
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
      >
        <TransactionFormWrapper searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default AddTransactionPage;
