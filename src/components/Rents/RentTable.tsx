// Components
import { Spinner } from "react-bootstrap";
import Message from "../General/Message";
import RentEditForm from "./RentEditForm";
// Hooks
import { useState } from "react";
import { useTreatError } from "../../hooks/useTreatError";
import { useFormatDate } from "../../hooks/useFormatDate";
// Redux
import { useGetRentsQuery } from "../../redux/services/rentService";
import { useDeleteRentMutation } from "../../redux/services/rentService";
// Icons
import { BsTrash, BsPencil } from "react-icons/bs";

const RentTable = () => {
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState("");

  const { treatError } = useTreatError();
  const { formatDateToUser } = useFormatDate();

  const { data: rents = [], error, isLoading } = useGetRentsQuery("");
  const [deleteRenter] = useDeleteRentMutation();

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
            <th scope="col">Inquilino</th>
            <th scope="col">Valor</th>
            <th scope="col">Data de Vencimento</th>
            <th scope="col">Data de Pagamento</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {rents &&
            rents.length > 0 &&
            rents.map(
              ({
                id,
                Renter,
                value,
                dueDate,
                payday,
              }: {
                id: string;
                Renter: any;
                value: number;
                dueDate: string;
                payday: string;
              }) => (
                <tr key={id}>
                  <td>{Renter.name}</td>
                  <td>
                    {value.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td>{formatDateToUser(dueDate)}</td>
                  <td>{payday ? formatDateToUser(payday) : payday}</td>
                  <td>
                    <button
                      className="btn btn-secondary mx-1"
                      onClick={() => handleEdit(id)}
                    >
                      <BsPencil />
                    </button>
                    <button
                      className="btn btn-danger mx-1"
                      onClick={async () => await deleteRenter(id)}
                    >
                      <BsTrash />
                    </button>
                    <RentEditForm
                      show={show}
                      setShow={setShow}
                      rentId={editId}
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

export default RentTable;
