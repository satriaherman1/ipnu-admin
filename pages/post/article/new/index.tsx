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

const NewArticle: NextPage = () => {
  const [dataArticle, setDataArticle] = useState<IArticleData>({} as IArticleData);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
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
  const closeAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
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

  const Input = styled("input")({
    display: "none",
  });

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

  useRouteGuard();

  return (
    <div className="flex">
      <Navigation />
      <MainContent>
        <br />
        <h1 className="text-[30px]">Tambah Artikel Baru</h1>

        <section>
          <div className="w-[100%] py-[3%] my-[5%] h-[100%] border-dashed border-2 rounded-lg border-[#a5b6e6] min-h-[200px] justify-center flex flex-col items-center">
            {uploadLoading ? (
              <Skeleton variant="rectangular" width={200} height={120} />
            ) : (
              <>
                {imagePreviewUrl ? (
                  <div className="w-[100%] h-[80%] relative max-w-[500px] max-h-[500px]">
                    <img className="max-h-[300px] mx-auto" width="100px" height="50px" src={imagePreviewUrl} alt="preview" />
                  </div>
                ) : (
                  <>
                    <label htmlFor="contained-button-file">
                      <Input onChange={(e) => uploadImageArticle(e.target.files)} accept="image/*" id="contained-button-file" multiple type="file" />
                      <Button variant="contained" component="span">
                        Upload
                      </Button>
                    </label>
                    <p className="text-center max-w-[250px] mt-[10px]">
                      Upload Gambar dengan ukuran maksimal <b>2 Mb</b>
                    </p>
                  </>
                )}
              </>
            )}
          </div>
          <div className="flex justify-between flex-col md:flex-row mt-[30px] ">
            <section className="lg:w-[48%]">
              <TextField
                label="Judul"
                variant="outlined"
                defaultValue={dataArticle.title ? dataArticle.title : ""}
                style={{
                  width: "100%",
                }}
                onChange={(e) => {
                  const article = dataArticle;
                  article.title = e.target.value;
                  setDataArticle(dataArticle);
                }}
                value={dataArticle.title}
              />
            </section>
            <br className="md:hidden" />
            <section className="lg:w-[48%]">
              <TextField
                label="Penulis"
                variant="outlined"
                defaultValue={dataArticle.author ? dataArticle.author : ""}
                style={{
                  width: "100%",
                }}
                onChange={(e) => {
                  const article = dataArticle;
                  article.author = e.target.value;
                  setDataArticle(dataArticle);
                }}
                value={dataArticle.author}
              />
            </section>
          </div>
          <div className="flex flex-col md:flex-row mt-[30px] lg:min-w-[450px] lg:max-w-[48%]">
            <TextEditor
              value={dataArticle.content}
              defaultValue={dataArticle.content ? dataArticle.author : ""}
              onChange={(e) => {
                const article = dataArticle;
                article.content = e;
                setDataArticle(dataArticle);
              }}
            />
          </div>
          <br />

          <Box sx={{ bgcolor: "primary.main" }} className="rounded-md w-[fit-content]">
            <LoadingButton onClick={submitNewArticle} variant="contained" color="primary" loading={submitLoading} loadingPosition="start">
              Submit
            </LoadingButton>
          </Box>
        </section>
      </MainContent>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={closeAlert}>
        <Alert onClose={closeAlert} severity="success" sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default NewArticle;
