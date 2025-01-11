import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import { useCabins } from "../cabins/useCabins";
import Stats from "./Stats";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { data: recentBookings, isPending: isPending1 } = useRecentBookings();
  const { isPending: isPending2, confirmedStays, numDays } = useRecentStays();
  const { cabins, isFetching: isPending3 } = useCabins();
  if (isPending1 || isPending2 || isPending3) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={recentBookings}
        stays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
