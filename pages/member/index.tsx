import { Add } from "@mui/icons-material";
import type { NextPage } from "next";
import MainContent from "../../components/mainContent";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import MemberListComponent from "../../components/pages/member/list";
import Link from "next/link";
import ConfirmDeleteComponent from "../../components/pages/member/confirmDelete";
import { MemberRestService } from "../../service/rest/member-rest.service";
import Navigation from "../../components/navigation";
import PageBreadCrumbs from "../../components/pageBreadCrumbs";
import useLocalData from "../../core/hooks/useLocalData";

const Member: NextPage = () => {
  const memberRestService: MemberRestService = new MemberRestService();
  const [members, setMembers] = useState<Data[]>([] as Data[]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<any>();
  const { dispatch } = useLocalData();
  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
  function EnhancedTable() {}

  const getAllMembers = async () => {
    setIsLoading(true);
    const key = {
      type: "ipnu",
    };
    const data = await memberRestService.getMemberByKey(key);
    setMembers(data?.data.data);
    setIsLoading(false);
  };

  const deleteMemberById = async () => {
    setIsLoading(true);
    await memberRestService.deleteMemberById(deleteId);
    setIsLoading(false);
    await getAllMembers();
  };

  useEffect(() => {
    const breadCrumbs = {
      previousPage: ["Dashboard"],
      currentPage: "Member",
    };
    getAllMembers();
    dispatch({
      type: "CHANGE_BREADCRUMBS",
      breadCrumbs: breadCrumbs,
    });
  }, []);

  return (
    <div className="flex">
      <Navigation />
      <MainContent>
        <div style={{ height: 600, width: "100%" }}>
          {isLoading ? (
            <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
              <CircularProgress color="inherit" />
            </Backdrop>
          ) : (
            <>
              <MemberListComponent setOpenConfirmDelete={(confirm) => setOpenConfirmDelete(confirm)} members={members} setDeleteId={(id) => setDeleteId(id)} />
              <Link href="/member/new" passHref>
                <Box sx={{ bgcolor: "success.main" }} className="rounded w-[fit-content]">
                  <Button variant="contained" className="rounded " color="success">
                    <Add /> Tambah Anggota
                  </Button>
                </Box>
              </Link>
            </>
          )}
        </div>
        <ConfirmDeleteComponent action={deleteMemberById} open={openConfirmDelete} onClose={() => setOpenConfirmDelete(false)} />
      </MainContent>
    </div>
  );
};

export default Member;
