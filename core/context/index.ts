import { createContext } from "react";

export const RootContext = createContext({} as ILocalData);
export const Provider = RootContext.Provider;
