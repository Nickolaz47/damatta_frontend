// Components
import { NavLink } from "react-router-dom";
// Hooks
import { useAuth } from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
// Redux
import { useLogoutMutation } from "../../redux/services/authService";
import { logout as logoutFront } from "../../redux/auth/authSlice";
// Img
import logo from "../../img/logo_damatta_cortado.png";
import { IoIosLogOut } from "react-icons/io";

const NavMenu = () => {
  const auth = useAuth();

  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

  const navlinks = [
    { name: "Locadores", link: "/locators", side: "left" },
    { name: "Inquilinos", link: "/renters", side: "left" },
    { name: "Aluguéis", link: "/rents", side: "left" },
    { name: "Vendas", link: "/sales", side: "left" },
    { name: "Login", link: "/login", side: "right" },
  ];

  const handleLogout = async () => {
    await logout("");
    dispatch(logoutFront());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-warning sticky-top">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-brand">
            <img src={logo} alt="logo" height="60vh" />
          </div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
          </ul>
        </div>
        <div className="d-flex align-items-center">
          {navlinks.map(
            ({ name, link, side }, idx: number) =>
              side === "right" &&
              !auth && (
                <NavLink to={link} key={idx} className="nav-link" end>
                  {name}
                </NavLink>
              )
          )}
          {auth && (
            <button
              className="btn btn-outline-danger btn-sm mx-1"
              onClick={handleLogout}
            >
              <span className="d-flex justify-content-center align-items-center">
                <IoIosLogOut />
                &nbsp;Logout
              </span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;
