// Components
import SaleCreateForm from "../../components/Sales/SaleCreateForm";
import SaleTable from "../../components/Sales/SaleTable";

const Sales = () => {
  return (
    <div className="container-fluid">
      <div className="row m-2">
        <SaleCreateForm />
        <SaleTable />
      </div>
    </div>
  );
};

export default Sales;
