import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { getProfile, loginUser, logoutUser, registerUser } from "../services/authService.js";
import { useAuthStore } from "../store/authStore.js";

export function useAuth() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { token, user, setToken, setUser, clearAuth } = useAuthStore();

  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled: Boolean(token),
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      setToken(data.token);
      const profile = await queryClient.fetchQuery({
        queryKey: ["profile"],
        queryFn: getProfile,
      });
      setUser(profile);
      navigate("/dashboard");
    },
  });

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: async (data) => {
      setToken(data.token);
      const profile = await queryClient.fetchQuery({
        queryKey: ["profile"],
        queryFn: getProfile,
      });
      setUser(profile);
      navigate("/dashboard");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSettled: () => {
      clearAuth();
      queryClient.clear();
      navigate("/login");
    },
  });

  return {
    token,
    user: profileQuery.data || user,
    profileQuery,
    loginMutation,
    registerMutation,
    logoutMutation,
  };
}
