import { Backdrop, CircularProgress } from "@mui/material";

interface ILoadingProps {
  isLoading: boolean;
}

export default function Loading({ isLoading }: ILoadingProps) {
  return (
    <>
      {isLoading && (
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
}
