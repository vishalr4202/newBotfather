import {useState,useEffect} from 'react';
import { Container,Card } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { executeACGAction, updateScreenIdentifiers } from '../../store/slice';
import { ACTION_CODES, STORE_KEYS } from '../../constants/apiConstants';
import { createStructuredSelector } from 'reselect';
import { acgSelector } from '../../store/selector';
import Switches from '../../components/Switch';
import Autocomplete from '../../components/Autocomplete';
import Button from '../../components/Button';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import AutocompleteDropdown from '../../components/AutocompleteDropdown';
import './index.scss';
import AdminPositions from '../../components/AdminPositions';
import { TickerTape } from "react-ts-tradingview-widgets";
import Snackbar from '../../components/Snackbar';


const options = {
    DEFAULT: {
        message: '',
        open: false,
        type: ''
    }
  };

const PlaceOrder = () => {
    const [derivative,setDerivative] = useState(false);
    const [optionType,setOptionType] = useState(false)
    const [instruments,setInstruments] = useState([]);
    const [selectedInstrument,setSelectedInstrument] = useState('');
    const [selectedLots,setSelectedLots] = useState('')
    const [orderType,setOrderType] = useState('')
    const [BuyorSell,setBuyOrSell] = useState(false)
    const [limitPrice,setLimitPrice] = useState('');

    const dispatch = useDispatch();
    const acgStateSelector = createStructuredSelector({
        acgSlice: acgSelector()
    });
    const { acgSlice: state } = useSelector(acgStateSelector);
    const setDerivativeValue = (e:any) => {
        setDerivative(e.target.checked)
        setOptionType(false)
    }
    const setOptionValue = (e:any) => {
        setOptionType(e.target.checked)
    }
    const setBuyOrSellValue = (e:any) => {
        setBuyOrSell(e.target.checked)
    }
    useEffect(() => {
        if(!state?.instruments?.message){
            dispatch(
                executeACGAction({
                    payload: {
                        requestType: 'GET',
                        urlPath: ACTION_CODES.GET_INSTRUMENTS
                    },
                    storeKey: STORE_KEYS.INSTRUMENTS
                })
            );
        }
    }, [])

    useEffect(() => {
        if(state?.instruments?.message?.length>0 && !derivative){
            console.log(state?.instruments?.message)
          const data = state?.instruments?.message.filter((ele:any) => (ele.name=='NIFTY' || ele.name=='BANKNIFTY' || ele.name=='FINNIFTY') && ele.segment == 'NFO-FUT').map((ele:any) => ele?.tradingsymbol)
        setInstruments(data)
        }
        else if (state?.instruments?.message?.length>0 && derivative){
        const data = state?.instruments?.message.filter((ele:any) => (ele.name=='NIFTY' || ele.name=='BANKNIFTY' || ele.name=='FINNIFTY') &&  ele.segment == 'NFO-OPT').map((ele:any) => ele?.tradingsymbol)
        setInstruments(data)
        }
        
    }, [state?.instruments?.message])

    useEffect(() => {
        let data;
        if(derivative == false){
             data = state?.instruments?.message.filter((ele:any) => (ele.name=='NIFTY' || ele.name=='BANKNIFTY' || ele.name=='FINNIFTY') &&  ele.segment == 'NFO-FUT').map((ele:any) => ele?.tradingsymbol)
             setInstruments(data)
        }
        if(derivative == true){
            data = state?.instruments?.message.filter((ele:any) => (ele.name=='NIFTY' || ele.name=='BANKNIFTY' || ele.name=='FINNIFTY') &&  ele.segment == 'NFO-OPT' && ele.instrument_type == 'CE').map((ele:any) => ele?.tradingsymbol)
            setInstruments(data)
        }
    },[derivative])

    useEffect(() => {
        let data;
        if(optionType == false && derivative){
             data = state?.instruments?.message.filter((ele:any) => (ele.name=='NIFTY' || ele.name=='BANKNIFTY' || ele.name=='FINNIFTY') &&  ele.instrument_type == 'CE').map((ele:any) => ele?.tradingsymbol)
             setInstruments(data)
        }
        if(optionType == true){
            data = state?.instruments?.message.filter((ele:any) => (ele.name=='NIFTY' || ele.name=='BANKNIFTY' || ele.name=='FINNIFTY') &&  ele.instrument_type == 'PE').map((ele:any) => ele?.tradingsymbol)
            setInstruments(data)
        }
    },[optionType])

    const getSelectedInstr = (e:any) => {
        console.log(e.target.innerText,"eded")
        setSelectedInstrument(e.target.innerText)
    }
    const getSelectedLot =(e:any) =>{
        console.log(e.target.innerText,"lot")
        setSelectedLots(e.target.innerText)
    }
    const getOrderType = (e:any) => {
        console.log(e.target.innerText,"order")
        setOrderType(e.target.innerText);
    }
    const setLimitPriceValue = (e:any) => {
        setLimitPrice(e.target.value)
    }

    const submitOrder = () => {
        let data = {
            deriviative:derivative?"options":"futures",
            entry_type:derivative && optionType ? "PE" : "CE",
            transaction_type:!derivative && BuyorSell ? 'SELL' : !derivative && !BuyorSell? 'BUY': derivative && !BuyorSell?'BUY' : 'SELL',
            tradingsymbol:selectedInstrument,
            quantity:Number(selectedLots)*50,
            order:orderType,
            limit:limitPrice !== '' ? limitPrice : null
        }
        if(selectedInstrument !== '' && selectedLots !== ''&& orderType !== ''){
            dispatch(
                executeACGAction({
                    payload: {
                        requestType: 'POST',
                        urlPath: ACTION_CODES.SET_BASIC_TRADE,
                        reqObj:data
                    },
                    storeKey: STORE_KEYS.SET_BASIC_TRADE,
                       uniqueScreenIdentifier: {
                       tradeRecd: true
                    }
                })
            )            
        }else{
            console.log('err')
        }
            setSelectedInstrument('')
            setSelectedLots('')
            setOrderType('')
            setLimitPrice('')
            getPositions()
    }
    const getPositions = () => {
        dispatch(
          executeACGAction({
            payload: {
              requestType: 'GET',
              urlPath: ACTION_CODES.USER_GET_POSITIONS,
            },
            storeKey: STORE_KEYS.USER_GET_POSITIONS,
            // uniqueScreenIdentifier: {
            //     apiKeyRecd: true
            // }
          })
        );
      };

    useEffect(() =>{
        getPositions()
    },[])

    const refresh = () => {
        // window.location.reload()
        getPositions()
    }

    const [snackbarOptions, setSnackbarOptions] = useState(options.DEFAULT);

    const closeSnackbar = () => {
        setSnackbarOptions(options.DEFAULT);
           dispatch(
            updateScreenIdentifiers({
                storeKey: "err",
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
    if (state?.err) {
            handleSnackbarError(state?.err);
        }
  }, [state?.err]);

    return (
        <div style={{marginLeft:'0px',marginTop:'5px'}}>
             <Snackbar className="login-snackbar" options={snackbarOptions} handleClose={closeSnackbar} />
            <Container maxWidth="xl" style={{ marginTop: '0px' }}>
            <Card style={{padding:'15px', borderRadius:'10px 10px 0px 0px'}}>
            {/* <TickerTape colorTheme="dark" symbols={[{
    "proName": "FOREXCOM:SPXUSD",
    "title": "S&P 500"
  },
  {
    "proName": "FOREXCOM:NSXUSD",
    "title": "Nasdaq 100"
  },
  {
    "proName": "NSE:NIFTY",
    "title": "NIFTY"
  },
  {
    "proName": "BITSTAMP:BTCUSD",
    "title": "BTC/USD"
  },
  {
    "proName": "BITSTAMP:ETHUSD",
    "title": "ETH/USD"
  }]}></TickerTape> */}

{/* <iframe  data-widget-name="" src="https://widget.darqube.com/chart-widget?token=65666fdd98f68b70329eb451" id="ChartWidget-2fv7uay"></iframe> */}

{/* <iframe style={{border: "none", width:"100%", height: "470px"}} data-widget-name="" src="https://widget.darqube.com/chart-widget?token=65666fdd98f68b70329eb451" id="ChartWidget-pbxj3dg"></iframe> */}
<iframe style={{ border: "none", width: "100%", height: "470px" }} data-widget-name="" src="https://widget.darqube.com/chart-widget?token=65666fdd98f68b70329eb451" id="ChartWidget-m5y5iaz"></iframe>
            {/* <iframe style={{width:'93vw',height:'65vh'}} frameBorder="0" src="https://ssltvc.investing.com/?pair_ID=17940&height=550&width=1400&interval=60&plotStyle=candle&domain_ID=56&lang_ID=56&timezone_ID=20" allowFullScreen></iframe> */}
            </Card>
                <Card style={{borderRadius:'0px 0px 10px 10px',padding:'15px'}}>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', marginBottom: '0px', marginLeft: '7px' }}>
                    <div style={{ flex: '80%' }}>
                        <div className="headinglabel">Place Orders</div>
                    </div>
                </div>
                {/* <div style={{display:'flex',gap:'15px',flexWrap:'wrap',marginBottom:'20px'}}>
                <div style={{marginTop:'10px'}}>
                    <Switches type="Futures" change={setDerivativeValue} checked={derivative}/>
                 </div>
                 <div style={{marginTop:'10px'}}>
                 {derivative ? <Switches type="options" change={setOptionValue} checked={optionType}/> : null}
                 </div>
                </div> */}
                
                <div style={{display:'flex',gap:'15px',flexWrap:'wrap'}}>
                <div style={{marginTop:'10px'}}>
                    <Switches type="Futures" change={setDerivativeValue} checked={derivative}/>
                 </div>
                 <div style={{marginTop:'10px'}}>
                 {derivative ? <Switches type="options" change={setOptionValue} checked={optionType}/> : null}
                 </div>
                <div style={{marginTop:'10px'}}>
                    {!derivative ?  <Switches type="LONG/SHORT" change={setBuyOrSellValue} checked={BuyorSell}/>: null}
                 </div>
                 <div style={{marginTop:'10px'}}>
                 {derivative ?  <Switches type="BUY/SELL" change={setBuyOrSellValue} checked={BuyorSell}/>: null}
                 </div>
                 {instruments?.length > 0 ? <Autocomplete data={instruments} change = {getSelectedInstr} option={derivative} style={{width:'270px'}} value={selectedInstrument}/> : <h6 style={{marginTop:'17px'}}>No Instruments data, please login to your broker</h6>}
                 {instruments?.length > 0 ?<Autocomplete data={['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20']} type="numbers" change = {getSelectedLot} value={selectedLots}/> : null}
                 {instruments?.length > 0 ?<Autocomplete data={['Market','Limit']} orderType={true} change = {getOrderType} type="numbers"  style={{width:'180px'}} value={orderType}/> : null }
                 {orderType == 'Limit' ? <TextField label={"Price"} variant="outlined" onChange={(e)=>setLimitPriceValue(e)} type="number" value={limitPrice} style={{width:'120px'}}/> : null}
                 <div className="orderButtonDiv">
                 <Button
                 formInput="buttonDiv"
                 className="simpleLoginButton"
                 fullWidth
                 name="Place Order"
                 disabled={instruments?.length > 0 && selectedInstrument !== '' && selectedLots != '' && orderType !== '' ? false : true}
                 type="submit"
                 variant="contained"
                 secondary={false}
                 handleClick={submitOrder}
                 />
                 </div>
                </div>
               
                </Card>
            </Container>                 
            <Container maxWidth="xl" style={{ marginTop: '5px' }}>
                <button onClick={refresh}>refresh</button>
            {/* ?.filter((ele:any)=>ele?.quantity != 0) */}
              <AdminPositions data={state?.getUserPositions?.message?.net} type="positions" />
            </Container>
        </div>
    )
}

export default PlaceOrder;