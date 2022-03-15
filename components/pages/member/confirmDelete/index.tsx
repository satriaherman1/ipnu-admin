import { Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

interface IConfirmDeleteComponent {
  open: boolean;
  onClose: () => void;
  action: () => any;
}

export default function ConfirmDeleteComponent(props: IConfirmDeleteComponent) {
  const { open, onClose, action } = props;

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">Yakin Ingin Menghapus?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">Data Akan Terhapus Secara Permanen. Dan data yang dihapus tidak bisa dikembalikan lagi</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Batal</Button>
        <Button
          autoFocus
          onClick={() => {
            action();
            onClose();
          }}
        >
          Hapus Dong
        </Button>
      </DialogActions>
    </Dialog>
  );
}
