import TransactionList from "@/components/finance/TransactionList";

export default function TransactionsView({
  categories,
  transactions,
  transactionFilter,
  onTypeFilterChange,
  createTransactionMutation,
  updateTransactionMutation,
  deleteTransactionMutation,
}) {
  return (
    <TransactionList
      categories={categories}
      transactions={transactions}
      typeFilter={transactionFilter}
      onTypeFilterChange={onTypeFilterChange}
      createMutation={createTransactionMutation}
      updateMutation={updateTransactionMutation}
      deleteMutation={deleteTransactionMutation}
    />
  );
}
