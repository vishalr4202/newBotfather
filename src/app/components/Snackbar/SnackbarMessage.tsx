//import { Grid, IconButton, IconButtonProps, makeStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { Grid, IconButton } from '@mui/material';
import closeIcon from '../../../assets/icon_close_white.svg';

type ComponentProps = {
    options: any;
    handleClose: any;
    image?: any;
};

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '20px',
        padding: '10px 14px',
        maxWidth: '100vw',
        width: 'max-content',
        position: 'absolute',
        top: '0px !important'
    },
    orangeBackground: {
        backgroundColor: 'orange',
        boxShadow: '0 3px 24px 0 rgba(255,146,69,0.4)'
    },
    whiteBackground: {
        zIndex: -999,
        display: 'none'
    },
    blueBackground: {
        background: 'rgb(93, 151, 246)',
        boxShadow: '0 3px 24px 0 rgba(18,187,125,0.4)'
    },
    greyBackground: {
        backgroundColor: 'black',
        color: 'white',
        boxShadow: 'black'
    },
    message: {
        marginLeft: 10,
        marginRight: 20,
        fontSize: '1em',
        color: 'white',
        '& img': {
            marginRight: '10px',
            width: '23px'
        }
    }
}));

const SnackbarMessage = (props: ComponentProps) => {
    const classes = useStyles();
    const backgroundClass = `${classes.container} ${
        props?.options?.type === 'success'
            ? classes.blueBackground
            : props?.options?.type === 'reject'
            ? classes.greyBackground
            : props?.options?.type === 'remark'
            ? classes.orangeBackground
            : classes.whiteBackground
    }`;
    const messageArr = ['success', 'reject', 'remark'];
    return (
        <Grid className={backgroundClass}>
            <Grid className={classes.message}>
                <img src={props.image} />
                {props?.options?.message}
            </Grid>
            <Grid>
                <IconButton
                    onClick={props.handleClose}
                    className={messageArr?.includes(props?.options?.type) == true ? '' : classes.whiteBackground}
                >
                    <img src={closeIcon} />
                </IconButton>
            </Grid>
        </Grid>
    );
};

export default SnackbarMessage;
