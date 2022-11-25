// Components
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
// Hooks
import { useAuth } from "../hooks/useAuth";
import { useLogout } from "../hooks/useLogout";
// Img
import logo from "../img/logo_damatta_cortado.png";
import { IoIosLogOut } from "react-icons/io";

const NavMenu = () => {
  const auth = useAuth();
  const handleLogout = useLogout();

  const navlinks = [
    { name: "Locadores", link: "/locators", side: "left" },
    { name: "Inquilinos", link: "/renters", side: "left" },
    { name: "Aluguéis", link: "/rents", side: "left" },
    { name: "Vendas", link: "/sales", side: "left" },
    { name: "Login", link: "/login", side: "right" },
  ];

  return (
    <Navbar
      bg="light"
      variant="light"
      sticky="top"
      collapseOnSelect={true}
      as="nav"
    >
      <Container fluid>
        <Navbar.Brand>
          <img src={logo} alt="logo" height="60vh" />
        </Navbar.Brand>
        <Nav className="me-auto mb-2 mb-lg-0">
          {navlinks.map(
            ({ name, link, side }, idx: number) =>
              side === "left" &&
              auth && (
                <li className="nav-item" key={idx}>
                  <NavLink to={link} className="nav-link" end>
                    {name}
                  </NavLink>
                </li>
              )
          )}
        </Nav>
        <Nav className="d-flex align-items-center">
          {navlinks.map(
            ({ name, link, side }, idx: number) =>
              side === "right" &&
              !auth && (
                <li className="nav-item" key={idx}>
                  <NavLink to={link} className="nav-link" end>
                    {name}
                  </NavLink>
                </li>
              )
          )}
          {auth && (
            <button
              className="btn btn-outline-danger btn-sm mx-1"
              onClick={() => handleLogout()}
            >
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
