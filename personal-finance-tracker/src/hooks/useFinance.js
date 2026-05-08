import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createTransaction,
  createUser,
  deleteUser,
  deleteTransaction,
  getAdminOverview,
  getCategories,
  getMonthlySummary,
  getTransactions,
  getUsers,
  updateTransaction,
  updateUser,
  uploadProfilePicture,
} from "../services/financeService.js";

export function useFinance(user) {
  const queryClient = useQueryClient();
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const transactionsQuery = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const monthlySummaryQuery = useQuery({
    queryKey: ["monthly-summary", month, year],
    queryFn: () => getMonthlySummary({ month, year }),
  });

  const adminOverviewQuery = useQuery({
    queryKey: ["admin-overview"],
    queryFn: getAdminOverview,
    enabled: user?.role === "admin",
  });

  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    enabled: user?.role === "admin",
  });

  const createTransactionMutation = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["monthly-summary"] });
    },
  });

  const deleteTransactionMutation = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["monthly-summary"] });
    },
  });

  const updateTransactionMutation = useMutation({
    mutationFn: updateTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["monthly-summary"] });
    },
  });

  const uploadProfilePictureMutation = useMutation({
    mutationFn: uploadProfilePicture,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
    },
  });

  return {
    transactionsQuery,
    categoriesQuery,
    monthlySummaryQuery,
    adminOverviewQuery,
    usersQuery,
    createTransactionMutation,
    updateTransactionMutation,
    deleteTransactionMutation,
    uploadProfilePictureMutation,
    createUserMutation,
    updateUserMutation,
    deleteUserMutation,
  };
}
