// Components
import Message from "../../components/General/Message";
import { Spinner } from "react-bootstrap";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  defaults,
} from "chart.js";
import { Pie } from "react-chartjs-2";
// Hooks
import { useTreatError } from "../../hooks/useTreatError";
// Redux
import { useGetFinanceQuery } from "../../redux/services/financeService";

ChartJS.register(ArcElement, Tooltip, Legend);
defaults.font.size = 20;

const PieChart = () => {
  const { treatError } = useTreatError();

  const { data: finance = [], error, isLoading } = useGetFinanceQuery("");

  const data = {
    labels: finance.map(({ name }: { name: string }) => {
      return name;
    }),
    datasets: [
      {
        label: "R$",
        data: finance.map(({ total }: { total: number }) => {
          return total;
        }),
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 99, 132, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="col-sm-8">
      {error && <Message msg={treatError(error)} type="error" />}
      {isLoading && <Spinner animation="border" variant="warning" />}
      {!isLoading && finance && finance.length > 0 && (
        <Pie
          data={data}
          height="500vh"
          width="500vw"
          options={{ maintainAspectRatio: false }}
        />
      )}
    </div>
  );
};

export default PieChart;
