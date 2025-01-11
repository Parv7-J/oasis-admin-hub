import { useQuery } from "@tanstack/react-query";

import { getSettings as fetchSettings } from "../../services/apiSettings";

export function useSettings() {
  const {
    data: settings,
    error,
    isPending,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: fetchSettings,
  });

  return { settings, error, isPending };
}
