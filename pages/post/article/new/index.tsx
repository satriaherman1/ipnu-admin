import { Box, TextField, Snackbar, Alert, Input, Button } from "@mui/material";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import MainContent from "../../../../components/mainContent";
import Navigation from "../../../../components/navigation";
import LoadingButton from "@mui/lab/LoadingButton";
import { useRouter } from "next/router";
import { ArticleRestService } from "../../../../service/rest/article-rest.service";
import useLocalData from "../../../../core/hooks/useLocalData";
import { styled } from "@mui/material/styles";
import Image from "next/image";

const NewArticle: NextPage = () => {
  const [dataArticle, setDataArticle] = useState<IArticleData>({} as IArticleData);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const router = useRouter();
  const articleRestService = new ArticleRestService();
  const { dispatch } = useLocalData();

  const submitNewArticle = async () => {
    setSubmitLoading(true);
    try {
      const submitted = await articleRestService.createArticle(dataArticle);
      setOpenAlert(true);
      setAlertMessage("Berhasil Menambahkan Anggota");
      setTimeout(() => router.push("/member"), 2000);
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
    await articleRestService.uploadArticleImage(file);
  };

  return (
    <div className="flex">
      <Navigation />
      <MainContent>
        <br />
        <h1 className="text-[30px]">Tambah Artikel Baru</h1>

        <section>
          <div className="w-[100%] my-[5%] h-[100%] border-dashed border-2 rounded-lg border-[#a5b6e6] min-h-[200px] justify-center flex flex-col items-center">
            <label htmlFor="contained-button-file">
              <Input onChange={(e) => uploadImageArticle(e.target.files)} accept="image/*" id="contained-button-file" multiple type="file" />
              <Button variant="contained" component="span">
                Upload
              </Button>
            </label>
            <p className="text-center max-w-[250px] mt-[10px]">
              Upload Gambar dengan ukuran maksimal <b>2 Mb</b>
            </p>
          </div>
          <div className="flex justify-between flex-col md:flex-row mt-[30px]">
            <TextField
              label="Judul"
              variant="outlined"
              className="lg:min-w-[500px]"
              onChange={(e) => {
                const article = dataArticle;
                article.title = e.target.value;
                setDataArticle(dataArticle);
              }}
              value={dataArticle.title}
            />
            <TextField
              label="Penulis"
              variant="outlined"
              className="lg:min-w-[500px]"
              onChange={(e) => {
                const article = dataArticle;
                article.author = e.target.value;
                setDataArticle(dataArticle);
              }}
              value={dataArticle.author}
            />
          </div>
          <div className="flex flex-col md:flex-row mt-[30px]">
            <TextField
              label="Content"
              variant="outlined"
              multiline
              rows={5}
              className="lg:min-w-[500px]"
              onChange={(e) => {
                const article = dataArticle;
                article.content = e.target.value;
                setDataArticle(dataArticle);
              }}
              value={dataArticle.content}
            />
          </div>
          <br />

          <Box sx={{ bgcolor: "primary.main" }} className="rounded-lg w-[fit-content]">
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
