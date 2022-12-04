// Components
import PieChart from "../../components/Finance/PieChart";
import FinanceTable from "../../components/Finance/FinanceTable";

const Finance = () => {
  return (
    <div className="container-fluid m-5">
      <div className="row m-3">
        <FinanceTable />
        <PieChart />
      </div>
    </div>
  );
};

export default Finance;
