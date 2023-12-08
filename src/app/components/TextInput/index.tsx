import { TextField, TextFieldProps, InputAdornment } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import './index.scss';

type ComponentProps = {
    id?: string;
    name?: string;
    value?: string;
    label?: string;
    type?: string;
    onChange?: Function;
    helperText?: string;
    maxLength?: number;
    placeholder?: string;
    formInput?: string;
    className?: string;
    readOnly?: Boolean;
    disabled?: Boolean;
    inputRef?: Function;
    style?: string;
    fullWidth?: Boolean;
    startAdornment?: any;
    endAdornment?: any;
    isIcon?: Boolean;
    isRedOutline?: Boolean;
    height?: string | number;
} & TextFieldProps;

const useStyles = makeStyles({
    root: {
        flexDirection: 'row',
        '& .MuiInputAdornment-positionStart': {
            marginBottom: '4px',
            marginLeft: '5px',
            marginRight: '20px'
        },
        '& .MuiInputAdornment-positionEnd ': {
            marginBottom: '1px'
        },
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            border: 'none'
        },
        '& .MuiOutlinedInput-root': {
            //  height: '50px',
            // backgroundColor: '#1D1E2C',
            backgroundColor: '#ffffff',
            borderRadius: '7px',
            borderWidth: '1px',
            // borderColor: '#2B2D42',
            border: "1px solid #999",
            alignContent: 'center',
            justifyContent: 'center',
            width: '100%',
            marginTop:'30px',
            color: '#b1c2df',
            '&.Mui-focused fieldset': {
                border: 'none'
            }
        },
        '& .MuiFormHelperText-root': {
            color: '#F06868',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: 0,
            marginBottom: '-23px',
            fontFamily: 'Montserrat'
        }
    },
    redOutline: {
        borderRadius: '10px',
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            border: 'none'
        },
        marginTop:'40px',
        '& .MuiOutlinedInput-root': {
            border: ' 1px solid #F06868 !important',
            '&.Mui-focused fieldset': {
                border: 'none'
            }
        }
    },
    input: {
        '&::placeholder': {
            color: '#b1c2df',
            fontWeight: '500',
            fontSize: '14px'
        }
    },
    inputWithicon: {
        '& .MuiInputBase-input': {
            color: '#b1c2df',
            fontSize: '14px',
            letterSpacing: '0',
            fontWeight: '500',
            lineHeight: '17px',
            marginLeft: '30px'
        }
    },
    inputWithoutIcon: {
        '& .MuiInputBase-input': {
            color: '#b1c2df',
            fontSize: '14px',
            letterSpacing: '0',
            fontWeight: '500',
            lineHeight: '17px'
        }
    },
    disabledComponent: {
        opacity: 0.6
    },
    iconStart: {
        position: 'absolute',
        marginTop: '30px',
        zIndex: 9
    }
});

const TextInput = (props: ComponentProps) => {
    const classes = useStyles();
    const {
        name,
        id,
        value,
        label,
        helperText,
        maxLength,
        placeholder,
        className,
        formInput,
        readOnly,
        disabled,
        inputRef,
        style,
        type,
        onChange,
        fullWidth,
        startAdornment,
        endAdornment,
        isIcon,
        height,
        isRedOutline = true,
        ...rest
    } = props;
    const startAdor = startAdornment && <InputAdornment position="start"> {startAdornment} </InputAdornment>;
    const endAdor = endAdornment && <InputAdornment position="end">{endAdornment}</InputAdornment>;

    return (
        <div
            className={`${disabled ? classes.disabledComponent : ''}
        ${classes.root} acgTextInput
        `}
            style={style}
        >
            {isIcon && <div className={classes.iconStart}>{startAdor}</div>}
            <TextField
                color="primary"
                id={id}
                name={name}
                label={label}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                className={`${formInput ? formInput : ''} ${isIcon ? classes.inputWithicon : classes.inputWithoutIcon}
                ${helperText ? (isRedOutline ? classes.redOutline : '') : ''}`}
                value={value}
                helperText={helperText}
                inputRef={inputRef}
                fullWidth={fullWidth}
                inputProps={{
                    maxLength: maxLength
                }}
                InputLabelProps={{ shrink: false }}
                InputProps={{
                    readOnly: readOnly ? true : false,
                    disabled: disabled ? true : false,
                    startAdornment: isIcon ? '' : startAdor,
                    endAdornment: endAdor,
                    classes: { input: classes.input },
                    style: {
                        height: height ? height : '50px'
                    }
                }}
                {...rest}
            />
        </div>
    );
};

export default TextInput;
