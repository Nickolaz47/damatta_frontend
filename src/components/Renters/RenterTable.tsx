// Components
import { Spinner } from "react-bootstrap";
import Message from "../General/Message";
import RenterEditForm from "./RenterEditForm";
// Hooks
import { useState } from "react";
import { useTreatError } from "../../hooks/useTreatError";
// Redux
import { useGetRentersQuery } from "../../redux/services/renterService";
import { useDeleteRenterMutation } from "../../redux/services/renterService";
// Icons
import { BsTrash, BsPencil } from "react-icons/bs";

const RenterTable = () => {
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState("");

  const { treatError } = useTreatError();
  const { data: renters = [], error, isLoading } = useGetRentersQuery("");
  const [deleteRenter] = useDeleteRenterMutation();

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
            <th scope="col">Nome</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {renters &&
            renters.length > 0 &&
            renters.map(({ id, name }: { id: string; name: string }) => (
              <tr key={id}>
                <td>{name}</td>
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
                  <RenterEditForm
                    show={show}
                    setShow={setShow}
                    renterId={editId}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default RenterTable;
