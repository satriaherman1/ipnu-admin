import { Breadcrumbs, Link, Typography } from "@mui/material";

interface IPageBreadCrumbsProps {
  previousPage: string[];
  currentPage: string;
}

export default function PageBreadCrumbs(props: IPageBreadCrumbsProps) {
  const { previousPage, currentPage } = props;
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        {previousPage.map((page) => (
          <Link key={page} underline="hover" color="inherit" href="/">
            {page}
          </Link>
        ))}

        <Typography color="text.primary">{currentPage}</Typography>
      </Breadcrumbs>
    </div>
  );
}
