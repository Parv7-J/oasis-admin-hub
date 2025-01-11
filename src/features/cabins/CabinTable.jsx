import { useSearchParams } from "react-router-dom";

import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import CabinRow from "./CabinRow";

import { useCabins } from "./useCabins";

function CabinTable() {
  const [searchParams] = useSearchParams();
  const { isFetching, cabins } = useCabins();

  if (isFetching) return <Spinner />;

  let filteredCabins;

  if (searchParams.get("discount") === "all") filteredCabins = cabins;
  else if (searchParams.get("discount") === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  else if (searchParams.get("discount") === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  else filteredCabins = cabins;

  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");

  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table role="table" columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
