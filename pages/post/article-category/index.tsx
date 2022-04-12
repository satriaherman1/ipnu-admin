import { Add } from "@mui/icons-material";
import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import MainContent from "../../../components/mainContent";
import Navigation from "../../../components/navigation";
import ConfirmDeleteComponent from "../../../components/pages/member/confirmDelete";
import CategoriesListComponent from "../../../components/pages/post/article-category/list";
import PostListComponent from "../../../components/pages/post/list";
import useLocalData from "../../../core/hooks/useLocalData";
import useRouteGuard from "../../../core/hooks/useRouteGuard";
import { ArticleCategoryRestService } from "../../../service/rest/article-categories-rest.service";

const ArticleCategories: NextPage = () => {
  const { dispatch } = useLocalData();
  const [categories, setCategoories] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>("");

  const categoryRest = new ArticleCategoryRestService();
  const deleteArticleById = () => {
    setIsLoading(true);
    categoryRest.deleteCategoriesById(deleteId).then((res) => {
      if (res?.status === 200) {
        setIsLoading(false);
      }
    });

    getArticlesData();
  };

  const getArticlesData = async () => {
    setIsLoading(true);
    const dataCategories = await categoryRest.getCategories();
    setCategoories(dataCategories?.data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    const breadCrumbs = {
      previousPage: ["Dashboard", "Post"],
      currentPage: "Categories",
    };
    dispatch({
      type: "CHANGE_BREADCRUMBS",
      breadCrumbs: breadCrumbs,
    });

    getArticlesData();
  }, []);

  useRouteGuard();

  return (
    <div className="flex">
      <Navigation />
      <MainContent>
        {isLoading ? (
          <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <>
            <div className="h-[fit-content] max-h-[600px] w-[100%]">
              <CategoriesListComponent header="Daftar Kategori Artikel" setDeleteId={(id) => setDeleteId(id)} posts={categories} setOpenConfirmDelete={(confirm) => setOpenConfirmDelete(confirm)} />
            </div>
            <Link href="/post/article-category/new" passHref>
              <Box sx={{ bgcolor: "success.main" }} className="rounded w-[fit-content]">
                <Button variant="contained" className="rounded " color="success">
                  <Add /> Tambah Kategori
                </Button>
              </Box>
            </Link>
          </>
        )}
        <ConfirmDeleteComponent action={deleteArticleById} open={openConfirmDelete} onClose={() => setOpenConfirmDelete(false)} />
      </MainContent>
    </div>
  );
};

export default ArticleCategories;
