import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { Container, Card, Paper, Grid } from '@mui/material';
import { createStructuredSelector } from 'reselect';
import '../index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { executeACGAction } from '../../store/slice';
import { acgSelector } from '../../store/selector';
import { useHistory } from 'react-router-dom'
import { ACTION_CODES, STORE_KEYS } from '../../constants/apiConstants';
import Button from '../../components/Button';


const AdminSet = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const acgStateSelector = createStructuredSelector({
        acgSlice: acgSelector()
    });
    const { acgSlice: state } = useSelector(acgStateSelector);



    const toAdminDetail = (ele: any) => {
        console.log(ele,"ele")
        history.push({
            pathname: `/adminset/${ele?.name}`,
            state: {
                params: ele
            }
        })
    }

    useEffect(() => {
        dispatch(
            executeACGAction({
                payload: {
                    requestType: 'GET',
                    urlPath: ACTION_CODES.GET_SETS,
                },
                storeKey: STORE_KEYS.GET_SETS,
                uniqueScreenIdentifier: {
                    setsrecd: true
                }
            })
        )
    },[])
    console.log(state?.allSets?.message,"state")
    return (
        <div className="dashboard">
            {/* <SnackbarAlert options={snackbarOptions} handleClose={closeSnackbar} /> */}
            <Container maxWidth="xl" style={{ marginTop: '60px' }}>
               
                <Grid container spacing={4}>
                    {state?.allSets?.message?.map((ele:any) => {
                        return(
                    <Grid item xs={12} lg={3} xl={3} md={6} onClick={()=>toAdminDetail(ele)}>
                        <Paper style={{ borderRadius: '10px', padding: '15px', cursor: 'pointer' }} elevation={8}>
                            <h4 style={{ marginBottom: '0px', fontFamily: 'Montserrat', fontSize: '20px', color: 'rgba(0, 0, 0, 0.54)' }}>{ele?.name}</h4>
                            <h6 style={{marginBottom:'0px',fontFamily: 'Montserrat',color: 'rgba(0, 0, 0, 0.54)'}}>{ele?.primary}</h6>
                            <h6 style={{marginBottom:'0px',fontFamily: 'Montserrat',color: 'rgba(0, 0, 0, 0.54)'}}>{ele?.email?.length} users</h6>
                            <div style={{display:'flex',gap:'10px'}}>
                            <Button
                            // formInput="buttonDiv"
                            className="simpleBuyButton"
                            fullWidth
                            name="View"
                            type="submit"
                            variant="contained"
                            secondary={false}
                            handleClick={()=>{}}
                            style={{color:'white',fontFamily: 'Montserrat',}}
                        />
                            <Button
                            // formInput="buttonDiv"
                            className="simpleSellButton"
                            fullWidth
                            name="Delete"
                            type="submit"
                            variant="contained"
                            secondary={false}
                            handleClick={()=>{}}
                            style={{color:'white'}}
                        />
                            </div>
                           
                        </Paper>
                     </Grid>
                        )
                    })
                   }
                </Grid>
            </Container>
        </div>
    );
};

export default AdminSet;
