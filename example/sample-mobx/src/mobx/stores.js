import React from "react";
import { createStore } from "./createStore";
import { useLocalStore } from "mobx-react";

const storeContext = React.createContext(null);

export const StoreProvider = ({ children }) => {
  const stores = useLocalStore(createStore);
  return (
    <storeContext.Provider value={stores}>{children}</storeContext.Provider>
  );
};

export const useStore = () => {
  const store = React.useContext(storeContext);
  if (!store) {
    throw new Error("You have forgot to use StoreProvider");
  }
  return store;
};
