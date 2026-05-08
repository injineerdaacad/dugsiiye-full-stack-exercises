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
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Select } from "@/components/ui/Select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { adminUserSchema, validateForm } from "@/schemas/formSchemas";
import { Edit, LoaderCircle, Search, Trash2, UserPlus, X } from "lucide-react";
import { useMemo, useState } from "react";

function compareValues(first, second) {
  return String(first ?? "").localeCompare(String(second ?? ""), undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

function UserFormModal({ mode, user, mutation, onClose }) {
  const [errors, setErrors] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    const schema = mode === "create" ? adminUserSchema : adminUserSchema.omit({ password: true });
    const result = validateForm(schema, payload);
    setErrors(result.errors);

    if (!result.data) return;

    if (mode === "create") {
      mutation.mutate(result.data, {
        onSuccess: onClose,
      });
      return;
    }

    mutation.mutate(
      {
        id: user.id,
        payload: result.data,
      },
      {
        onSuccess: onClose,
      }
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm" onPointerDown={onClose}>
      <div className="relative w-full max-w-2xl rounded-lg border bg-white shadow-xl" onPointerDown={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div>
            <h3 className="font-semibold text-slate-900">{mode === "create" ? "Add User" : "Edit User"}</h3>
            <p className="text-sm text-muted-foreground">
              {mode === "create" ? "Create a new account and access role." : "Update account details, role, and status."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border bg-white text-slate-500 transition hover:bg-sky-50 hover:text-sky-700"
            aria-label="Close user modal"
          >
            <X className="size-4" />
          </button>
        </div>

        <form className="grid gap-4 p-5 sm:grid-cols-2" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="modal-user-name">Name</Label>
            <Input id="modal-user-name" name="name" defaultValue={user?.name || ""} placeholder="User name" />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="modal-user-email">Email</Label>
            <Input id="modal-user-email" name="email" type="email" defaultValue={user?.email || ""} placeholder="user@example.com" />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>
          {mode === "create" && (
            <div className="space-y-2">
              <Label htmlFor="modal-user-password">Password</Label>
              <PasswordInput id="modal-user-password" name="password" placeholder="******" />
              {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="modal-user-role">Role</Label>
            <Select id="modal-user-role" name="role" defaultValue={user?.role || "user"}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="modal-user-status">Status</Label>
            <Select id="modal-user-status" name="isActive" defaultValue={String(user?.isActive ?? true)}>
              <option value="true">Active</option>
              <option value="false">Disabled</option>
            </Select>
          </div>

          {mutation.error && <p className="sm:col-span-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">{mutation.error.message}</p>}

          <div className="flex justify-end gap-2 border-t pt-4 sm:col-span-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={mutation.isPending}>
              {mutation.isPending && <LoaderCircle className="animate-spin" />}
              {mode === "create" ? "Create User" : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminUserManagement({
  currentUser,
  users = [],
  usersQuery,
  createUserMutation,
  updateUserMutation,
  deleteUserMutation,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sort, setSort] = useState({ key: "name", direction: "asc" });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [modalState, setModalState] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filteredUsers = useMemo(() => {
    const search = searchTerm.toLowerCase();

    return users
      .filter((user) => {
        const matchesSearch =
          user.name.toLowerCase().includes(search) ||
          user.email.toLowerCase().includes(search) ||
          user.role.toLowerCase().includes(search);
        const matchesRole = roleFilter === "all" || user.role === roleFilter;
        const matchesStatus =
          statusFilter === "all" || String(user.isActive) === statusFilter;

        return matchesSearch && matchesRole && matchesStatus;
      })
      .sort((first, second) => {
        const result = compareValues(first[sort.key], second[sort.key]);
        return sort.direction === "asc" ? result : -result;
      });
  }, [roleFilter, searchTerm, sort.direction, sort.key, statusFilter, users]);
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * pageSize;
  const paginatedUsers = filteredUsers.slice(pageStart, pageStart + pageSize);

  function handleSort(column) {
    setSort((current) => ({
      key: column,
      direction: current.key === column && current.direction === "asc" ? "desc" : "asc",
    }));
  }

  function resetFilters() {
    setSearchTerm("");
    setRoleFilter("all");
    setStatusFilter("all");
    setPage(1);
  }

  function handleDelete() {
    if (!deleteTarget) return;

    deleteUserMutation.mutate(deleteTarget.id, {
      onSuccess: () => setDeleteTarget(null),
    });
  }

  return (
    <Card className="border-sky-100/80 bg-white/95">
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 xl:flex-row xl:items-center">
          <div className="relative min-w-0 flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setPage(1);
              }}
              placeholder="Search users..."
              className="bg-white pl-10"
            />
          </div>
          <Select
            value={roleFilter}
            onChange={(event) => {
              setRoleFilter(event.target.value);
              setPage(1);
            }}
            className="bg-white xl:w-40"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </Select>
          <Select
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value);
              setPage(1);
            }}
            className="bg-white xl:w-40"
          >
            <option value="all">All Status</option>
            <option value="true">Active</option>
            <option value="false">Disabled</option>
          </Select>
          <Button type="button" variant="outline" onClick={resetFilters}>
            Reset
          </Button>
          <Button type="button" onClick={() => setModalState({ mode: "create", user: null })}>
            <UserPlus className="size-4" />
            Add User
          </Button>
        </div>

        {usersQuery.isLoading ? (
          <div className="flex justify-center py-10">
            <LoaderCircle className="animate-spin text-sky-600" />
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <Table className="min-w-[54rem]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">S/N</TableHead>
                  <TableHead><DataSortButton column="name" label="Name" sort={sort} onSort={handleSort} /></TableHead>
                  <TableHead><DataSortButton column="email" label="Email" sort={sort} onSort={handleSort} /></TableHead>
                  <TableHead><DataSortButton column="role" label="Role" sort={sort} onSort={handleSort} /></TableHead>
                  <TableHead><DataSortButton column="isActive" label="Status" sort={sort} onSort={handleSort} /></TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.map((user, index) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium text-slate-500">{pageStart + index + 1}</TableCell>
                    <TableCell>
                      <p className="font-medium text-slate-900">{user.name}</p>
                      {user.id === currentUser?.id && <p className="text-xs text-sky-600">Current user</p>}
                    </TableCell>
                    <TableCell className="text-slate-600">{user.email}</TableCell>
                    <TableCell>
                      <span className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700">{user.role}</span>
                    </TableCell>
                    <TableCell>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${user.isActive ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                        {user.isActive ? "Active" : "Disabled"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setModalState({ mode: "edit", user })}
                        >
                          <Edit className="size-4" />
                          Edit
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setDeleteTarget(user)}
                          disabled={user.id === currentUser?.id}
                        >
                          <Trash2 className="size-4" />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {paginatedUsers.length === 0 && (
                  <TableRow>
                    <TableCell className="py-8 text-center text-muted-foreground" colSpan={6}>
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}

        <DataPagination
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={filteredUsers.length}
          totalPages={totalPages}
          onPageChange={setPage}
          onPageSizeChange={(value) => {
            setPageSize(value);
            setPage(1);
          }}
        />

        {(updateUserMutation.error || deleteUserMutation.error) && (
          <p className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
            {(updateUserMutation.error || deleteUserMutation.error).message}
          </p>
        )}
      </CardContent>

      {modalState && (
        <UserFormModal
          mode={modalState.mode}
          user={modalState.user}
          mutation={modalState.mode === "create" ? createUserMutation : updateUserMutation}
          onClose={() => setModalState(null)}
        />
      )}

      <AlertDialog open={Boolean(deleteTarget)} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent onOverlayClick={() => setDeleteTarget(null)}>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete user?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove {deleteTarget?.name || "this user"} from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleteUserMutation.isPending}>
              {deleteUserMutation.isPending && <LoaderCircle className="animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
