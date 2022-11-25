// Components
import { Container, Form, Button, Spinner } from "react-bootstrap";
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
    if ("data" in user && !error) {
      dispatch(setCredentials(user.data));
    }
  };

  return (
    <Container className="login_container" as="section">
      <div className="login">
        <img src={logo} alt="logo" height="110vh" />
        <Form onSubmit={(e) => handleSubmit(e)} className="mt-4 text-center">
          <Form.Group className="mb-2">
            <Form.Label className="text-start">
              Usuário
              <Form.Control
                type="text"
                size="sm"
                style={{ width: "17.5em" }}
                name="usuario"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                autoFocus
                required
              />
            </Form.Label>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label className="text-start">
              Senha
              <Form.Control
                type="password"
                size="sm"
                style={{ width: "17.5em" }}
                name="senha"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                required
              />
            </Form.Label>
          </Form.Group>
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
        </Form>
        {error && <Message msg={treatError(error)} type="error" />}
      </div>
    </Container>
  );
};

export default Login;
