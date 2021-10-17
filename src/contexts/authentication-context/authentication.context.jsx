import { useState, createContext, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { NotificationContext } from "../notification-context/notification.context";
import {
  loginRequest,
  registerRequest,
} from "../../services/authentication/authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [popover, setPopover] = useState("");
  const { createNotification } = useContext(NotificationContext);

  useEffect(() => {
    if (user) {
      setIsUserAuthenticated(true);
    } else {
      setIsUserAuthenticated(false);
      setToken(null);
    }
  }, [user]);

  const showUserLoginPopover = () => {
    setPopover("login");
  };

  const resetErrors = () => {
    if (errors) {
      setErrors({});
    }
  };

  const changePopover = (newPopover) => {
    if (
      newPopover !== "login" &&
      newPopover !== "register" &&
      newPopover !== ""
    ) {
      throw Error("popover is invalid");
    }
    setPopover(newPopover);
  };

  const login = async (email, password) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then((response) => response.data.data)
      .then(({ user, token }) => {
        setUser(user);
        setToken(token);
        setErrors({});
        createNotification("You logged in successfully", 3000);
        setIsLoading(false);
        return true;
      })
      .catch((err) => {
        const correntErrors = errors;
        if (err.response?.data?.data?.message) {
          correntErrors.message = err.response.data.data.message;
        }
        setErrors(correntErrors);
        setIsLoading(false);
        return false;
      });
  };

  const register = (name, email, password, password_confirmation) => {
    setIsLoading(true);
    registerRequest(name, email, password, password_confirmation)
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
      .catch((requestErrors) => {
        const err = requestErrors.response.data;
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

  const redirectIfNotAuthenticated = (component, location) => {
    if (isUserAuthenticated) {
      return component;
    } else {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: { from: location },
          }}
        />
      );
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        login,
        register,
        errors,
        isLoading,
        popover,
        changePopover,
        resetErrors,
        token,
        isUserAuthenticated,
        showUserLoginPopover,
        redirectIfNotAuthenticated,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
