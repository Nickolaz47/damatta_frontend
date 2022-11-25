// Components
import { Container, Button, Spinner } from "react-bootstrap";
import Message from "../../components/General/Message";
// Hooks
import { useState, FormEvent } from "react";
import { useTreatError } from "../../hooks/useTreatError";
import { useDispatch } from "react-redux";
// Redux
import { useLoginMutation } from "../../redux/services/authService";
import { setCredentials } from "../../redux/auth/authSlice";
// Img
import logo from "../../img/logo_damatta_cortado.png";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { treatError } = useTreatError();
  const [login, { isLoading, error }] = useLoginMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const credentials = { name, password };
    const user = await login(credentials);
    if ("data" in user) {
      dispatch(setCredentials(user.data));
    }
  };

  return (
    <Container className="login_container" as="section">
      <div className="login">
        <img src={logo} alt="logo" height="110vh" />
        <form onSubmit={handleSubmit} className="my-3">
          <div className="form-floating mb-3 text-start">
            <input
              className="form-control"
              type="text"
              placeholder="Usuário"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
              id="floatingName"
              required
            />
            <label className="form-label" htmlFor="floatingName">
              Usuário
            </label>
          </div>
          <div className="form-floating mb-3 text-start">
            <input
              className="form-control"
              type="password"
              placeholder="Senha"
              value={password || ""}
              onChange={(e) => setPassword(e.target.value)}
              id="floatingPsetPassword"
              required
            />
            <label className="form-label" htmlFor="floatingPsetPassword">
              Senha
            </label>
          </div>
          {!isLoading && (
            <Button
              className="my-2 px-4"
              variant="warning"
              size="lg"
              type="submit"
            >
              Login
            </Button>
          )}
          {isLoading && <Spinner animation="border" variant="warning" />}
        </form>
        {error && <Message msg={treatError(error)} type="error" />}
      </div>
    </Container>
  );
};

export default Login;
