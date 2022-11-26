// Components
import LocatorCreateForm from "../../components/Locators/LocatorCreateForm";
import LocatorTable from "../../components/Locators/LocatorTable";

const Locators = () => {
  return (
    <div className="container-fluid">
      <div className="row m-3">
        <LocatorCreateForm />
        <LocatorTable />
      </div>
    </div>
  );
};

export default Locators;
