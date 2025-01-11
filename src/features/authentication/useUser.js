import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const {
    isPending,
    data: user,
    error,
  } = useQuery({ queryKey: ["user"], queryFn: getCurrentUser });

  return {
    isPending,
    user,
    error,
    isAuthenticated: user?.role === "authenticated",
  };
}
