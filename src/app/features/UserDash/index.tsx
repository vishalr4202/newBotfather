import { useState, useEffect, useRef } from 'react';
// import { useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Grid from "@material-ui/core/Grid";
import { Container, Paper } from '@mui/material';
import ClickTiles from "../../components/CastCard";
import { getFromLocalStorage } from '../../../utilities/storageUtility';
import './index.scss';
import '../index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ACTION_CODES, STORE_KEYS } from '../../constants/apiConstants';
import { executeACGAction, updateScreenIdentifiers } from '../../store/slice';
import { acgSelector } from '../../store/selector';
import DialogAction from "../../components/DialogAction";
import Snackbar from '../../components/Snackbar';
import { Formik, Form } from 'formik';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button'
import { IconButton } from '@mui/material';
import VisibilityIcon from '../../../assets/visibilityIcon.svg';
import VisibilityOffIcon from '../../../assets/visibilityOffIcon.svg';

const options = {
    DEFAULT: {
        message: '',
        open: false,
        type: ''
    }
};
const ClientManagement = () => {
    const dispatch = useDispatch();
    // const [snackbarOptions, setSnackbarOptions] = useState(options.DEFAULT);
    const [loginClicked, setLoginClicked] = useState(false);
    const [fsLoginClicked,setFsLoginClicked] = useState(false)
    const [accessTokenUrl, setAccessTokenUrl] = useState("");
    const [snackbarOptions, setSnackbarOptions] = useState(options.DEFAULT);
    const acgStateSelector = createStructuredSelector({
        acgSlice: acgSelector()
    });
    const formRef = useRef<any>();
    const { acgSlice: state } = useSelector(acgStateSelector);
    const [initialValues] = useState({
        password: '',
        otp:''
    });
    const [disableLogin, setDisableLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const api_key = state.userDashData?.api_key;
    const [dimensions,setDimensions] = useState({width:0,height:0})
    useEffect(() => {
        setDimensions({
            width:window.innerWidth,
            height:window.innerHeight
        })
      
    },[])
    useEffect(() => {
        if (api_key) {
            console.log(api_key, "api_key")
            window.open(
                `https://kite.zerodha.com/connect/login?api_key=${api_key}&v=3`
            );
            setLoginClicked(true)
            setTimeout(() => {
                dispatch(
                    updateScreenIdentifiers({
                        storeKey: STORE_KEYS.USER_DASH_DATA,
                        uniqueScreenIdentifier: {
                            apiKeyRecd: false,
                            api_key: '',
                            message: ''
                        }
                    })
                );
            }, 2000)

        }
    }, [api_key]);

    const handleClose = () => {
        setLoginClicked(false);
        setAccessTokenUrl("");
    };

    const handleAccessTokenUrl = () => {
        if (accessTokenUrl) {
            dispatch(
                executeACGAction({
                    payload: {
                        requestType: 'POST',
                        urlPath: ACTION_CODES.GET_ACCESS_TOKEN,
                        reqObj: {
                            tokenUrl: accessTokenUrl,
                        }
                    },
                    storeKey: STORE_KEYS.ACCESS_TOKEN,
                })
            );
            setLoginClicked(false);
            setAccessTokenUrl("");
        }
        // setAccessTokenUrl("");
    };

    const handleOpenFS =() => {
        if(!state?.fs_loginData?.message){
            setFsLoginClicked(true);
        }
        else{
            const errorMsg = 'Already Logged in';
            const snackbarError = {
                message: errorMsg,
                type: 'remark',
                open: true
            };
            setSnackbarOptions(snackbarError);
        }
        
    }

    const handleCloseFS = () => {
        setFsLoginClicked(false);
    };

    const handleAccessTokenChangeUrl = (e: any) => {
        setAccessTokenUrl(e.target.value);
    };

    const getClients = () => {
        dispatch(
            executeACGAction({
                payload: {
                    requestType: 'GET',
                    urlPath: ACTION_CODES.USER_DASH,

                },
                storeKey: STORE_KEYS.USER_DASH_DATA,
                uniqueScreenIdentifier: {
                    apiKeyRecd: true
                }
            })
        );
    };

    // const FSLogin = () => {
    //     dispatch(
    //         executeACGAction({
    //             payload: {
    //                 requestType: 'POST',
    //                 urlPath: ACTION_CODES.FS_LOGIN,

    //             },
    //             storeKey: STORE_KEYS.FS_LOGIN,
    //             uniqueScreenIdentifier: {
    //                 apiKeyRecd: true
    //             }
    //         })
    //     );
    // }

    useEffect(() => {
        if (state?.err) {
            handleSnackbarError(state?.err);
            setFsLoginClicked(false);
        }
    }, [state?.err]);

    const closeSnackbar = () => {
        setSnackbarOptions(options.DEFAULT)
        dispatch(
            updateScreenIdentifiers({
                storeKey: STORE_KEYS.ACCESS_TOKEN,
                uniqueScreenIdentifier: {
                    message: ''
                }
            })
        );
    };
    const closeSuccessSnackbar = () => {
        setSnackbarOptions(options.DEFAULT)
        dispatch(
            updateScreenIdentifiers({
                storeKey: STORE_KEYS.ACCESS_TOKEN,
                uniqueScreenIdentifier: {
                    message: ''
                }
            })
        );
        dispatch(
            updateScreenIdentifiers({
                storeKey: STORE_KEYS.FS_LOGIN,
                uniqueScreenIdentifier: {
                    message: ''
                }
            })
        );
    }

    const handleSnackbarError = (err: any) => {
        const errorMsg = err || 'Internal Server error';
        const snackbarError = {
            message: errorMsg,
            type: 'remark',
            open: true
        };
        setSnackbarOptions(snackbarError);
    };

    useEffect(() => {
        if (state?.fs_loginData?.message) {
            const successMsg = state?.fs_loginData?.message || 'Internal Server error';
            const snackbarSuccess = {
                message: successMsg,
                type: 'success',
                open: true
            };
            setSnackbarOptions(snackbarSuccess);
        }
    }, [state?.fs_loginData?.message])
    
    useEffect(() => {
        if (state?.accessToken?.message) {
            const successMsg = state?.accessToken?.message || 'Internal Server error';
            const snackbarSuccess = {
                message: successMsg,
                type: 'success',
                open: true
            };
            setSnackbarOptions(snackbarSuccess);
        }
    }, [state?.accessToken?.message])

    const handleClick = () => {
        setShowPassword((prev) => !prev);
    };


    const handleSubmit = async () => {
           dispatch(
                    executeACGAction({
                        payload: {
                            requestType: 'POST',
                            urlPath: ACTION_CODES.FS_LOGIN,
                            reqObj: {
                                password: formRef?.current?.values?.password,
                                otp:formRef?.current?.values?.otp,
                            }
                        },
                        storeKey: STORE_KEYS.FS_LOGIN,
                    })
                );
    }

    useEffect(() => {
        setFsLoginClicked(false);
    },[state?.fs_loginData])


    return (
        <div className="dashboard">
            <Container maxWidth="xl" style={{ marginTop: '60px' }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} lg={3} xl={3} md={6}>
                        <ClickTiles title="Zerodha" handleClick={getClients} />
                    </Grid>
                    {/* <Grid item xs={12} lg={3} xl={3} md={6}>
                        <ClickTiles title="5 paisa" handleClick />
                    </Grid> */}
                    <Grid item xs={12} lg={3} xl={3} md={6}>
                        <ClickTiles title="Firstock" handleClick={handleOpenFS} />
                    </Grid>
                    {/* <Grid item xs={12} lg={3} xl={3} md={6}>
                        <ClickTiles title="Grow" handleClick />
                    </Grid> */}
                </Grid>
                <DialogAction
                    close={handleClose}
                    open={loginClicked}
                    click={handleAccessTokenUrl}
                    change={handleAccessTokenChangeUrl}
                    accessTokenUrl={accessTokenUrl}
                    type="zerodha"
                />
                  <DialogAction
                    close={handleCloseFS}
                    open={fsLoginClicked}
                    click={handleOpenFS}
                    type="firstock"
                >
                    <Paper elevation={6} style={{padding:'30px',marginTop:'20px'}}>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={() => {
                            handleSubmit();
                        }}
                        validateOnBlur={false}
                        innerRef={formRef}
                    >
                        {(formikprops) => {
                            const { values, handleChange, handleBlur, isValid, errors, touched } = formikprops;
                            return (
                                <div className="loginField">
                                    <Form>
                                        {/* <TextInput
                                            variant="outlined"
                                            maxLength={50}
                                            autoFocus
                                            fullWidth
                                            type="text"
                                            name="emailId"
                                            value={values.emailId}
                                            formInput="textBoxDiv"
                                            onChange={(e) => {
                                                setDisableLogin(false);
                                                handleChange(e);
                                            }}
                                            onBlur={handleBlur}
                                            placeholder="Enter UserId"
                                            helperText={errors.emailId && touched.emailId ? errors.emailId : ''}
                                        /> */}
                                        <TextInput
                                            variant="outlined"
                                            maxLength={50}
                                            fullWidth
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            formInput="textBoxDiv"
                                            onChange={(e) => {
                                                setDisableLogin(false);
                                                handleChange(e);
                                            }}
                                            placeholder="Enter Password"
                                            endAdornment={
                                                <IconButton tabIndex={-1} className="password-eye" onClick={handleClick}>
                                                    {showPassword ? (
                                                        <img src={VisibilityIcon} alt="logo" />
                                                    ) : (
                                                        <img src={VisibilityOffIcon} alt="logo" />
                                                    )}
                                                </IconButton>
                                            }
                                            value={values.password}
                                            onBlur={handleBlur}
                                            helperText={errors.password && touched.password ? errors.password : ''}
                                        />
                                        <TextInput
                                            variant="outlined"
                                            maxLength={6}
                                            autoFocus
                                            fullWidth
                                            type="number"
                                            name="otp"
                                            value={values.otp}
                                            formInput="textBoxDiv"
                                            onChange={(e) => {
                                                setDisableLogin(false);
                                                handleChange(e);
                                            }}
                                            onBlur={handleBlur}
                                            placeholder="Enter UserId"
                                            helperText={errors.otp && touched.otp ? errors.otp : ''}
                                        />
                                        <Button
                                            formInput="buttonDiv"
                                            className="simpleLoginButton"
                                            fullWidth
                                            name="Login"
                                            disabled={disableLogin || !isValid}
                                            type="submit"
                                            variant="contained"
                                            secondary={false}
                                        // handleClick={login}
                                        />
                                    </Form>
                                </div>
                            )
                        }}

                    </Formik>
                </Paper>  
                </DialogAction>
                <Snackbar className="" options={snackbarOptions} handleClose={closeSnackbar} />
                <Snackbar className="" options={snackbarOptions} handleClose={closeSuccessSnackbar} />
                <Container>
              
                </Container>
                <div>
                    {/* <iframe style={{width:'93vw',height:'100vh'}} src="https://tvc-invdn-com.investing.com/tool/1.12.9/tool-prod-2-ssl.html?carrier=bda4911b3ef0d14d0a1ac44f933e9987&time=1700866377&domain_ID=56&lang_ID=56&timezone_ID=20&version=1.12.9&locale=en&timezone=Asia/Kolkata&pair_ID=8985&interval=5&session=24x7&prefix=in&client=0&user=&plotStyle=candles&geoc=IN&styleOverride=&family_prefix=tvc4" /> */}
          {/* <iframe style={{width:'93vw',height:'100vh'}} src="https://tvc-invdn-com.investing.com/tool/1.12.9/tool-prod-2-ssl.html?carrier=ca86913af8c68dd61da3ab7a8feb6b2f&time=1700857254&domain_ID=56&lang_ID=56&timezone_ID=20&version=1.12.9&locale=en&timezone=Asia/Kolkata&pair_ID=8985&interval=5&session=24x7&prefix=in&client=0&user=&plotStyle=candles&geoc=IN&styleOverride="></iframe>   */}
          {/* <iframe style={{width:'93vw',height:'100vh'}} frameBorder="0" src="https://ssltvc.investing.com/?pair_ID=8985&height=600&width=1400&interval=60&plotStyle=candle&domain_ID=56&lang_ID=56&timezone_ID=20" allowFullScreen></iframe> */}
          {/* <iframe className='chart_iframe' style={{width:'93vw',height:'100vh'}}src="https://tvc-invdn-com.investing.com/web/1.12.34/index59-prod.html?carrier=a1005751f2c3a71ec6930f56f6e45fc9&time=1700853942&plotStyle=candle&domain_ID=56&lang_ID=56&timezone_ID=23&version=1.12.34&locale=en&timezone=Asia/Kolkata&pair_ID=17940&interval=D&session=session&prefix=in&suffix=&client=1&user=0&family_prefix=tvc4&init_page=instrument&sock_srv=https://streaming.forexpros.com&m_pids=&watchlist=&geoc=IN&site=https://in.investing.com" allowFullScreen/> */}
          {/* <iframe style={{width:'93vw',height:'100vh'}} src="https://tvc-invdn-com.investing.com/web/1.12.34/index59-prod.html?carrier=91f37c0c0df0367e6106b2413fd2d309&time=1700856038&domain_ID=56&lang_ID=56&timezone_ID=20&version=1.12.33&locale=en&timezone=Asia/Kolkata&pair_ID=8985&interval=15&session=session&user=0&prefix=in&family_prefix=tvc4&geoc=IN"></iframe> */}
        </div> 
            </Container>
        </div>
    );
};

export default ClientManagement;
