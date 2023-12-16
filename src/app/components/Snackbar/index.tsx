//import { Snackbar, SnackbarProps, IconButtonProps } from '@material-ui/core';
import { Snackbar } from '@mui/material';
import SnackbarMessage from './SnackbarMessage';
import SuccessIcon from '../../../assets/greentick.svg';
import './index.scss';

type ComponentProps = {
    options?: any;
    handleClose: any;
    className?: string;
    image?: any;
};

const SnackbarAlert = (props: ComponentProps) => {
    const { options, handleClose, className } = props;
    const imageOption = options?.type === 'success' ? SuccessIcon : null;

    return (
        <Snackbar
            open={options?.open}
            autoHideDuration={4000}
            className={ 'acgSnackbar'}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }}
        >
            <div>
                <SnackbarMessage image={imageOption} options={options} handleClose={handleClose} />{' '}
            </div>
        </Snackbar>
    );
};

export default SnackbarAlert;
