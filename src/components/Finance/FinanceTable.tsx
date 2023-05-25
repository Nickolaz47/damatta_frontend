// Components
import { Spinner } from "react-bootstrap";
// Hooks
import { useState, useEffect } from "react";
// Redux
import {
  useGetFinanceQuery,
  useGetFinanceTotalQuery,
} from "../../redux/services/financeService";

const FinanceTable = () => {
  const [balance, setBalance] = useState(0);

  const { data: finance = [], isLoading } = useGetFinanceQuery("");
  const { data: financeTotal = {}, isLoading: isLoadingTotal } =
    useGetFinanceTotalQuery("");

  useEffect(() => {
    if (finance.length > 0) {
      setBalance(finance[0].total + finance[1].total - finance[2].total);
    }
  }, [finance]);
  console.log(financeTotal)
  return (
    <div className="col my-2">
      <div
        className="card bg-white text-black"
        style={{ borderRadius: "1rem" }}
      >
        <div className="card-body p-5 text-center">
          <div className="mb-md-1 mt-md-2 pb-2">
            <h3 className="text-center my-2">Finanças</h3>
            {isLoading && <Spinner animation="border" variant="warning" />}
            <div className="fs-5 text-start my-3 py-4 border-top border-bottom">
              {!isLoadingTotal && financeTotal && (
                <div className="mb-1">
                Saldo em caixa:{" "}
                <span className="text-success fw-bold">
                  {financeTotal.balanceTotal.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
              )}
              {!isLoading && finance.length > 0 && (
                <>
                  <div className="mb-1">
                    Total dos aluguéis:{" "}
                    <span className="text-success fw-bold">
                      {finance[0].total.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </div>
                  <div className="mb-1">
                    Total das comissões:{" "}
                    <span className="text-info fw-bold">
                      {finance[1].total.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </div>
                  <div className="mb-1">
                    Total das despesas:{" "}
                    <span className="text-danger fw-bold">
                      {finance[2].total.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </div>
                  <div className="mb-1">
                    Balanço mensal:{" "}
                    <span
                      className={`fw-bold ${
                        balance >= 0 ? "text-success" : "text-danger"
                      }`}
                    >
                      {balance.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceTable;
