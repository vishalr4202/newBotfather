import { useState, useCallback, useEffect,useRef } from "react";
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { createStructuredSelector } from 'reselect';
import * as Yup from 'yup';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { IconButton } from '@mui/material';
import "./index.scss";
import LoginImg from "../../../assets/login_bg.svg";
import Button from '../../components/Button'
import TextInput from "../../components/TextInput"
import VisibilityIcon from '../../../assets/visibilityIcon.svg';
import VisibilityOffIcon from '../../../assets/visibilityOffIcon.svg';
import { LOGIN_YUPSCHEMA } from './schema';
import { useDispatch, useSelector } from 'react-redux';
import { ACTION_CODES, STORE_KEYS } from '../../constants/apiConstants';
import { executeACGAction } from '../../store/slice';
import { acgSelector } from '../../store/selector';
import Snackbar from '../../components/Snackbar';
import { paths, ROUTES_PATH } from '../../constants/paths';

const options = {
  DEFAULT: {
      message: '',
      open: false,
      type: ''
  }
};

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const formRef = useRef<any>();
  const acgStateSelector = createStructuredSelector({
    acgSlice: acgSelector()
});
const { acgSlice: state } = useSelector(acgStateSelector);
  // const login = () => {
  //   history.push('/adminDash')
  // }
  const [initialValues] = useState({
    emailId: '',
    password: ''
  });
  const [disableLogin, setDisableLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [validationSchema, setValidationSchema] = useState({});
  const [snackbarOptions, setSnackbarOptions] = useState(options.DEFAULT);
  
  const handleClick = () => {
    setShowPassword((prev) => !prev);
};

useEffect(() => {
  setValidationSchema(Yup.object().shape(LOGIN_YUPSCHEMA));
}, []);


useEffect(() => {
  if(state?.loginData?.isLoggedIn===true){
    if(state?.loginData?.role == 'admin'){
      history.push('/adminDash')
    }else{
      history.push('/userDash')
    }
  }
}, [state?.loginData?.isLoggedIn]);



 const closeSnackbar = () => setSnackbarOptions(options.DEFAULT);

 const handleSnackbarError = (err: any) => {
  const errorMsg = err || 'Internal Server error';
  const snackbarError = {
      message: errorMsg,
      type: 'remark',
      open: true
  };
  setSnackbarOptions(snackbarError);
};

// const handleSnackbarSuccess = (success: any) => {
//   const successMsg = success?.message || 'Internal Server error';
//   const snackbarSuccess = {
//     message: successMsg,
//     type: 'success',
//     open: true
// };
//   setSnackbarOptions(snackbarSuccess);
// };

// useEffect(() => {
//   if (state?.loginData) {
//     handleSnackbarSuccess(state?.loginData);
//       }
// }, [state?.loginData]);

useEffect(() => {
  if (state?.err) {
          handleSnackbarError(state?.err);
      }
}, [state?.err]);

const handleSubmit = async () => {
  const bundle = {
      payload: {
          urlPath: ACTION_CODES.LOGIN,
          requestType: 'POST',
          reqObj: {
              email: formRef?.current?.values?.emailId,
              password: formRef?.current?.values?.password
          }
      },
      uniqueScreenIdentifier: { isLoggedIn: true },
      storeKey: STORE_KEYS.LOGIN_DATA
  };
  dispatch(executeACGAction(bundle));
};

  return (
    <div>
      <div className="background">
        <Grid container>
          <Grid item xs={12} md={8} lg={8} className="leftGrid">
            {/* <h1 className="imageHeading">Hi, Welcome back</h1> */}
            <img src={LoginImg} alt="login image" className="leftImage" />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            {/* <Paper className=""> */}
            <Paper elevation={6} className="loginPaper">
            <Snackbar className="login-snackbar" options={snackbarOptions} handleClose={closeSnackbar} />
              {/* position: "relative", */}
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
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
                      <TextInput
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
                                placeholder="Enter Email ID"
                                helperText={errors.emailId && touched.emailId ? errors.emailId : ''}
                            />
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
            {/* </Paper> */}
            {/* {console.log(prices)} */}
          </Grid>
        </Grid>
        {/* <div>
        <iframe src="https://tvc-invdn-com.investing.com/web/1.12.34/index59-prod.html?carrier=a1005751f2c3a71ec6930f56f6e45fc9&time=1700853942&domain_ID=56&lang_ID=56&timezone_ID=23&version=1.12.34&locale=en&timezone=Asia/Kolkata&pair_ID=17940&interval=D&session=session&prefix=in&suffix=&client=1&user=0&family_prefix=tvc4&init_page=instrument&sock_srv=https://streaming.forexpros.com&m_pids=&watchlist=&geoc=IN&site=https://in.investing.com" />
        </div> */}
               
      </div>
    </div>
  );
};

export default Login;
