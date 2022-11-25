// Hooks
import { useDispatch } from "react-redux";
// Redux
import { useLogoutMutation } from "../redux/services/authService";
import { logout as logoutFront } from "../redux/auth/authSlice";

export const useLogout = () => {
  const dispatch = useDispatch();
  const [logout, { isSuccess }] = useLogoutMutation();

  const handleLogout = async () => {
    await logout("");
    if (isSuccess) {
      dispatch(logoutFront());
    }
  };

  return handleLogout;
};
