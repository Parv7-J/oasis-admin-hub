import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();
  const {
    mutate: checkout,
    isPending: isCheckingOut,
    error,
  } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: "checked-out" }),
    onSuccess: () => {
      toast.success("Booking checked out succesfully");
      queryClient.invalidateQueries({ active: true });
    },
    onError: (error) => toast.error(error.message),
  });

  return { checkout, isCheckingOut, error };
}
