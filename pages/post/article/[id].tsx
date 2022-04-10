import { Box, TextField, Snackbar, Alert, Input, Button, Skeleton } from "@mui/material";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import MainContent from "../../../components/mainContent";
import Navigation from "../../../components/navigation";
import LoadingButton from "@mui/lab/LoadingButton";
import { useRouter } from "next/router";
import { ArticleRestService } from "../../../service/rest/article-rest.service";
import useLocalData from "../../../core/hooks/useLocalData";
import { DRIVE_URL } from "../../../config/environtment";
import useRouteGuard from "../../../core/hooks/useRouteGuard";
import TextEditor from "../../../components/textEditor";
import PostForm from "../../../components/pages/post/form";
const initialValue = {
  title: "",
  content: "",
  imageId: "",
  author: "",
};
const UpdateArticle: NextPage = () => {
  const [dataArticle, setDataArticle] = useState<IArticleData>(initialValue);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const router = useRouter();
  const articleRestService = new ArticleRestService();
  const { dispatch } = useLocalData();

  const { id } = router.query;

  const updateArticle = (value?: IArticleData) => {
    setSubmitLoading(true);

    articleRestService.updateArticle(id, value || dataArticle).then((res) => {
      if (res?.status === 200) {
        setOpenAlert(true);
        setAlertMessage("Berhasil Menambahkan Artikel");
        setTimeout(() => router.push("/post/article"), 2000);
        setSubmitLoading(false);
      }
    });
  };

  const loadArticleById = () => {
    articleRestService.getArticleById(id).then((res) => {
      if (res.status === 200) {
        const data = res.data.data;
        setDataArticle(data);
      }
    });
  };

  useEffect(() => {
    const breadCrumbs = {
      previousPage: ["Dashboard", "Post", "Article"],
      currentPage: "Update",
    };
    dispatch({
      type: "CHANGE_BREADCRUMBS",
      breadCrumbs: breadCrumbs,
    });

    if (id) {
      loadArticleById();
    }
  }, [id]);

  const uploadImageArticle = async (file: any) => {
    setUploadLoading(true);
    const upload = await articleRestService.uploadArticleImage(file);
    setUploadLoading(false);
    const id = upload.data.data.id;

    const data = {
      ...dataArticle,
      imageId: id,
    };
    setDataArticle(data);
    setImagePreviewUrl(DRIVE_URL + id);
  };

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
      {id && (
        <PostForm
          alertMessage={alertMessage}
          openAlert={openAlert}
          imagePreviewUrl={imagePreviewUrl}
          uploadLoading={uploadLoading}
          closeAlert={closeAlert}
          submitLoading={submitLoading}
          submitAction={() => updateArticle()}
          uploadImageArticle={uploadImageArticle}
          dataArticle={dataArticle}
          setDataArticle={setDataArticle}
          setImagePreviewUrl={setImagePreviewUrl}
        />
      )}
    </div>
  );
};

export default UpdateArticle;
