// Components
import { Modal, Spinner, Button } from "react-bootstrap";
import Message from "../General/Message";
// Hooks
import { useState, useEffect, Dispatch, FormEvent } from "react";
import { useTreatError } from "../../hooks/useTreatError";
import { useFormatDate } from "../../hooks/useFormatDate";
// Redux
import { useGetLocatorsQuery } from "../../redux/services/locatorService";
import { useGetRentersQuery } from "../../redux/services/renterService";
import {
  useGetRentByIdQuery,
  useUpdateRentMutation,
} from "../../redux/services/rentService";

const RentEditForm = ({
  show,
  setShow,
  rentId,
}: {
  show: boolean;
  setShow: Dispatch<boolean>;
  rentId: string;
}) => {
  const [LocatorId, setLocatorId] = useState("");
  const [RenterId, setRenterId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [payday, setPayday] = useState("");
  const [value, setValue] = useState("");

  const { treatError } = useTreatError();
  const { formatDateToFront } = useFormatDate();

  const { data: locators = [] } = useGetLocatorsQuery("", { skip: !show });
  const { data: renters = [] } = useGetRentersQuery("", { skip: !show });
  const { data: rent = {} } = useGetRentByIdQuery(rentId, { skip: !show });
  const [updateRent, { isLoading, error, isSuccess }] = useUpdateRentMutation();

  useEffect(() => {
    if (Object.keys(rent).length > 0) {
      setLocatorId(rent.LocatorId);
      setRenterId(rent.RenterId);
      setValue(rent.value);
      setDueDate(rent.dueDate);
      setPayday(rent.payday);
    }
  }, [rent]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (payday) {
      const rent = {
        LocatorId,
        RenterId,
        value,
        dueDate: formatDateToFront(dueDate),
        payday: formatDateToFront(payday),
      };
      await updateRent({ rentId, rent });
    } else {
      const rent = {
        LocatorId,
        RenterId,
        value,
        dueDate: formatDateToFront(dueDate),
      };
      await updateRent({ rentId, rent });
    }
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
          Editar Aluguel
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
                locators.map(({ id, name }: { id: string; name: string }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
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
                renters.map(({ id, name }: { id: string; name: string }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
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
              value={formatDateToFront(dueDate) || ""}
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
              value={payday ? formatDateToFront(payday) : payday || ""}
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
              Editar
            </Button>
          )}
          {isLoading && <Spinner animation="border" variant="warning" />}
        </form>
        {error && <Message msg={treatError(error)} type="error" />}
      </Modal.Body>
    </Modal>
  );
};

export default RentEditForm;
