import React, { Suspense } from "react";
import CreateAccountDrawer from "@/components/create-account-drawer";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { getDashboardData, getUserAccounts } from "@/actions/dashboard";
import AccountCard from "./_components/account-card";
import { getCurrentBudget } from "@/actions/budget";
import BudgetProgress from "./_components/budget-progress";
import DashboardOverview from "./_components/dasboard-overview";

const DashboardPage = async () => {
  const accounts = await getUserAccounts();

  const defaultAccount = accounts?.find((account) => account.isDefault);

  let budgetData = null;

  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }

  const transactions = await getDashboardData();
  return (
    <div className="space-y-8">
      {/* Budget Progress */}
      {defaultAccount && (
        <BudgetProgress
          initialBudget={budgetData?.budget || null}
          currentExpenses={budgetData?.currentExpenses || 0}
        />
      )}

      {/* Overview */}
      <Suspense fallback={"Loading overview..."}>
        <DashboardOverview
          accounts={accounts}
          transactions={transactions || []}
        ></DashboardOverview>
      </Suspense>

      {/* Accounts Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CreateAccountDrawer>
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed">
            <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5">
              <Plus className="h-10 w-10 mb-2" />
              <p className="text-sm font-medium">Create New Account</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>

        {accounts.length > 0 &&
          accounts?.map((account) => {
            return <AccountCard key={account.id} account={account} />;
          })}
      </div>
    </div>
  );
};

export default DashboardPage;
