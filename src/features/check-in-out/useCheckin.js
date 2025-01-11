import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const { bookingId } = useParams();

  const {
    mutate: checkin,
    isPending: isCheckingIn,
    error,
  } = useMutation({
    mutationFn: (updates) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...updates,
      }),
    onSuccess: () => {
      toast.success(`Booking #${bookingId} checked in successfully`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { checkin, isCheckingIn, error };
}
