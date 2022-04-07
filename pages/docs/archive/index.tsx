import { useEffect } from "react";
import MainContent from "../../../components/mainContent";
import Navigation from "../../../components/navigation";
import useLocalData from "../../../core/hooks/useLocalData";

export default function Archive() {
  const { dispatch } = useLocalData();
  useEffect(() => {
    const breadCrumbs = {
      previousPage: ["Dashboard", "Docs"],
      currentPage: "Archive",
    };
    dispatch({
      type: "CHANGE_BREADCRUMBS",
      breadCrumbs: breadCrumbs,
    });
  }, []);
  return (
    <div className="flex">
      <Navigation />
      <MainContent>hi</MainContent>
    </div>
  );
}
