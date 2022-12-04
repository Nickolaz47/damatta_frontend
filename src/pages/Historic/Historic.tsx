// Components
import { Spinner } from "react-bootstrap";
import Message from "../../components/General/Message";
// Hooks
import { useTreatError } from "../../hooks/useTreatError";
import { useFormatDate } from "../../hooks/useFormatDate";
// Redux
import { useGetHistoricQuery } from "../../redux/services/historicService";

const Historic = () => {
  const { treatError } = useTreatError();
  const { formatDateToUser } = useFormatDate();

  const { data: historic = [], error, isLoading } = useGetHistoricQuery("");

  return (
    <div className="container m-3">
      {error && <Message msg={treatError(error)} type="error" />}
      {isLoading && <Spinner animation="border" variant="warning" />}
      <table className="table table-light table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Locator</th>
            <th scope="col">Inquilino</th>
            <th scope="col">Valor</th>
            <th scope="col">Data de Vencimento</th>
            <th scope="col">Data de Pagamento</th>
          </tr>
        </thead>
        <tbody>
          {historic &&
            historic.length > 0 &&
            historic.map(
              ({
                id,
                Locator,
                Renter,
                value,
                dueDate,
                payday,
              }: {
                id: string;
                Locator: any;
                Renter: any;
                value: number;
                dueDate: string;
                payday: string;
              }) => (
                <tr key={id}>
                  <td>{Locator.name}</td>
                  <td>{Renter.name}</td>
                  <td>
                    {value.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td>{formatDateToUser(dueDate)}</td>
                  <td>{formatDateToUser(payday)}</td>
                </tr>
              )
            )}
        </tbody>
      </table>
    </div>
  );
};

export default Historic;
