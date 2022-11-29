// Components
import { Spinner } from "react-bootstrap";
import Message from "../General/Message";
import SaleEditForm from "./SaleEditForm";
// Hooks
import { useState } from "react";
import { useTreatError } from "../../hooks/useTreatError";
import { useFormatDate } from "../../hooks/useFormatDate";
// Redux
import { useGetSalesQuery } from "../../redux/services/saleService";
import { useDeleteSaleMutation } from "../../redux/services/saleService";
// Icons
import { BsTrash, BsPencil } from "react-icons/bs";

const SaleTable = () => {
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState("");

  const { treatError } = useTreatError();
  const { formatDateToUser } = useFormatDate();

  const { data: sales = [], error, isLoading } = useGetSalesQuery("");
  const [deleteSale] = useDeleteSaleMutation();

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
            <th scope="col">Vendedor</th>
            <th scope="col">Comprador</th>
            <th scope="col">Valor</th>
            <th scope="col">Comissão</th>
            <th scope="col">Corretor</th>
            <th scope="col">Data</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {sales &&
            sales.length > 0 &&
            sales.map(
              ({
                id,
                seller,
                buyer,
                value,
                commission,
                agent,
                date,
              }: {
                id: string;
                seller: string;
                buyer: string;
                value: number;
                commission: number;
                agent: string;
                date: string;
              }) => (
                <tr key={id}>
                  <td>{seller}</td>
                  <td>{buyer}</td>
                  <td>
                    {value.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td>
                    {commission.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td>{agent}</td>
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
                      onClick={async () => await deleteSale(id)}
                    >
                      <BsTrash />
                    </button>
                    <SaleEditForm
                      show={show}
                      setShow={setShow}
                      saleId={editId}
                    />
                  </td>
                </tr>
              )
            )}
        </tbody>
      </table>
    </div>
  );
};

export default SaleTable;
