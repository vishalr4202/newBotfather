import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import ACGButton from '../Button';
import ErrorIcon from '@mui/icons-material/Error';
import { useHistory } from 'react-router-dom';
// import useGetState from '../../utils/hooks/useGetState';
import { STORE_KEYS } from '../../constants/apiConstants';

export default function Error() {
    const [path, setPath] = useState<any>();
    const history = useHistory();
    // const state = useGetState();
    // useEffect(() => {
    //     if (state?.[STORE_KEYS.DEFAULT_PAGE]) {
    //         setPath(state?.[STORE_KEYS.DEFAULT_PAGE]);
    //     }
    // }, [state?.[STORE_KEYS.DEFAULT_PAGE]]);
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                // backgroundColor: '#1d1e2c',
                minHeight: '100vh'
            }}
            className="dashboard"
        >
            <ErrorIcon
                style={{
                    color: '#EB7725',
                    width: '100px',
                    height: '100px'
                }}
            />
            <Typography variant="h1">
                404
            </Typography>
            <Typography variant="h6">
                The page you’re looking for doesn’t exist.
            </Typography>
            <ACGButton
                name={'Back Home'}
                handleClick={() => {
                    history.push('/');
                }}
                secondary={true}
                style={{ marginTop: '20px' }}
                type="button"
                variant="contained"
            />
        </Box>
    );
}
