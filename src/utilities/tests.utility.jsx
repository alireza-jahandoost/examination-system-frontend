import { Context as ResponsiveContext } from "react-responsive";

export const wrapWithWidth = (component, size) => {
  return (
    <ResponsiveContext.Provider value={{ width: size }}>
      {component}
    </ResponsiveContext.Provider>
  );
};
