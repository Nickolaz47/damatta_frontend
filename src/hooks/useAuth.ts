// Hooks
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// Redux
import { selectCurrentUser } from "../redux/auth/authSlice";

export const useAuth = () => {
  const [auth, setAuth] = useState(false);

  const user = useSelector(selectCurrentUser);
  
  useEffect(() => {
    if (Object.keys(user).length > 0) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [user]);

  return auth;
};
