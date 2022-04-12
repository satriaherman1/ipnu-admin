import { Alert, Backdrop, Box, Button, CircularProgress, Input, Skeleton, Snackbar, styled, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import * as yup from "yup";
import MainContent from "../../../../mainContent";

interface IPostFormProps {
  categories: IArticleCategoriesData;
  setCategories: Function;
  closeAlert: () => any;
  submitAction: (val?: any) => any;
  submitLoading: boolean;
  openAlert: boolean;
  alertMessage: string;
}

export default function CategoriesForm(props: IPostFormProps): React.ReactElement {
  const { categories, setCategories, closeAlert, submitAction, submitLoading, openAlert, alertMessage } = props;

  const validationSchema = yup.object({
    name: yup.string().required("Nama Kategori Harus Diisi"),
  });

  const initialFormValue: IArticleCategoriesData = {
    name: categories.name,
  };

  const formik = useFormik({
    initialValues: initialFormValue,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      categories.name = values.name;
      setCategories(categories);
      console.log(values);
      setTimeout(() => submitAction(), 200);
    },
  });

  useEffect(() => {
    formik.setFieldValue("name", categories.name);
  }, [categories]);

  return (
    <>
      <MainContent>
        <br />
        <h1 className="text-[30px]">Tambah Kategori Baru</h1>
        <section>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex justify-between flex-col md:flex-row mt-[30px] ">
              <section className="lg:w-full max-w-[600px]">
                <TextField
                  label="Nama"
                  variant="outlined"
                  id="name"
                  name="name"
                  style={{
                    width: "100%",
                  }}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
              </section>
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
