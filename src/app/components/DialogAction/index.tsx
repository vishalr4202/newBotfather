import {useState,forwardRef, ReactNode } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Formik, Form } from 'formik';
import TextInput from '../../components/TextInput';
import Button1 from '../../components/Button'
import { IconButton } from '@mui/material';
import VisibilityIcon from '../../../assets/visibilityIcon.svg';
import VisibilityOffIcon from '../../../assets/visibilityOffIcon.svg';
import { Container, Paper } from '@mui/material';

type Props = {
  children?: ReactNode; open?: any,close?:any,click?:any,change?:any,accessTokenUrl?:string,type:string 
};
export default function DialogAction(props: Props) {
  const { open,close,click,change,accessTokenUrl,type } = props;


  // const [maxWidth, setMaxWidth] = React.useState("lg");
  //   const [open, setOpen] = React.useState(false);

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  return (
    <div>
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="form-dialog-title"
        // fullWidth={fullWidth}
        // maxWidth={maxWidth}
      >
        <div style={{display: type =="zerodha" ? "block": "none"}}>
        <DialogTitle id="form-dialog-title">Generate Access Token</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <ol style={{ marginTop: "10px" }}>
              <li>
                Please enter the password and the mobile app code/ authenticator
                code in the zerodha site which has been opened for you
              </li>
              <li>
                Once these details are enterd the url will change and the
                password field will appear.
              </li>
              <li>
                Please copy and paste this changed url below, instead of
                entering the password again
              </li>
            </ol>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Please enter access token"
            type="text"
            fullWidth
            value={accessTokenUrl}
            onChange={change}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            Cancel
          </Button>
          <Button onClick={click} color="primary">
            Submit
          </Button>
        </DialogActions>
        </div>
        <div style={{display: type =="firstock" ? "block": "none"}}>
        <DialogTitle id="form-dialog-title">Login To Firstock</DialogTitle>
        {props.children}
        </div>

      </Dialog>
    </div>
  );
}

