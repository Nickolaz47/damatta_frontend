// Hooks
import { useSelector } from "react-redux";
// Redux
import { selectCurrentUser } from "../redux/auth/authSlice";

export const useAuth = () => {
  const user = useSelector(selectCurrentUser);
  let auth;

  if (Object.keys(user).length > 0) {
    auth = true;
  } else {
    auth = false;
  }

  return auth;
};
