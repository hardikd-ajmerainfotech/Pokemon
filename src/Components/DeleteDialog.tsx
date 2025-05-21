import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { useEffect, useState } from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
  setId,
  id,
  user,
  type,
  match,
  GetMatch,
  GetPlayer,
}: any) {
  const [open, setOpen] = React.useState(false);
  // const [shouldLoadPlayer, setLoadPlayer] = React.useState(false);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
    if (type === "player") {
      setId(user.playerId);
    } else {
      setId(match.matchId);
    }
  };
  // React.useEffect(() => {
  //   GetPlayer();
  // }, [shouldLoadPlayer]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    setOpen(false);
    try {
      const response = await axios.delete(
        `https://localhost:7258/${type}/${id}`
      );
      if (response.status === 200) {
        // setLoadPlayer(true);
        if (type === "match") {
          GetMatch();
        } else {
          GetPlayer();
        }
        navigate(`/${type}`);
        toast.success(`Delete ${type} Successfully!`, {
          autoClose: 2000,
          pauseOnHover: false,
          toastId: "toast-success"
        });
      }
    } catch (err: any) {
      console.log("err: ", err);
      toast.error(`Delete ${type} Failed!`,{
        toastId: "toast-error"
      });
    }
    // setLoadPlayer(false);
  };

  return (
    <div >
      <Button 
        variant="contained" 
        onClick={handleClickOpen} 
        data-testid="delete"
        sx={{ // Updated
          backgroundColor: 'var(--button-bg)', 
          color: 'var(--button-text)',
          '&:hover': { backgroundColor: 'var(--button-hover-bg)' } 
        }}
      >
        Delete
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{ // Updated
          sx: { 
            backgroundColor: 'var(--card-bg)', 
            color: 'var(--text-color)' 
          } 
        }}
      >
        <DialogTitle sx={{ color: 'var(--text-color)' }}> {/* Updated */}
          {"Delete item"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" sx={{ color: 'var(--text-color)' }}> {/* Updated */}
            Are you sure ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleClose} 
            data-testid="disagreebutton"
            sx={{ // Updated
              color: 'var(--text-color)', 
              '&:hover': { backgroundColor: `rgba(${'var(--text-color-rgb)'}, 0.08)` } 
            }}
          >
            Disagree
          </Button>
          <Button 
            onClick={handleDelete} 
            data-testid="agreebutton"
            sx={{ // Updated
              color: 'var(--link-color)', 
              '&:hover': { backgroundColor: `rgba(${'var(--link-color-rgb)'}, 0.08)` } 
            }}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
