// Components
import { Modal, Spinner, Button } from "react-bootstrap";
import Message from "../General/Message";
// Hooks
import { useState, useEffect, Dispatch, FormEvent } from "react";
import { useTreatError } from "../../hooks/useTreatError";
// Redux
import {
  useGetSaleByIdQuery,
  useUpdateSaleMutation,
} from "../../redux/services/saleService";
import { useFormatDate } from "../../hooks/useFormatDate";

const SaleEditForm = ({
  show,
  setShow,
  saleId,
}: {
  show: boolean;
  setShow: Dispatch<boolean>;
  saleId: string;
}) => {
  const [seller, setSeller] = useState("");
  const [buyer, setBuyer] = useState("");
  const [value, setValue] = useState("");
  const [commission, setCommission] = useState("");
  const [agent, setAgent] = useState("");
  const [date, setDate] = useState("");

  const { treatError } = useTreatError();
  const { formatDateToFront } = useFormatDate();

  const { data: sale = {} } = useGetSaleByIdQuery(saleId, {
    skip: !show,
  });

  useEffect(() => {
    if (Object.keys(sale).length > 0) {
      setSeller(sale.seller);
      setBuyer(sale.buyer);
      setValue(sale.value);
      setCommission(sale.commission);
      setAgent(sale.agent);
      setDate(sale.date);
    }
  }, [sale]);

  const [updateSale, { isLoading, isSuccess, error }] = useUpdateSaleMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const sale = {
      seller,
      buyer,
      value,
      commission,
      agent,
      date: formatDateToFront(date),
    };
    await updateSale({ saleId, sale });
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
              placeholder="Vendedor"
              value={seller || ""}
              onChange={(e) => setSeller(e.target.value)}
              id="floatingSeller"
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
        {error && <Message msg={treatError(error)} type="error" />}
      </Modal.Body>
    </Modal>
  );
};

export default SaleEditForm;
