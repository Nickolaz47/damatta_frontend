// Components
import { Button, Spinner } from "react-bootstrap";
import Message from "../General/Message";
// Hooks
import { useState, useEffect, FormEvent } from "react";
import { useTreatError } from "../../hooks/useTreatError";
// Redux
import { useGetLocatorsQuery } from "../../redux/services/locatorService";
import { useGetRentersQuery } from "../../redux/services/renterService";
import { useCreateRentMutation } from "../../redux/services/rentService";

const RentCreateForm = () => {
  const [LocatorId, setLocatorId] = useState("");
  const [RenterId, setRenterId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [payday, setPayday] = useState("");
  const [value, setValue] = useState("");

  const { treatError } = useTreatError();

  const { data: locators = [] } = useGetLocatorsQuery("");
  const { data: renters = [] } = useGetRentersQuery("");
  const [createRent, { isLoading, error, isSuccess }] = useCreateRentMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (payday) {
      const rent = { LocatorId, RenterId, value, dueDate, payday };
      console.log(rent, 1);
      await createRent(rent);
    } else {
      const rent = { LocatorId, RenterId, value, dueDate };
      console.log(rent, 2);
      await createRent(rent);
    }
  };

  useEffect(() => {
    if (isSuccess && !error) {
      setLocatorId("Escolha o locador");
      setRenterId("Escolha o inquilino");
      setValue("");
      setDueDate("");
      setPayday("");
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
            <h3 className="text-center my-4">Aluguel</h3>
            <form onSubmit={handleSubmit} className="my-3 text-center">
              <div className="form-floating mb-3 text-start">
                <select
                  className="form-select"
                  value={LocatorId}
                  onChange={(e) => setLocatorId(e.target.value)}
                  id="floatingLocator"
                  required
                >
                  <option value={undefined}>Escolha o locador</option>
                  {locators &&
                    locators.map(
                      ({ id, name }: { id: string; name: string }) => (
                        <option key={id} value={id}>
                          {name}
                        </option>
                      )
                    )}
                </select>
                <label className="form-label" htmlFor="floatingLocator">
                  Locador
                </label>
              </div>
              <div className="form-floating mb-3 text-start">
                <select
                  className="form-select"
                  value={RenterId}
                  onChange={(e) => setRenterId(e.target.value)}
                  id="floatingRenter"
                  required
                >
                  <option value={undefined}>Escolha o inquilino</option>
                  {renters &&
                    renters.map(
                      ({ id, name }: { id: string; name: string }) => (
                        <option key={id} value={id}>
                          {name}
                        </option>
                      )
                    )}
                </select>
                <label className="form-label" htmlFor="floatingRenter">
                  Inquilino
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
                  placeholder="Data de Vencimento"
                  value={dueDate || ""}
                  onChange={(e) => setDueDate(e.target.value)}
                  id="floatingDueDate"
                  required
                />
                <label className="form-label" htmlFor="floatingDueDate">
                  Data de Vencimento
                </label>
              </div>
              <div className="form-floating mb-3 text-start">
                <input
                  className="form-control"
                  type="date"
                  placeholder="Data de Pagamento"
                  value={payday || ""}
                  onChange={(e) => setPayday(e.target.value)}
                  id="floatingPayday"
                />
                <label className="form-label" htmlFor="floatingPayday">
                  Data de Pagamento
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

export default RentCreateForm;
