// Components
import { Spinner, Button } from "react-bootstrap";
import Message from "../../components/General/Message";
// Hooks
import { useState } from "react";
import { useTreatError } from "../../hooks/useTreatError";
import { useFormatDate } from "../../hooks/useFormatDate";
// Redux
import {
  useGetHistoricQuery,
  useCreateHistoricMutation,
} from "../../redux/services/historicService";

const Historic = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const months = [
    { label: "Jan", value: 0 },
    { label: "Fev", value: 1 },
    { label: "Mar", value: 2 },
    { label: "Abr", value: 3 },
    { label: "Mai", value: 4 },
    { label: "Jun", value: 5 },
    { label: "Jul", value: 6 },
    { label: "Ago", value: 7 },
    { label: "Set", value: 8 },
    { label: "Out", value: 9 },
    { label: "Nov", value: 10 },
    { label: "Dez", value: 11 },
  ];

  const years = Array.from({ length: 11 }, (_, i) => 2022 + i);

  const { treatError } = useTreatError();
  const { formatDateToUser } = useFormatDate();

  const {
    data: historic = [],
    error,
    isLoading,
  } = useGetHistoricQuery({ month, year });
  const [createHistoric, { error: createError, isLoading: createLoading }] =
    useCreateHistoricMutation();

  const cleanFilters = () => {
    setMonth("");
    setYear("");
  };

  return (
    <div className="container m-3">
      <div className="row justify-content-center">
        <Button
          className="col-sm-2 my-2 px-3"
          variant="warning"
          onClick={async () => await createHistoric("")}
        >
          Salvar histórico
        </Button>
      </div>
      <div className="row">
        <div className="col-12 m-3">
          <div className="row justify-content-center align-items-center">
            <div className="col-xl-2 mb-4">
              <div className="form-floating text-start">
                <select
                  className="form-select"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  id="floatingMonth"
                  required
                >
                  <option value={undefined}>Mês</option>
                  {months.map(
                    ({ label, value }: { label: string; value: number }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    )
                  )}
                </select>
                <label className="form-label" htmlFor="floatingMonth">
                  Mês
                </label>
              </div>
            </div>
            <div className="col-xl-2 mb-4">
              <div className="form-floating text-start">
                <select
                  className="form-select"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  id="floatingYear"
                  required
                >
                  <option value={undefined}>Ano</option>
                  {years.map((year: number) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <label className="form-label" htmlFor="floatingYear">
                  Ano
                </label>
              </div>
            </div>
            <div className="col-xl-2 mb-4">
              <Button
                className="my-2 px-3"
                variant="warning"
                type="submit"
                onClick={cleanFilters}
              >
                Limpar
              </Button>
            </div>
          </div>
        </div>
        <div className="col">
          {createError && (
            <Message msg={treatError(createError)} type="error" />
          )}
          {createLoading && <Spinner animation="border" variant="warning" />}
          {error && <Message msg={treatError(error)} type="error" />}
          {isLoading && <Spinner animation="border" variant="warning" />}
          <table className="table table-light table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Locador</th>
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
      </div>
    </div>
  );
};

export default Historic;
