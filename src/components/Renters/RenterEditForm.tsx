// Components
import { Modal, Spinner, Button } from "react-bootstrap";
import Message from "../General/Message";
// Hooks
import { useState, useEffect, Dispatch, FormEvent } from "react";
import { useTreatError } from "../../hooks/useTreatError";
// Redux
import {
  useGetRenterByIdQuery,
  useUpdateRenterMutation,
} from "../../redux/services/renterService";

const RenterEditForm = ({
  show,
  setShow,
  renterId,
}: {
  show: boolean;
  setShow: Dispatch<boolean>;
  renterId: string;
}) => {
  const [name, setName] = useState("");

  const { treatError } = useTreatError();

  const { data: renter = {} } = useGetRenterByIdQuery(renterId, {
    skip: !show,
  });

  useEffect(() => {
    if (Object.keys(renter).length > 0) {
      setName(renter.name);
    }
  }, [renter]);

  const [updateRenter, { isLoading, isSuccess, error }] =
    useUpdateRenterMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await updateRenter({ renterId, renter: { name } });
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
          Editar Inquilino
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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

export default RenterEditForm;
