import { Alert, Backdrop, Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Skeleton, Snackbar, styled, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { DRIVE_URL } from "../../../../config/environtment";
import MainContent from "../../../mainContent";
import TextEditor from "../../../textEditor";

interface IPostFormProps {
  uploadImageArticle: (file: any) => Promise<void>;
  dataArticle: IArticleData;
  setDataArticle: Function;
  uploadLoading: boolean;
  imagePreviewUrl: string | undefined;
  closeAlert: () => any;
  submitAction: (val?: any) => any;
  submitLoading: boolean;
  openAlert: boolean;
  alertMessage: string;
  setImagePreviewUrl?: any;
  categories: IArticleCategoriesData[];
}

export default function PostForm(props: IPostFormProps): React.ReactElement {
  const { setImagePreviewUrl, uploadImageArticle, dataArticle, setDataArticle, uploadLoading, imagePreviewUrl, closeAlert, submitAction, submitLoading, openAlert, alertMessage, categories } = props;

  const Input = styled("input")({
    display: "none",
  });

  const validationSchema = yup.object({
    title: yup.string().required("Judul Harus Diisi"),
    author: yup.string().required("Penulis Harus Diisi"),
  });

  const initialFormValue: IArticleData = {
    author: dataArticle.author,
    content: dataArticle.content,
    title: dataArticle.title,
    imageId: dataArticle.imageId,
    category: dataArticle.category,
  };

  const formik = useFormik({
    initialValues: initialFormValue,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dataArticle.author = values.author;
      dataArticle.content = values.content;
      dataArticle.title = values.title;
      dataArticle.category = values.category;
      setDataArticle(dataArticle);
      setTimeout(() => submitAction(), 200);
    },
  });

  useEffect(() => {
    formik.setFieldValue("author", dataArticle.author);
    formik.setFieldValue("title", dataArticle.title);
    formik.setFieldValue("content", dataArticle.content);
    formik.setFieldValue("imageId", dataArticle.imageId);

    if (formik.values.imageId !== "" && formik.values.imageId !== undefined) {
      const previewUrl: any = DRIVE_URL + formik?.values?.imageId || "";
      if (previewUrl) {
        setImagePreviewUrl(previewUrl || "");
      }
    }
  }, [dataArticle]);

  return (
    <>
      <MainContent>
        <br />
        <h1 className="text-[30px]">Tambah Artikel Baru</h1>
        <section>
          <form onSubmit={formik.handleSubmit}>
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
                        <Input onChange={(e: any) => uploadImageArticle(e.target.files)} accept="image/*" id="contained-button-file" type="file" />
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
                  id="title"
                  name="title"
                  style={{
                    width: "100%",
                  }}
                  value={formik.values.title}
                  onChange={formik.handleChange}
                />
              </section>
              <br className="md:hidden" />
              <section className="lg:w-[48%]">
                <TextField
                  label="Penulis"
                  variant="outlined"
                  id="author"
                  name="author"
                  style={{
                    width: "100%",
                  }}
                  value={formik.values.author}
                  onChange={formik.handleChange}
                />
              </section>
            </div>
            <div className="flex justify-between flex-col md:flex-row mt-[30px] ">
              <section className="lg:w-[48%]">
                <FormControl fullWidth>
                  <InputLabel id="category-label">Kategori</InputLabel>
                  <Select labelId="category-label" id="category" name="category" value={formik.values.category} label="Kategori" onChange={formik.handleChange}>
                    {categories &&
                      categories.map((c) => (
                        <MenuItem key={c._id} value={c._id}>
                          {c.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </section>
            </div>
            <div className="flex flex-col md:flex-row mt-[30px] lg:min-w-[450px] lg:max-w-[48%]">
              <TextEditor id="content" value={formik.values.content} onChange={formik.handleChange} />
            </div>
            <br />

            <Box sx={{ bgcolor: "primary.main" }} className="rounded-md w-[fit-content]">
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Box>
          </form>
        </section>
      </MainContent>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={closeAlert}>
        <Alert onClose={closeAlert} severity="success" sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>

      {submitLoading && (
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={submitLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
}
