// Components
import RenterCreateForm from "../../components/Renters/RenterCreateForm";
import RenterTable from "../../components/Renters/RenterTable";

const Renters = () => {
  return (
    <div className="container-fluid">
      <div className="row m-3">
        <RenterCreateForm />
        <RenterTable/>
      </div>
    </div>
  );
};

export default Renters;
