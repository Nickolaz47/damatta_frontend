// Components
import { Spinner } from "react-bootstrap";
import Message from "../General/Message";
// Hooks
import { useTreatError } from "../../hooks/useTreatError";
// Redux
import { useGetLocatorsQuery } from "../../redux/services/locatorService";
import { useDeleteLocatorMutation } from "../../redux/services/locatorService";
// Icons
import { BsTrash, BsPencil } from "react-icons/bs";

const LocatorTable = () => {
  const { treatError } = useTreatError();
  const { data: locators = [], error, isLoading } = useGetLocatorsQuery("");
  const [deleteLocator] = useDeleteLocatorMutation();

  return (
    <div className="col-8 p-2">
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
                    <button className="btn btn-secondary mx-1">
                      <BsPencil />
                    </button>
                    <button
                      className="btn btn-danger mx-1"
                      onClick={async () => await deleteLocator(id)}
                    >
                      <BsTrash />
                    </button>
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
