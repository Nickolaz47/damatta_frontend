// Components
import { Spinner } from "react-bootstrap";
import Message from "../General/Message";
// Hooks
import { useState } from "react";
import { useTreatError } from "../../hooks/useTreatError";
import { useFormatDate } from "../../hooks/useFormatDate";
// Redux
import { useGetExpensesQuery } from "../../redux/services/expenseService";
import { useDeleteExpenseMutation } from "../../redux/services/expenseService";
// Icons
import { BsTrash, BsPencil } from "react-icons/bs";

const ExpenseTable = () => {
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState("");

  const { treatError } = useTreatError();
  const { formatDateToUser } = useFormatDate();

  const { data: expenses = [], error, isLoading } = useGetExpensesQuery("");
  const [deleteExpense] = useDeleteExpenseMutation();

  const handleEdit = (id: string) => {
    setShow(true);
    setEditId(id);
  };

  return (
    <div className="col-sm-8 my-2">
      {error && <Message msg={treatError(error)} type="error" />}
      {isLoading && <Spinner animation="border" variant="warning" />}
      <table className="table table-light table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Descrição</th>
            <th scope="col">Valor</th>
            <th scope="col">Data</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {expenses &&
            expenses.length > 0 &&
            expenses.map(
              ({
                id,
                description,
                value,
                date,
              }: {
                id: string;
                description: string;
                value: number;
                date: string;
              }) => (
                <tr key={id}>
                  <td>{description}</td>
                  <td>
                    {value.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td>{formatDateToUser(date)}</td>
                  <td>
                    <button
                      className="btn btn-secondary mx-1"
                      onClick={() => handleEdit(id)}
                    >
                      <BsPencil />
                    </button>
                    <button
                      className="btn btn-danger mx-1"
                      onClick={async () => await deleteExpense(id)}
                    >
                      <BsTrash />
                    </button>
                  </td>
                </tr>
              )
            )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
