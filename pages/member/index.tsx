import { Add } from "@mui/icons-material";
import type { NextPage } from "next";
import MainContent from "../../components/mainContent";
import React, { useEffect, useState } from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Delete, Edit } from "@mui/icons-material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import Navigation from "../../components/navigation";
import { Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import PageBreadCrumbs from "../../components/pageBreadCrumbs";
import { MemberRestService } from "../../service/rest/member-rest.service";
import Link from "next/link";

interface Data {
  name: string;
  age: Number;
  status: string;
  address: string;
  action?: any;
  _id: string;
}

// function createData(name: string, age: number, status: string, address: string): Data {
//   return {
//     name,
//     age,
//     status,
//     address,
//   };
// }

// const rows = [createData("Wahid Alhakim", 17, "ketua", "Srobyong RT04, RW 04")];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(order: Order, orderBy: Key): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === "desc" ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly any[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array?.map((el, index) => [el, index] as [T, number]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Nama",
  },
  {
    id: "age",
    numeric: true,
    disablePadding: false,
    label: "Umur",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },

  {
    id: "address",
    numeric: false,
    disablePadding: false,
    label: "Alamat Lengkap",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Aksi",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align="left" padding={headCell.disablePadding ? "none" : "normal"} sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : "asc"} onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: "1 1 100%" }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle" component="div">
          Daftar Anggota IPNU
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Delete />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

const Member: NextPage = () => {
  const memberRestService: MemberRestService = new MemberRestService();
  const [members, setMembers] = useState<Data[]>([] as Data[]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>("");

  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
  function EnhancedTable() {
    const [order, setOrder] = React.useState<Order>("asc");
    const [orderBy, setOrderBy] = React.useState<keyof Data>("name");
    const [selected, setSelected] = React.useState<string[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        const newSelecteds: any[] = members?.map((n) => n.name);
        setSelected([...newSelecteds]);
        return;
      }
      setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, name: any) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected: string[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
      }

      setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const isSelected = (name: any) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - members?.length) : 0;

    return (
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? "small" : "medium"}>
              <EnhancedTableHead numSelected={selected.length} order={order} orderBy={orderBy} onSelectAllClick={handleSelectAllClick} onRequestSort={handleRequestSort} rowCount={members?.length} />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 */}
                {/* {members?.slice().sort(getComparator(order, orderBy))} */}
                {members !== undefined &&
                  stableSort(members, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.name);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow hover role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={row.name} selected={isItemSelected}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                              onClick={(event) => handleClick(event, row.name)}
                            />
                          </TableCell>
                          <TableCell component="th" id={labelId} scope="row" padding="none">
                            {row.name}
                          </TableCell>
                          <TableCell align="left">{row.age}</TableCell>
                          <TableCell align="left">{row.status}</TableCell>
                          <TableCell align="left">{row.address}</TableCell>
                          <TableCell align="left">
                            <div className="flex">
                              <Box sx={{ bgcolor: "primary.main" }} className="rounded-lg">
                                <Button variant="contained" color="primary" className="max-w-[10px]">
                                  <Edit />
                                </Button>
                              </Box>
                              <Box sx={{ bgcolor: "error.main" }} className="rounded-lg ml-[20px]">
                                <Button
                                  variant="contained"
                                  onClick={() => {
                                    setOpenConfirmDelete(true);
                                    setDeleteId(row._id);
                                  }}
                                  color="error"
                                  className="max-w-[10px]"
                                >
                                  <Delete />
                                </Button>
                              </Box>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={members?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    );
  }

  const getAllMembers = async () => {
    setIsLoading(true);
    const data = await memberRestService.getMembers();
    setMembers(data?.data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getAllMembers();
  }, []);

  const deleteMemberById = async () => {
    setIsLoading(true);
    await memberRestService.deleteMemberById(deleteId);
    setIsLoading(false);
    await getAllMembers();
  };

  const ConfirmDeleteComponent = () => {
    const closeConfirmModal = () => {
      setOpenConfirmDelete(false);
    };
    return (
      <Dialog open={openConfirmDelete} onClose={closeConfirmModal} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Yakin Ingin Menghapus?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Data Akan Terhapus Secara Permanen. Dan data yang dihapus tidak bisa dikembalikan lagi</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmModal}>Batal</Button>
          <Button
            autoFocus
            onClick={() => {
              deleteMemberById();
              closeConfirmModal();
            }}
          >
            Hapus Dong
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <div className="flex">
      <Navigation />
      <MainContent>
        <PageBreadCrumbs previousPage={["Dashboard"]} currentPage="Daftar Anggota" />
        <br />
        <br />
        <div style={{ height: 600, width: "100%" }}>
          {isLoading ? (
            <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
              <CircularProgress color="inherit" />
            </Backdrop>
          ) : (
            <>
              <EnhancedTable />
              <Link href="/member/new" passHref>
                <Box sx={{ bgcolor: "success.main" }} className="rounded-lg w-[fit-content]">
                  <Button variant="contained" color="success">
                    <Add /> Tambah Anggota
                  </Button>
                </Box>
              </Link>
            </>
          )}
        </div>
        <ConfirmDeleteComponent />
      </MainContent>
    </div>
  );
};

export default Member;
