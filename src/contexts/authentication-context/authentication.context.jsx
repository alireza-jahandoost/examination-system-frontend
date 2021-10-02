import { useState, createContext, useContext } from "react";
import { NotificationContext } from "../notification-context/notification.context";
import urlRoutes from "../../constants/urlRoutes.constant";
import axios from "axios";

export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [errors, setErrors] = useState([]);
  const { createNotification } = useContext(NotificationContext);

  const login = async (email, password) => {
    return axios
      .post(
        urlRoutes["login"],
        { email, password },
        {
          headers: {
            accept: "application/json",
          },
        }
      )
      .then((response) => response.data.data)
      .then(({ user, token }) => {
        setUser(user);
        setToken(token);
        setErrors([]);
        createNotification("You logged in successfully", 3000);
        return true;
      })
      .catch((err) => {
        setErrors(["invalid email or password"]);
        return false;
      });
  };

  const register = (email, password, confirmPassword) => {};

  return (
    <AuthenticationContext.Provider value={{ user, login, register, errors }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
