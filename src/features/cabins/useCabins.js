import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const {
    isPending: isFetching,
    data: cabins,
    error: fetchError,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { isFetching, cabins, fetchError };
}
