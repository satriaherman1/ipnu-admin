import { Add } from "@mui/icons-material";
import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import MainContent from "../../../components/mainContent";
import Navigation from "../../../components/navigation";
import PostListComponent from "../../../components/pages/post/list";
import useLocalData from "../../../core/hooks/useLocalData";
import useRouteGuard from "../../../core/hooks/useRouteGuard";
import { ArticleRestService } from "../../../service/rest/article-rest.service";

const Article: NextPage = () => {
  const { dispatch } = useLocalData();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>("");

  const articleRestService = new ArticleRestService();
  const deleteMemberById = async () => {
    setIsLoading(true);
    await articleRestService.deleteArticleById(deleteId);
    setIsLoading(false);
    await getArticlesData();
  };
  const getArticlesData = async () => {
    setIsLoading(true);
    const dataArticles = await articleRestService.getArticles();
    setArticles(dataArticles?.data.data);
    setIsLoading(false);
  };
  useEffect(() => {
    const breadCrumbs = {
      previousPage: ["Dashboard", "Post"],
      currentPage: "Article",
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
              <PostListComponent header="Daftar Artikel" setDeleteId={(id) => setDeleteId(id)} posts={articles} setOpenConfirmDelete={(confirm) => setOpenConfirmDelete(confirm)} />
            </div>
            <Link href="/post/article/new" passHref>
              <Box sx={{ bgcolor: "success.main" }} className="rounded w-[fit-content]">
                <Button variant="contained" className="rounded " color="success">
                  <Add /> Tambah Artikel
                </Button>
              </Box>
            </Link>
          </>
        )}
      </MainContent>
    </div>
  );
};

export default Article;
