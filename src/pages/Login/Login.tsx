// Components
import { Container, Form, Button } from "react-bootstrap";
// Hooks
import { useState, FormEvent } from "react";
// Img
import logo from "../../img/logo_damatta_cortado.png";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Container className="login_container" as="section">
      <div className="login">
        <img src={logo} alt="logo" height="110vh" />
        <Form onSubmit={(e) => handleSubmit(e)} className="mt-4 text-center">
          <Form.Group className="mb-2">
            <Form.Label>
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
              />
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label>
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
              />
            </Form.Label>
          </Form.Group>
          <Button className="mt-2 px-4" variant="warning" size="lg" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
