import { AccountCircle, Notifications, Search } from "@mui/icons-material";
import { Box, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Snackbar, Alert } from "@mui/material";
import { NextPage } from "next";
import { useState } from "react";
import MainContent from "../../../components/mainContent";
import Navigation from "../../../components/navigation";
import PageBreadCrumbs from "../../../components/pageBreadCrumbs";
import { MemberRestService } from "../../../service/rest/member-rest.service";
import LoadingButton from "@mui/lab/LoadingButton";
import { useRouter } from "next/router";

const NewMember: NextPage = () => {
  const [dataMember, setDataMember] = useState<IMember>({} as IMember);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const router = useRouter();
  const memberRestService: MemberRestService = new MemberRestService();

  const submitNewMember = async () => {
    setSubmitLoading(true);
    try {
      const submitted = await memberRestService.crateMember(dataMember);
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

  return (
    <div className="flex">
      <Navigation />
      <MainContent>
        <div className="flex justify-between w-full items-center">
          <PageBreadCrumbs previousPage={["Dashboard", "Member"]} currentPage="Tambah Anggota" />
          <div className=" hidden md:flex items-center">
            <IconButton className="ml-[10px] ">
              <Notifications />
            </IconButton>
            <IconButton className="ml-[10px] ">
              <Search />
            </IconButton>
            <IconButton className="ml-[10px] ">
              <AccountCircle />
            </IconButton>
          </div>
        </div>

        <br />
        <h1 className="text-[30px]">Tambah Anggota Baru</h1>

        <section>
          <div className="flex flex-col md:flex-row justify-between mt-[30px]">
            <TextField
              label="Nama"
              variant="outlined"
              className="lg:min-w-[500px]"
              onChange={(e) => {
                const member = dataMember;
                member.name = e.target.value;
                setDataMember(dataMember);
              }}
              value={dataMember.name}
            />
            <div className=" mt-[20px]">
              <FormControl className="lg:min-w-[500px] md:mt-0">
                <InputLabel id="demo-simple-select-label">Tipe Anggota</InputLabel>
                <Select
                  variant="outlined"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Tipe Anggota"
                  onChange={(e) => {
                    const member = dataMember;
                    member.type = e.target.value;
                    setDataMember(dataMember);
                  }}
                  value={dataMember.type}
                >
                  <MenuItem value="ipnu">IPNU</MenuItem>
                  <MenuItem value="ippnu">IPPNU</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between mt-[30px]">
            <div className="mt-[20px]">
              <TextField
                label="Umur"
                type="number"
                variant="outlined"
                className="lg:min-w-[500px]"
                onChange={(e: any) => {
                  const member = dataMember;
                  const ageValue = e.target.value;
                  member.age = ageValue;
                  setDataMember(dataMember);
                }}
                value={dataMember.age}
              />
            </div>

            <FormControl className="lg:min-w-[500px] mt-[20px] md:mt-0">
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                variant="outlined"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={(e) => {
                  const member = dataMember;
                  member.status = e.target.value;
                  setDataMember(dataMember);
                }}
                value={dataMember.status}
                label="Status"
              >
                <MenuItem value="ketua">Ketua</MenuItem>
                <MenuItem value="wakil ketua">Wakil Ketua</MenuItem>
                <MenuItem value="sekretaris">Sektretaris</MenuItem>
                <MenuItem value="bendahara">Bendahara</MenuItem>
                <MenuItem value="anggota">Anggota</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="flex flex-col md:flex-row mt-[30px]">
            <TextField
              label="Alamat"
              variant="outlined"
              multiline
              rows={5}
              className="lg:min-w-[500px]"
              onChange={(e) => {
                const member = dataMember;
                member.address = e.target.value;
                setDataMember(dataMember);
              }}
              value={dataMember.address}
            />
          </div>
          <br />

          <Box sx={{ bgcolor: "primary.main" }} className="rounded-lg w-[fit-content]">
            <LoadingButton onClick={submitNewMember} variant="contained" color="primary" loading={submitLoading} loadingPosition="start">
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

export default NewMember;
