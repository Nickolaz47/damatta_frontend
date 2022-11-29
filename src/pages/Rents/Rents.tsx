// Components
import RentCreateForm from "../../components/Rents/RentCreateForm";
import RentTable from "../../components/Rents/RentTable";

const Rents = () => {
  return (
    <div className="container-fluid">
      <div className="row m-2">
        <RentCreateForm />
        <RentTable />
      </div>
    </div>
  );
};

export default Rents;
