import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { CalendarDays, LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { transactionSchema, validateForm } from "@/schemas/formSchemas";

const selectClassName =
  "border-input bg-background focus:border-ring focus:ring-ring/50 focus-visible:border-ring focus-visible:ring-ring/50 active:border-ring active:ring-ring/50 flex h-9 w-full cursor-pointer rounded-md border px-3 py-1 text-sm shadow-xs outline-none transition-[color,background-color,box-shadow,transform] hover:bg-accent active:ring-[3px] focus:ring-[3px] focus-visible:ring-[3px]";

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function toDateInputValue(value) {
  if (!value) return getToday();

  return new Date(value).toISOString().slice(0, 10);
}

function formatDate(value) {
  if (!value) return "Select date";

  return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
}

export default function TransactionForm({
  categories = [],
  mutation,
  transaction = null,
  mode = "create",
  formRef,
  onSuccess,
}) {
  const [errors, setErrors] = useState({});
  const [dateValue, setDateValue] = useState(() => toDateInputValue(transaction?.date));
  const dateInputRef = useRef(null);
  const isEdit = mode === "edit";

  useEffect(() => {
    setDateValue(toDateInputValue(transaction?.date));
    setErrors({});
  }, [transaction]);

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    const result = validateForm(transactionSchema, payload);
    setErrors(result.errors);

    if (result.data) {
      const mutationPayload = isEdit
        ? {
            id: transaction._id,
            payload: result.data,
          }
        : result.data;

      mutation.mutate(mutationPayload, {
        onSuccess: () => {
          form.reset();
          setDateValue(toDateInputValue(transaction?.date));
          onSuccess?.();
        },
      });
    }
  }

  function handleDatePickerOpen() {
    const input = dateInputRef.current;

    if (input?.showPicker) {
      input.showPicker();
      return;
    }

    input?.click();
  }

  return (
    <Card ref={formRef} className="border-0 bg-white shadow-none">
      <CardHeader>
        <CardTitle className="text-slate-900">{isEdit ? "Edit Transaction" : "Add Transaction"}</CardTitle>
        <CardDescription>
          {isEdit ? "Update income or expense record details." : "Create income or expense records for your account."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {mutation.error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {mutation.error.message}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="transaction-title">Title</Label>
            <Input
              id="transaction-title"
              name="title"
              defaultValue={transaction?.title || ""}
              placeholder="Salary, rent, food..."
            />
            {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              min="0"
              defaultValue={transaction?.amount || ""}
              placeholder="100"
            />
            {errors.amount && <p className="text-sm text-destructive">{errors.amount}</p>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <select id="type" name="type" className={selectClassName} defaultValue={transaction?.type || "income"}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              {errors.type && <p className="text-sm text-destructive">{errors.type}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select id="category" name="category" className={selectClassName} defaultValue={transaction?.category || ""}>
                {categories.map((category) => (
                  <option key={`${category.type}-${category.name}`} value={category.name}>
                    {category.name} ({category.type})
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <div className="relative">
              <button
                type="button"
                onClick={handleDatePickerOpen}
                className="border-input bg-background focus:border-ring focus:ring-ring/50 flex h-9 w-full cursor-pointer items-center justify-between rounded-md border px-3 py-1 text-sm shadow-xs outline-none transition-[color,background-color,box-shadow,transform] hover:-translate-y-0.5 hover:bg-accent/50 hover:border-ring/60 active:translate-y-0 active:border-ring active:ring-[3px] active:ring-ring/50"
              >
                <span className="flex-1 text-left">{formatDate(dateValue)}</span>
                <CalendarDays className="size-4 text-muted-foreground" />
              </button>
              <input
                ref={dateInputRef}
                id="date"
                name="date"
                type="date"
                value={dateValue}
                onChange={(event) => setDateValue(event.target.value)}
                className="pointer-events-none absolute inset-0 h-full w-full opacity-0"
                tabIndex={-1}
                aria-hidden="true"
              />
            </div>
            {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
          </div>

          <Button className="w-full" disabled={mutation.isPending}>
            {mutation.isPending ? (
              <span className="flex items-center gap-2">
                <LoaderCircle className="animate-spin" />
                Saving...
              </span>
            ) : (
              isEdit ? "Save Changes" : "Save Transaction"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
