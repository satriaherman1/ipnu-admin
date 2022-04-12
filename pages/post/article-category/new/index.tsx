import { NextPage } from "next";
import { useEffect, useState } from "react";
import Navigation from "../../../../components/navigation";
import { useRouter } from "next/router";

import useLocalData from "../../../../core/hooks/useLocalData";
import useRouteGuard from "../../../../core/hooks/useRouteGuard";
import CategoriesForm from "../../../../components/pages/post/article-category/form";
import { ArticleCategoryRestService } from "../../../../service/rest/article-categories-rest.service";

const NewCategories: NextPage = () => {
  const [categories, setCategories] = useState<IArticleCategoriesData>({} as IArticleCategoriesData);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const router = useRouter();
  const categoriesRest = new ArticleCategoryRestService();
  const { dispatch } = useLocalData();

  const submitNewCategories = async () => {
    setSubmitLoading(true);
    try {
      await categoriesRest.createCategories(categories);
      setOpenAlert(true);
      setAlertMessage("Berhasil Menambahkan Kategori");
      setTimeout(() => router.push("/post/article"), 2000);
    } catch (err) {}
    setSubmitLoading(false);
  };

  useEffect(() => {
    const breadCrumbs = {
      previousPage: ["Dashboard", "Post", "Categories"],
      currentPage: "New",
    };
    dispatch({
      type: "CHANGE_BREADCRUMBS",
      breadCrumbs: breadCrumbs,
    });
  }, []);

  const closeAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  useRouteGuard();

  return (
    <div className="flex">
      <Navigation />
      <CategoriesForm
        alertMessage={alertMessage}
        openAlert={openAlert}
        closeAlert={closeAlert}
        submitLoading={submitLoading}
        submitAction={submitNewCategories}
        categories={categories}
        setCategories={setCategories}
      />
    </div>
  );
};

export default NewCategories;
