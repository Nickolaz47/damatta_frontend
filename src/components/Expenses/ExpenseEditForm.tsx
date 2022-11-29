// Components
import { Modal, Button, Spinner } from "react-bootstrap";
import Message from "../General/Message";
// Hooks
import { useState, useEffect, Dispatch, FormEvent } from "react";
import { useFormatDate } from "../../hooks/useFormatDate";
import { useTreatError } from "../../hooks/useTreatError";
// Redux
import {
  useGetExpenseByIdQuery,
  useUpdateExpenseMutation,
} from "../../redux/services/expenseService";

const ExpenseEditForm = ({
  show,
  setShow,
  expenseId,
}: {
  show: boolean;
  setShow: Dispatch<boolean>;
  expenseId: string;
}) => {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");

  const { treatError } = useTreatError();
  const { formatDateToFront } = useFormatDate();

  const { data: expense = {} } = useGetExpenseByIdQuery(expenseId, {
    skip: !show,
  });

  useEffect(() => {
    if (Object.keys(expense).length > 0) {
      setDescription(expense.description);
      setValue(expense.value);
      setDate(expense.date);
    }
  }, [expense]);

  const [updateExpense, { isLoading, isSuccess, error }] =
    useUpdateExpenseMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await updateExpense({
      expenseId,
      expense: { description, value, date: formatDateToFront(date) },
    });
  };

  useEffect(() => {
    if (isSuccess && !error) {
      setShow(false);
    }
  }, [isSuccess, error, setShow]);

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      animation={true}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Editar Locator
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="my-3 text-center">
          <div className="form-floating mb-3 text-start">
            <input
              className="form-control"
              type="text"
              placeholder="Descrição"
              value={description || ""}
              onChange={(e) => setDescription(e.target.value)}
              id="floatingDescription"
              required
            />
            <label className="form-label" htmlFor="floatingDescription">
              Descrição
            </label>
          </div>
          <div className="form-floating mb-3 text-start">
            <input
              className="form-control"
              type="number"
              placeholder="Valor"
              value={value || ""}
              onChange={(e) => setValue(e.target.value)}
              id="floatingValue"
              required
            />
            <label className="form-label" htmlFor="floatingValue">
              Valor
            </label>
          </div>
          <div className="form-floating mb-3 text-start">
            <input
              className="form-control"
              type="date"
              placeholder="Data"
              value={formatDateToFront(date) || ""}
              onChange={(e) => setDate(e.target.value)}
              id="floatingDate"
              required
            />
            <label className="form-label" htmlFor="floatingDate">
              Data
            </label>
          </div>
          {!isLoading && (
            <Button className="my-2 px-4" variant="warning" type="submit">
              Editar
            </Button>
          )}
          {isLoading && <Spinner animation="border" variant="warning" />}
        </form>
      </Modal.Body>
      <Modal.Footer>
        {error && <Message msg={treatError(error)} type="error" />}
      </Modal.Footer>
    </Modal>
  );
};

export default ExpenseEditForm;
