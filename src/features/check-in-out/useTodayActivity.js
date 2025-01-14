import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
  const {
    data: staysToday,
    isPending,
    error,
  } = useQuery({ queryKey: ["staysToday"], queryFn: getStaysTodayActivity });

  return { staysToday, isPending, error };
}
