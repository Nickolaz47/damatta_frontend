// Components
import { Button, Spinner } from "react-bootstrap";
import Message from "../General/Message";
// Hooks
import { useState, useEffect, useRef, FormEvent } from "react";
import { useTreatError } from "../../hooks/useTreatError";
// Redux
import { useCreateExpenseMutation } from "../../redux/services/expenseService";

const ExpenseCreateForm = () => {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const { treatError } = useTreatError();

  const [createExpense, { isLoading, error, isSuccess }] =
    useCreateExpenseMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createExpense({ description, value, date });
  };

  useEffect(() => {
    if (isSuccess && !error) {
      setDescription("");
      setValue("");
      setDate("");
      inputRef.current?.focus();
    }
  }, [isSuccess, error]);

  return (
    <div className="col my-2">
      <div
        className="card bg-white text-black"
        style={{ borderRadius: "1rem" }}
      >
        <div className="card-body p-5 text-center">
          <div className="mb-md-1 mt-md-2 pb-2">
            <h3 className="text-center my-4">Despesa</h3>
            <form onSubmit={handleSubmit} className="my-3 text-center">
              <div className="form-floating mb-3 text-start">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Descrição"
                  value={description || ""}
                  onChange={(e) => setDescription(e.target.value)}
                  id="floatingDescription"
                  ref={inputRef}
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
                  value={date || ""}
                  onChange={(e) => setDate(e.target.value)}
                  id="floatingDate"
                  required
                />
                <label className="form-label" htmlFor="floatingDate">
                  Data
                </label>
              </div>
              {!isLoading && (
                <Button
                  className="my-2 px-4"
                  variant="warning"
                  size="lg"
                  type="submit"
                >
                  Cadastrar
                </Button>
              )}
              {isLoading && <Spinner animation="border" variant="warning" />}
            </form>
            {error && <Message msg={treatError(error)} type="error" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCreateForm;
