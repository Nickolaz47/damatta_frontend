// Components
import { Button, Spinner } from "react-bootstrap";
import Message from "../General/Message";
// Hooks
import { useState, useEffect, useRef, FormEvent } from "react";
import { useTreatError } from "../../hooks/useTreatError";
// Redux
import { useCreateSaleMutation } from "../../redux/services/saleService";

const SaleCreateForm = () => {
  const [seller, setSeller] = useState("");
  const [buyer, setBuyer] = useState("");
  const [value, setValue] = useState("");
  const [commission, setCommission] = useState("");
  const [agent, setAgent] = useState("");
  const [date, setDate] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const { treatError } = useTreatError();
  const [createSale, { isLoading, isSuccess, error }] = useCreateSaleMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const sale = { seller, buyer, value, commission, agent, date };
    await createSale(sale);
  };

  useEffect(() => {
    if (isSuccess && !error) {
      setSeller("");
      setBuyer("");
      setValue("");
      setCommission("");
      setAgent("");
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
            <h3 className="text-center my-4">Cadastro</h3>
            <form onSubmit={handleSubmit} className="my-3 text-center">
              <div className="form-floating mb-3 text-start">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Vendedor"
                  value={seller || ""}
                  onChange={(e) => setSeller(e.target.value)}
                  id="floatingSeller"
                  ref={inputRef}
                  required
                />
                <label className="form-label" htmlFor="floatingSeller">
                  Vendedor
                </label>
              </div>
              <div className="form-floating mb-3 text-start">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Comprador"
                  value={buyer || ""}
                  onChange={(e) => setBuyer(e.target.value)}
                  id="floatingBuyer"
                  required
                />
                <label className="form-label" htmlFor="floatingBuyer">
                  Comprador
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
                  type="number"
                  placeholder="Comissão"
                  value={commission || ""}
                  onChange={(e) => setCommission(e.target.value)}
                  id="floatingCommission"
                  required
                />
                <label className="form-label" htmlFor="floatingCommission">
                  Comissão
                </label>
              </div>
              <div className="form-floating mb-3 text-start">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Corretor"
                  value={agent || ""}
                  onChange={(e) => setAgent(e.target.value)}
                  id="floatingAgent"
                  required
                />
                <label className="form-label" htmlFor="floatingAgent">
                  Corretor
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

export default SaleCreateForm;
