// Components
import ExpenseCreateForm from "../../components/Expenses/ExpenseCreateForm";
import ExpenseTable from "../../components/Expenses/ExpenseTable";

const Expenses = () => {
  return (
    <div className="container-fluid">
      <div className="row m-3">
        <ExpenseCreateForm />
        <ExpenseTable/>
      </div>
    </div>
  );
};

export default Expenses;
