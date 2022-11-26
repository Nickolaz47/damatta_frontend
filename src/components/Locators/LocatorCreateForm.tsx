// Components
import { Button, Spinner } from "react-bootstrap";
import Message from "../General/Message";
// Hooks
import { useState, useEffect, FormEvent } from "react";
import { useTreatError } from "../../hooks/useTreatError";
// Redux
import { useCreateLocatorMutation } from "../../redux/services/locatorService";

const LocatorCreateForm = () => {
  const [name, setName] = useState("");

  const { treatError } = useTreatError();
  const [createLocator, { isLoading, isSuccess, error }] =
    useCreateLocatorMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createLocator({ name });
  };

  useEffect(() => {
    if (isSuccess && !error) {
      setName("");
    }
  }, [isSuccess, error]);

  return (
    <div className="col border p-4">
      <h3 className="text-center my-4">Cadastro de Locator</h3>
      <form onSubmit={handleSubmit} className="my-3 text-center">
        <div className="form-floating mb-3 text-start">
          <input
            className="form-control"
            type="text"
            placeholder="Nome"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
            id="floatingName"
            required
          />
          <label className="form-label" htmlFor="floatingName">
            Nome
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
  );
};

export default LocatorCreateForm;
