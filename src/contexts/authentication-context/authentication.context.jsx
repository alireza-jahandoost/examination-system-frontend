import { useState, createContext, useContext } from "react";
import { NotificationContext } from "../notification-context/notification.context";
import urlRoutes from "../../constants/urlRoutes.constant";
import axios from "axios";

export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { createNotification } = useContext(NotificationContext);

  const login = async (email, password) => {
    setIsLoading(true);
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
        setIsLoading(false);
        return true;
      })
      .catch((err) => {
        setErrors(["invalid email or password"]);
        setIsLoading(false);
        return false;
      });
  };

  const register = (name, email, password, password_confirmation) => {
    setIsLoading(true);
    return axios
      .post(
        urlRoutes["register"],
        { name, email, password, password_confirmation },
        {
          headers: {
            accept: "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data.hasOwnProperty("errors")) {
          throw response.data;
        }
        return response.data.data;
      })
      .then(({ user, token }) => {
        setUser(user);
        setToken(token);
        setErrors({});
        createNotification("You registered successfully", 3000);
        setIsLoading(false);
        return true;
      })
      .catch((err) => {
        const correntErrors = { ...errors };
        if (err.message) {
          correntErrors.message = err.message;
        }
        if (err.errors) {
          Object.keys(err.errors).forEach((error) => {
            correntErrors[error] = err.errors[error];
          });
        }
        setErrors(correntErrors);
        setIsLoading(false);
        return false;
      });
  };

  return (
    <AuthenticationContext.Provider
      value={{ user, login, register, errors, isLoading }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
