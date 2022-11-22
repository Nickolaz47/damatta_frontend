// Components
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
// Img
import logo from "../img/logo_damatta_cortado.png";
import { IoIosLogOut } from "react-icons/io";

const NavMenu = () => {
  const auth = false;

  const navlinks = [
    { name: "Locadores", link: "/locators", side: "left" },
    { name: "Inquilinos", link: "/renters", side: "left" },
    { name: "Aluguéis", link: "/rents", side: "left" },
    { name: "Vendas", link: "/sales", side: "left" },
    { name: "Login", link: "/login", side: "right" },
  ];

  return (
    <Navbar bg="light" variant="light" collapseOnSelect as="nav">
      <Container fluid>
        <Navbar.Brand>
          <img src={logo} alt="logo" height="100px" />
        </Navbar.Brand>
        <Nav className="me-auto mb-2 mb-lg-0">
          {navlinks.map(
            ({ name, link, side }, idx: number) =>
              side === "left" && (
                <NavLink to={link} key={idx}>
                  <Nav.Link>{name}</Nav.Link>
                </NavLink>
              )
          )}
        </Nav>
        <Nav className="d-flex align-items-center">
          {navlinks.map(
            ({ name, link, side }, idx: number) =>
              side === "right" &&
              !auth && (
                <NavLink to={link} key={idx}>
                  <Nav.Link>{name}</Nav.Link>
                </NavLink>
              )
          )}
          {auth && (
            <button className="btn btn-outline-danger btn-sm mx-1">
              <span className="d-flex justify-content-center align-items-center">
                <IoIosLogOut />
                &nbsp;Logout
              </span>
            </button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavMenu;
