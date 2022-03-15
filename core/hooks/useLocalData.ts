import { useContext } from "react";
import { RootContext } from "../context";

const useLocalData = () => useContext(RootContext);

export default useLocalData;
