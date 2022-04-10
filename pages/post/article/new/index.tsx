import { Box, TextField, Snackbar, Alert, Input, Button, Skeleton } from "@mui/material";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import MainContent from "../../../../components/mainContent";
import Navigation from "../../../../components/navigation";
import LoadingButton from "@mui/lab/LoadingButton";
import { useRouter } from "next/router";
import { ArticleRestService } from "../../../../service/rest/article-rest.service";
import useLocalData from "../../../../core/hooks/useLocalData";
import { styled } from "@mui/material/styles";
import { DRIVE_URL } from "../../../../config/environtment";
import useRouteGuard from "../../../../core/hooks/useRouteGuard";
import TextEditor from "../../../../components/textEditor";
import PostForm from "../../../../components/pages/post/form";

const NewArticle: NextPage = () => {
  const [dataArticle, setDataArticle] = useState<IArticleData>({} as IArticleData);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const router = useRouter();
  const articleRestService = new ArticleRestService();
  const { dispatch } = useLocalData();

  const submitNewArticle = async () => {
    setSubmitLoading(true);
    try {
      await articleRestService.createArticle(dataArticle);
      setOpenAlert(true);
      setAlertMessage("Berhasil Menambahkan Artikel");
      setTimeout(() => router.push("/post/article"), 2000);
    } catch (err) {}
    setSubmitLoading(false);
  };

  useEffect(() => {
    const breadCrumbs = {
      previousPage: ["Dashboard", "Post", "Article"],
      currentPage: "New",
    };
    dispatch({
      type: "CHANGE_BREADCRUMBS",
      breadCrumbs: breadCrumbs,
    });
  }, []);

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
      <PostForm
        alertMessage={alertMessage}
        openAlert={openAlert}
        imagePreviewUrl={imagePreviewUrl}
        uploadLoading={uploadLoading}
        closeAlert={closeAlert}
        submitLoading={submitLoading}
        submitAction={submitNewArticle}
        uploadImageArticle={uploadImageArticle}
        dataArticle={dataArticle}
        setDataArticle={setDataArticle}
      />
    </div>
  );
};

export default NewArticle;
