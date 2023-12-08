import { Button, ButtonProps } from '@mui/material';
import { makeStyles } from '@material-ui/core';

type funcProps = ButtonProps & {
    name?: string;
    handleClick?: any;
    type?: string;
    disabled?: boolean;
    className?: string;
    secondary?: boolean;
    isShowEndIcon?: boolean;
    formInput?: string;
    EndIconArrow?: any;
    fullWidth?: boolean;
    isShowStartIcon?: boolean;
    StartIconArrow?: any;
    isShowEndCustomIcon?: any;
    divWidth?: any;
};

const useStyles = makeStyles({
    root: {
        borderRadius: '6px',
        height: '50px',
        textTransform: 'none',
        '&.MuiButton-root': {
            textTransform: 'none'
        },
        background:'rgba(78, 181, 141, 0.67) !important',
        marginTop:'40px !important'
    },
    primaryButton: {
        background: '#5d97f6',
        fontSize: '16px',
        fontWeight: 600,
        letterSpacing: 0,
        lineHeight: '25px',
        textAlign: 'right',
        color: '#000000',
        '&.MuiButton-root:hover': { background: '#5d97f6', boxShadow: 'none' },
        '&.MuiButton-root:focus': { outline: 'none' },
        '&.MuiButton-root.Mui-disabled': {
            background: '#84adf0',
            color: 'white'
        }
    },
    secondaryButton: {
        border: '1px solid #5d97f6',
        backgroundColor: 'rgba(93, 151, 246, 0.08)',
        color: '#5d97f6',
        marginTop: '0px !important',
        height:'auto !important',
        boxShadow: 'none',
        '&.MuiButton-root.Mui-disabled': {
            border: `1px solid #5d97f6`,
            background: '#84adf0',
            color: 'white'
        },
        width:'auto !important'
    }
});

const ACGButton = (props: funcProps) => {
    const classes = useStyles();
    const {
        name,
        handleClick,
        type,
        disabled,
        className,
        secondary,
        fullWidth,
        formInput,
        isShowEndIcon,
        StartIconArrow,
        EndIconArrow,
        isShowStartIcon,
        isShowEndCustomIcon,
        divWidth,
        ...rest
    } = props;
    const isDisabled = disabled ? true : false;
    const buttonClass = `${formInput ? formInput : ''} ${classes.root} ${
        secondary ? classes.secondaryButton : classes.primaryButton
    } ${className}`;
    return (
        <div style={divWidth ? { width: divWidth } : undefined}>
            <Button
                type={type}
                name={name}
                className={buttonClass}
                onClick={handleClick}
                disabled={isDisabled}
                fullWidth={fullWidth}
                {...(isShowEndIcon
                    ? {
                          endIcon: isShowEndCustomIcon ? (
                              <img src={isShowEndCustomIcon} />
                          ) : (
                              <EndIconArrow style={{ fontSize: '15px', marginTop: '-2px' }} />
                          )
                      }
                    : {})}
                {...(isShowStartIcon
                    ? {
                          startIcon: isShowEndCustomIcon ? (
                              <img src={isShowEndCustomIcon} />
                          ) : (
                              <StartIconArrow style={{ fontSize: '15px', marginTop: '-2px' }} />
                          )
                      }
                    : {})}
                {...rest}
            >
                {name}
            </Button>
        </div>
    );
};

export default ACGButton;
