// react import
import React, { useState } from "react";
// import useCopy from use-copy library
import useCopy from "use-copy";
// imports from Material UI
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {Container, IconButton, Paper } from "@mui/material";
import JSONS from './sample.json'
import VisibilityOffIcon from '../../../assets/visibilityOffIcon.svg';
import JSONPretty from 'react-json-pretty';

interface Props{
    type:string
}
export default function App(props:Props) {
    const {type} = props
    const x = JSON.parse(JSON.stringify(JSONS))
    const [copied, copy, setCopied] = useCopy(JSON.stringify(x[type], null, "  "));
    // state for text 
    const [text, setText] = useState("");
    // state to invoke snackbar
    const [copyState, setcopyState] = useState(false);

    const copyData = () => {
        copy();
        setcopyState(true)
    }
    return (
        <div>
            <Container maxWidth="xl" style={{ marginTop: '0px' }}>
            <Paper style={{padding:'10px',width:'30%',position:'relative',margin:'0 auto'}}>
                <JSONPretty id="json-pretty" data={x[type]}></JSONPretty>
                <IconButton tabIndex={-1} className="password-eye" onClick={copyData} style={{position:"absolute",top:'2px',right:'0px'}}>
                    <img src={VisibilityOffIcon} alt="logo" onClick={() => {
                        // function to copy text
                        copy();
                        // invoke snackbar if data is copied
                        copied ? setCopied(true) : setcopyState(false);
                    }} />
                </IconButton>
            </Paper>
            {/*  snackbar */}
            <Snackbar
                // invoke snackbar when open is true
                open={copyState}
                // close after three seconds
                autoHideDuration={3000}
                // function called after three seconds
                onClose={() => setcopyState(false)}
                // where the sncakbar must be shown
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
                style={{ zIndex: "9999999" }}
            >
                <MuiAlert
                    // function called by clicking the close icon
                    onClose={() => setcopyState(false)}
                    // color of snackbar
                    severity="success"
                    sx={{ width: "30%" }}
                >
                    {/* show success message that data is copied */}
                    Copied data
                </MuiAlert>
            </Snackbar>
            </Container>
        </div>
    );
}

