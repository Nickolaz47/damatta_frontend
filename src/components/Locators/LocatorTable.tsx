// Components
import { Spinner } from "react-bootstrap";
import Message from "../General/Message";
import LocatorEditForm from "./LocatorEditForm";
// Hooks
import { useState } from "react";
import { useTreatError } from "../../hooks/useTreatError";
// Redux
import { useGetLocatorsQuery } from "../../redux/services/locatorService";
import { useDeleteLocatorMutation } from "../../redux/services/locatorService";
// Icons
import { BsTrash, BsPencil } from "react-icons/bs";

const LocatorTable = () => {
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState("");

  const { treatError } = useTreatError();
  const { data: locators = [], error, isLoading } = useGetLocatorsQuery("");
  const [deleteLocator] = useDeleteLocatorMutation();

  const handleEdit = (id:string) => {
    setShow(true);
    setEditId(id)
  };

  return (
    <div className="col-sm-8 my-2">
      {error && <Message msg={treatError(error)} type="error" />}
      {isLoading && <Spinner animation="border" variant="warning" />}
      <table className="table table-light table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Número de aluguéis</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {locators &&
            locators.length > 0 &&
            locators.map(
              ({
                id,
                name,
                rentNumbers,
              }: {
                id: string;
                name: string;
                rentNumbers: number;
              }) => (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{rentNumbers}</td>
                  <td>
                    <button
                      className="btn btn-secondary mx-1"
                      onClick={() => handleEdit(id)}
                    >
                      <BsPencil />
                    </button>
                    <button
                      className="btn btn-danger mx-1"
                      onClick={async () => await deleteLocator(id)}
                    >
                      <BsTrash />
                    </button>
                    <LocatorEditForm
                      show={show}
                      setShow={setShow}
                      locatorId={editId}
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

export default LocatorTable;
