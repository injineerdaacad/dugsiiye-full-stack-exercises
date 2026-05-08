import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/AlertDialog";
import DataPagination from "@/components/data/DataPagination";
import DataSortButton from "@/components/data/DataSortButton";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { DateInput } from "@/components/ui/DateInput";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import TransactionForm from "@/components/finance/TransactionForm";
import {
  Edit,
  LoaderCircle,
  Plus,
  Search,
  Trash2,
  WalletCards,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

function money(value = 0) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function capitalize(value = "") {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function transactionId(transaction) {
  return transaction._id || transaction.id;
}

function formatDate(value) {
  if (!value) return "-";

  return new Date(value).toLocaleDateString("en-US");
}

function compareValues(first, second, key) {
  if (key === "amount") return Number(first ?? 0) - Number(second ?? 0);
  if (key === "date") return new Date(first ?? 0).getTime() - new Date(second ?? 0).getTime();

  return String(first ?? "").localeCompare(String(second ?? ""), undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

function TransactionModal({ categories, mode, mutation, transaction, onClose }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm"
      onPointerDown={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-lg border bg-white shadow-xl"
        onPointerDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-sky-100 bg-white text-slate-500 shadow-sm transition hover:-translate-y-0.5 hover:bg-sky-50 hover:text-sky-700 active:translate-y-0"
          aria-label="Close transaction modal"
        >
          <X className="size-4" />
        </button>
        <TransactionForm
          categories={categories}
          mode={mode}
          mutation={mutation}
          transaction={transaction}
          onSuccess={onClose}
        />
      </div>
    </div>
  );
}

export default function TransactionList({
  categories = [],
  transactions = [],
  typeFilter = "all",
  onTypeFilterChange,
  createMutation,
  updateMutation,
  deleteMutation,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sort, setSort] = useState({ key: "date", direction: "desc" });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [modalState, setModalState] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const categoryOptions = useMemo(
    () => [...new Set(categories.map((category) => category.name))].sort(),
    [categories]
  );

  const filteredTransactions = useMemo(() => {
    const search = searchTerm.toLowerCase();
    const startDate = dateFrom ? new Date(`${dateFrom}T00:00:00`) : null;
    const endDate = dateTo ? new Date(`${dateTo}T23:59:59`) : null;

    return transactions
      .filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        const matchesSearch =
          transaction.title.toLowerCase().includes(search) ||
          transaction.category.toLowerCase().includes(search) ||
          transaction.type.toLowerCase().includes(search);
        const matchesType =
          typeFilter === "income" || typeFilter === "expense" ? transaction.type === typeFilter : true;
        const matchesCategory = categoryFilter === "all" || transaction.category === categoryFilter;
        const matchesDateFrom = startDate ? transactionDate >= startDate : true;
        const matchesDateTo = endDate ? transactionDate <= endDate : true;

        return matchesSearch && matchesType && matchesCategory && matchesDateFrom && matchesDateTo;
      })
      .sort((first, second) => {
        const result = compareValues(first[sort.key], second[sort.key], sort.key);
        return sort.direction === "asc" ? result : -result;
      });
  }, [categoryFilter, dateFrom, dateTo, searchTerm, sort.direction, sort.key, transactions, typeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * pageSize;
  const paginatedTransactions = filteredTransactions.slice(pageStart, pageStart + pageSize);

  function handleSort(column) {
    setSort((current) => ({
      key: column,
      direction: current.key === column && current.direction === "asc" ? "desc" : "asc",
    }));
  }

  function resetFilters() {
    setSearchTerm("");
    setCategoryFilter("all");
    setDateFrom("");
    setDateTo("");
    onTypeFilterChange?.("all");
    setPage(1);
  }

  function handleDelete() {
    if (!deleteTarget) return;

    deleteMutation.mutate(transactionId(deleteTarget), {
      onSuccess: () => setDeleteTarget(null),
    });
  }

  return (
    <Card className="border-sky-100/80 bg-white/95">
      <CardContent className="space-y-4">
        <div className="text-center text-sm font-medium text-slate-700">
          <span className="text-base font-semibold text-slate-900">Transactions:</span>{" "}
          {filteredTransactions.length} Records Found
        </div>

        <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 xl:flex-row xl:flex-wrap xl:items-center">
          <div className="relative min-w-0 flex-1 xl:min-w-72 xl:max-w-md">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setPage(1);
              }}
              placeholder="Search Transactions..."
              className="bg-white pl-10"
            />
          </div>
          <Select
            value={typeFilter}
            onChange={(event) => {
              onTypeFilterChange?.(event.target.value);
              setPage(1);
            }}
            className="bg-white xl:w-40"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </Select>
          <Select
            value={categoryFilter}
            onChange={(event) => {
              setCategoryFilter(event.target.value);
              setPage(1);
            }}
            className="bg-white xl:w-52"
          >
            <option value="all">All Categories</option>
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
          <DateInput
              id="transaction-date-from"
              value={dateFrom}
              onChange={(event) => {
                setDateFrom(event.target.value);
                setPage(1);
              }}
              placeholder="From Date"
              aria-label="From date"
              className="xl:w-40"
          />
          <DateInput
              id="transaction-date-to"
              value={dateTo}
              onChange={(event) => {
                setDateTo(event.target.value);
                setPage(1);
              }}
              placeholder="To Date"
              aria-label="To date"
              className="xl:w-40"
          />
          <div className="flex gap-2 xl:ml-auto">
            <Button type="button" variant="outline" onClick={resetFilters}>
              Reset
            </Button>
            <Button type="button" onClick={() => setModalState({ mode: "create", transaction: null })}>
              <Plus className="size-4" />
              Add Transaction
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <Table className="min-w-[56rem]">
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">S/N</TableHead>
                <TableHead><DataSortButton column="title" label="Title" sort={sort} onSort={handleSort} /></TableHead>
                <TableHead><DataSortButton column="category" label="Category" sort={sort} onSort={handleSort} /></TableHead>
                <TableHead><DataSortButton column="type" label="Type" sort={sort} onSort={handleSort} /></TableHead>
                <TableHead><DataSortButton column="date" label="Date" sort={sort} onSort={handleSort} /></TableHead>
                <TableHead className="text-right"><DataSortButton column="amount" label="Amount" sort={sort} onSort={handleSort} /></TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTransactions.map((transaction, index) => (
                <TableRow key={transactionId(transaction)}>
                  <TableCell className="font-medium text-slate-500">{pageStart + index + 1}</TableCell>
                  <TableCell className="font-medium text-slate-900">{transaction.title}</TableCell>
                  <TableCell className="text-slate-600">{transaction.category}</TableCell>
                  <TableCell>
                    <Badge
                      variant={transaction.type === "income" ? "default" : "secondary"}
                      className={transaction.type === "income" ? "bg-sky-500" : "bg-sky-100 text-sky-800"}
                    >
                      {capitalize(transaction.type)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-600">{formatDate(transaction.date)}</TableCell>
                  <TableCell className={`text-right font-semibold ${transaction.type === "income" ? "text-emerald-600" : "text-rose-600"}`}>
                    {transaction.type === "income" ? "+" : "-"}
                    {money(transaction.amount)}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setModalState({ mode: "edit", transaction })}
                      >
                        <Edit className="size-4" />
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setDeleteTarget(transaction)}
                      >
                        <Trash2 className="size-4" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {paginatedTransactions.length === 0 && (
                <TableRow>
                  <TableCell className="py-12 text-center" colSpan={7}>
                    <WalletCards className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-sm font-medium text-foreground">No Transactions Found</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Create a transaction to start tracking your money.</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <DataPagination
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={filteredTransactions.length}
          totalPages={totalPages}
          onPageChange={setPage}
          onPageSizeChange={(value) => {
            setPageSize(value);
            setPage(1);
          }}
        />

        {(updateMutation.error || deleteMutation.error) && (
          <p className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
            {(updateMutation.error || deleteMutation.error).message}
          </p>
        )}
      </CardContent>

      {modalState && (
        <TransactionModal
          categories={categories}
          mode={modalState.mode}
          mutation={modalState.mode === "create" ? createMutation : updateMutation}
          transaction={modalState.transaction}
          onClose={() => setModalState(null)}
        />
      )}

      <AlertDialog open={Boolean(deleteTarget)} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent onOverlayClick={() => setDeleteTarget(null)}>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Transaction?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove {deleteTarget?.title || "this transaction"} from your records.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending && <LoaderCircle className="animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
