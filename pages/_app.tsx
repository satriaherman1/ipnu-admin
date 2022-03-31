import "../styles/globals.css";
import "../styles/index.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { Provider } from "../core/context";
import { useMemo, useReducer } from "react";
import reducer from "../core/context/reducer";

function MyApp({ Component, pageProps }: AppProps) {
  const [store, dispatch] = useReducer(reducer, { breadCrumbs: { previousPage: ["Dashboard"], currentPage: "Core" } });
  const contextValue = useMemo(() => ({ store, dispatch }), [store, dispatch]);

  return (
    <Provider value={contextValue}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
