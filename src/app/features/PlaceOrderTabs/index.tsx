import { useState, useEffect } from 'react';
import '../index.scss';
import Tabs from '../../components/PlaceOrderTabs'
import { Container, Card, Grid,Paper } from '@mui/material';
import { createStructuredSelector } from 'reselect';
import { acgSelector } from '../../store/selector';
import { useDispatch, useSelector } from 'react-redux';
import PlaceOrder from '../../features/PlaceOrder';
import FSPlaceOrder from '../../features/FSPlaceOrder';
import Dummy from '../../features/PlaceOrder/dummy.tsx'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const PlaceOrderTabs = () => {
  const acgStateSelector = createStructuredSelector({
    acgSlice: acgSelector()
  });
  const { acgSlice: state } = useSelector(acgStateSelector);
  const [valids, setValids] = useState<any>([])
  const [selectedValid,setSelectedValid] = useState('')

  useEffect(() => {
    const keys = Object.keys(state?.loginData?.access);
    // 
    const validCards = keys.filter((ele:any) =>state?.loginData?.access[ele] == true)
    setValids(validCards)
  }, [])

  const selectBroker = (e:any) => {
    setSelectedValid(e.target.innerText)
  }

  const resetBroker = () => {
    setSelectedValid('')
  }

  return (
    <div className="dashboard">
      {/* <div style={{ marginTop: '60px', width: '100%' }}> */}
        <Container maxWidth='xl' style={{ marginTop: '60px', width: '100%' }}>
         {selectedValid !== '' ? <Card style={{padding:'10px',borderRadius:'10px'}}>
          <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center'}}>
          <KeyboardArrowLeftIcon style={{color:'green',cursor:'pointer'}} onClick={resetBroker}/>
          <h6 style={{marginBottom:'0px',fontFamily:'Montserrat',color:'rgba(0, 0, 0, 0.54)'}}>Back to brokers</h6>
          </div>
         
          </Card> : null}
          {selectedValid == '' ? 
          <Grid container spacing={4}>
            {valids.map((ele:any) => {
              return (
                <Grid item xs={12} lg={3} xl={3} md={6} onClick={selectBroker}>
                  <Paper style={{ borderRadius: '10px', padding: '15px',cursor:'pointer' }} elevation={8}>
                    <h4 style={{marginBottom:'0px',fontFamily:'Montserrat',fontSize:'20px',color:'rgba(0, 0, 0, 0.54)'}}>{ele}</h4>
                  </Paper>
                </Grid>
              )
            })}
          </Grid>
          : null}
        </Container>
        {/* <Tabs /> */}
      {/* </div> */}
      {selectedValid == 'Firstock' ? 
            <FSPlaceOrder />
           : null}
            {selectedValid == 'Zerodha' ? 
              <PlaceOrder />
           : null}
           {selectedValid == ''? 
           <div style={{visibility:'hidden'}}>
            <Container>
            <Dummy />
            </Container>
           </div> : null}
     </div>
  );
};

export default PlaceOrderTabs;
