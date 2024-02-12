import { Container, Card, Paper, Grid } from '@mui/material';
import '../index.scss';
import { useHistory } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import '../index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { executeACGAction ,updateScreenIdentifiers} from '../../store/slice';
import { acgSelector } from '../../store/selector';
import { ACTION_CODES, STORE_KEYS } from '../../constants/apiConstants';
import FSInstrument from "../../../utils/FSInstruments/fsInstruments.json";
import Chart from '../../components/FS_Charts/index.jsx';
import Autocomplete from '../../components/Autocomplete';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import Dummy from '../PlaceOrder/dummy';
import Button from '../../components/Button';
import AdminPositions from '../../components/FSAdminPositions/index.js';
import Snackbar from '../../components/Snackbar/index.js';
import Switches from '../../components/Switch/index.js';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Chip from '../../components/Chip/index.js';
import ShortStraddle from '../../components/ShortStraddle/index.js';
import ShortStrangle from '../../components/ShortStrangle/index.js';
import LongStraddle from '../../components/longStraddle/index.js';
import LongStrangle from '../../components/longStrangle/index.js';
import BullSpread from '../../components/BullSpread/index.js';
import BearSpread from '../../components/BearSpread/index.js';

const options = {
    DEFAULT: {
        message: '',
        open: false,
        type: ''
    }
};

const AdminSetDetail = (props:any) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const acgStateSelector = createStructuredSelector({
        acgSlice: acgSelector()
    });
    const { acgSlice: state } = useSelector(acgStateSelector);
    const [data,setData] = useState()
    const [chartSymbol, setChartSymbol] = useState<any>([FSInstrument.map((ele: any) => ele?.TradingSymbol)])
    const [chartToken, setChartToken] = useState('26000')
    const [selectedChartSymbol, setSelectedChartSymbol] = useState('')
    const [quickLots, setQuickLots] = useState('')

    useEffect(() => {
    if(props?.location?.state?.params){
        setData(props?.location?.state?.params?.primary)
    }
    else{
        history.push({
            pathname: `/adminset`,  
        })
    }
        if (state?.primaryUserDetail?.message == undefined) {
            dispatch(
                executeACGAction({
                    payload: {
                        requestType: 'POST',
                        urlPath: ACTION_CODES.SET_PRIMARY_USER_DETAIL,
                        reqObj: {primary : props?.location?.state?.params?.primary}
                    },
                    storeKey: STORE_KEYS.SET_PRIMARY_USER_DETAIL
                })
            );
        }
    },[])
    const changeMainSymbol = (e: any) => {
        const Instrtoken = FSInstrument.filter((ele: any) => ele?.TradingSymbol == e.target.innerText)
        // alert(e.target.innerText)
        setSelectedChartSymbol(e.target.innerText)
        setChartToken(JSON.stringify(Instrtoken[0]?.Token))
        setQuickLots('')
    }
    const changeQuickLots = (e: any) => {
        console.log(selectedChartSymbol, 'selecSymb');
        let x = 0
        if (selectedChartSymbol != '' && selectedChartSymbol.includes('BANKNIFTY')) {
            x = e.target.value <= 900 ? e.target.value : 900
        }
        if (selectedChartSymbol != '' && selectedChartSymbol.includes('FINNIFTY')) {
            x = e.target.value <= 1800 ? Math.ceil(e.target.value / 45) : 1800
        }
        if (selectedChartSymbol == '' || selectedChartSymbol.includes('NIFTY')) {
            x = e.target.value <= 1800 ? e.target.value : 1800
        }
        setQuickLots(x.toString())
    }
    const quickBuySubmit = () => {
        const newData = {
            exchange: "NFO",
            tradingsymbol:selectedChartSymbol,
            quantity: quickLots,
            name:props?.location?.state?.params?.name
        }
        dispatch(
            executeACGAction({
                payload: {
                    requestType: 'POST',
                    urlPath: ACTION_CODES.PLACE_SET_ORDER,
                    reqObj: newData
                },
                storeKey: STORE_KEYS.PLACE_SET_ORDER,
                uniqueScreenIdentifier: {
                    tradeRecd: true
                }
            })
        )
    }
    const quickSellSubmit = () => {
        const newData = {
            exchange: "NFO",
            tradingsymbol:selectedChartSymbol,
            quantity: quickLots,
            name: props?.location?.state?.params?.name
        }
        dispatch(
            executeACGAction({
                payload: {
                    requestType: 'POST',
                    urlPath: ACTION_CODES.EXIT_SET_ORDER,
                    reqObj: newData
                },
                storeKey: STORE_KEYS.EXIT_SET_ORDER,
                uniqueScreenIdentifier: {
                    tradeRecd: true
                }
            })
        )
    }
    const getPrimarySetPositions = () => {
        if(props?.location?.state?.params?.primary){

        }
        dispatch(
            executeACGAction({
                payload: {
                    requestType: 'POST',
                    urlPath: ACTION_CODES.PRIMARY_SET_POSITION,
                    reqObj:{email:props?.location?.state?.params?.primary}
                },
                storeKey: STORE_KEYS.PRIMARY_SET_POSITION,
                uniqueScreenIdentifier: {
                    setUserPos: true
                }
            })
        );
    };

    useEffect(() => {
        const x = setInterval(() => {
            getPrimarySetPositions()
        }, 2000)
        return () => {
            clearInterval(x)
        }
    }, [])

    const [snackbarOptions, setSnackbarOptions] = useState(options.DEFAULT);

    const closeSnackbar = () => {
        setSnackbarOptions(options.DEFAULT)
        dispatch(
            updateScreenIdentifiers({
                storeKey: "err",
            })
        );
    };

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



    // Lower place Orders
    const [isStrategy, setIsStrategy] = useState(false);
    const [multiLegged, setMultiLegged] = useState<any>([{ derivative: false, optionType: false, instruments: FSInstrument.filter((ele: any) => ele?.OptionType == "XX").map((ele: any) => ele?.TradingSymbol), selectedInstrument: "", selectedLots: [], orderType: '', BuyorSell: false, limitPrice: '', lotSize: [] }])
    const [instr, setInstr] = useState<any>([FSInstrument.filter((ele: any) => ele?.OptionType == "XX").map((ele: any) => ele?.TradingSymbol)])
    const [lots, setLots] = useState<any>([[]]);
    const [singleOrder, setSingleOrder] = useState(true)

    useEffect(() => {
        // console.log(multiLegged, "dfs")
        const data = [...multiLegged]
        const datas = data.map((ele: any) => {
            let instrums
            if (!ele?.derivative && !ele?.optionType) {
                instrums = FSInstrument.filter((ele: any) => ele?.OptionType == "XX").map((ele: any) => ele?.TradingSymbol)
            }
            if (!ele?.derivative && ele?.optionType) {
                instrums = FSInstrument.filter((ele: any) => ele?.OptionType == "XX").map((ele: any) => ele?.TradingSymbol)
            }
            if (ele?.derivative && !ele?.optionType) {
                instrums = FSInstrument.filter((ele: any) => ele?.OptionType == "CE").map((ele: any) => ele?.TradingSymbol)
            }
            if (ele?.derivative && ele?.optionType) {
                instrums = FSInstrument.filter((ele: any) => ele?.OptionType == "PE").map((ele: any) => ele?.TradingSymbol)
            }
            return instrums
        })
        // console.log(datas)
        setInstr(datas)

        const numLots = data.map((ele: any) => {
            let lots: any[]
            if (ele?.selectedInstrument == '') {
                lots = []
            }
            else if (ele?.selectedInstrument !== '' && ele?.selectedInstrument.includes('BANKNIFTY')) {
                const arr = []
                for (let i = 1; i <= 60; i++) {
                    arr.push(i.toString())
                }
                // setLotSize(arr)
                lots = arr
            }
            else if (ele?.selectedInstrument !== '' && ele?.selectedInstrument.includes('FINNIFTY')) {
                const arr = []
                for (let i = 1; i <= 45; i++) {
                    arr.push(i.toString())
                }
                // setLotSize(arr)
                lots = arr
            }
            else {
                const arr = []
                for (let i = 1; i <= 36; i++) {
                    arr.push(i.toString())
                }
                // setLotSize(arr)
                lots = arr;
            }
            return lots
        })
        // console.log(numLots, "lots")
        setLots(numLots)

    }, [multiLegged])

    const changeLegValues = (e: any, index: any, text: string) => {
        console.log(e.target.value, index, text, "inner")
        const data = [...multiLegged]
        const newData = data.map((ele: any, index1: any) => {
            if (index == index1) {
                let instrums;
                if (!ele?.derivative && !ele?.optionType) {
                    instrums = FSInstrument.filter((ele: any) => ele?.OptionType == "XX").map((ele: any) => ele?.TradingSymbol)
                }
                if (!ele?.derivative && ele?.optionType) {
                    instrums = FSInstrument.filter((ele: any) => ele?.OptionType == "XX").map((ele: any) => ele?.TradingSymbol)
                }
                if (ele?.derivative && !ele?.optionType) {
                    instrums = FSInstrument.filter((ele: any) => ele?.OptionType == "CE").map((ele: any) => ele?.TradingSymbol)
                }
                if (ele?.derivative && ele?.optionType) {
                    instrums = FSInstrument.filter((ele: any) => ele?.OptionType == "PE").map((ele: any) => ele?.TradingSymbol)
                }

                return {
                    ...ele,
                    derivative: text == 'derivative' ? e.target.checked : ele?.derivative,
                    optionType: text == 'optionType' ? e.target.checked : ele?.optionType,
                    BuyorSell: text == 'BuyorSell' ? e.target.checked : ele?.BuyorSell,
                    instruments: instrums,
                    selectedInstrument: text == 'selectedInstr' ? e.target.innerText ? e.target.innerText : '' : ele?.selectedInstrument,
                    selectedLots: text == 'selectedLots' ? e.target.innerText ? e.target.innerText : '' : ele?.selectedLots,
                    orderType: text == "orderType" ? e.target.innerText ? e.target.innerText : '' : ele?.orderType,
                    limitPrice: text== "limitPrice" ? e.target.innertext : ''
                }
            }
            else {
                return ele
            }
        })
        setMultiLegged(newData)
        // console.log(newData, "newData")
    }
    const addLeg = () => {
        const newData = [...multiLegged]
        const newSymb = [...instr];
        const newLot = [...lots]
        newData.push({ derivative: false, optionType: false, instruments: FSInstrument.filter((ele: any) => ele?.OptionType == "XX").map((ele: any) => ele?.TradingSymbol), selectedInstrument: "", selectedLots: 0, orderType: '', BuyorSell: false, limitPrice: '', lotSize: [] })
        newSymb.push(FSInstrument.filter((ele: any) => ele?.OptionType == "XX").map((ele: any) => ele?.TradingSymbol))
        newLot.push([])
        setMultiLegged(newData)
        setInstr(newSymb)
        setLots(newLot)
        setSingleOrder(false)
        console.log(newData)
    }

    const deleteLeg = (index: any) => {
        // alert(index)
        const newData = [...multiLegged]
        const removed = newData.filter((ele: any, innerIndex: any) => index !== innerIndex)
        const newSymb = [...instr];
        const removedInstr = newSymb.filter((ele: any, innerIndex: any) => index !== innerIndex)
        const newLot = [...lots]
        const removedLot = newLot.filter((ele: any, innerIndex: any) => index !== innerIndex)
        // newData.pop()
        // newSymb.pop()
        // newLot.pop()
        setMultiLegged(removed)
        setInstr(removedInstr)
        setLots(removedLot)
        if (newData?.length == 1) {
            setSingleOrder(true)
        }
    }
    const submitOrder = () => {
        const newData = [...multiLegged].map((ele: any) => {
            let quantMultiple = 50;
            if (ele?.selectedInstrument.includes('BANKNIFTY')) {
                quantMultiple = 15
            }
            if (ele?.selectedInstrument.includes('FINNIFTY')) {
                quantMultiple = 40
            }
            return {
                exchange: "NFO",
                tradingsymbol: ele?.selectedInstrument,
                quantity: String(Number(ele?.selectedLots) * quantMultiple),
                price: "0",
                product: "M",
                transaction_type: !ele?.derivative && ele?.BuyorSell ? 'S' : !ele?.derivative && !ele?.BuyorSell ? 'B' : ele?.derivative && !ele?.BuyorSell ? 'B' : 'S',
                priceType: ele?.orderType == 'Market' ? 'MKT' : "LMT",
                retention: "IOC",
                triggerPrice: "0",
                remarks: "Test1",
                name:props?.location?.state?.params?.name
            }
        })

        // console.log(data, "data");
        console.log(multiLegged, "legs")
        if (singleOrder) {
            dispatch(
                executeACGAction({
                    payload: {
                        requestType: 'POST',
                        urlPath: ACTION_CODES.PLACE_SET_ORDER,
                        reqObj: newData[0]
                    },
                    storeKey: STORE_KEYS.PLACE_SET_ORDER,
                    uniqueScreenIdentifier: {
                        tradeRecd: true
                    }
                })
            )
            // dispatch(
            //     executeACGAction({
            //         payload: {
            //             requestType: 'POST',
            //             urlPath: ACTION_CODES.FS_PLACE_SINGLE_ORDER,
            //             reqObj: newData[0]
            //         },
            //         storeKey: STORE_KEYS.FS_PLACE_SINGLE_ORDER,
            //         uniqueScreenIdentifier: {
            //             tradeRecd: true
            //         }
            //     })
            // )
        }
        else if (!singleOrder) {

            const newData = [...multiLegged].map((ele: any) => {
                let quantMultiple = 50;
                if (ele?.selectedInstrument.includes('BANKNIFTY')) {
                    quantMultiple = 15
                }
                if (ele?.selectedInstrument.includes('FINNIFTY')) {
                    quantMultiple = 40
                }
                return {
                    exchange: "NFO",
                    tradingSymbol: ele?.selectedInstrument,
                    quantity: String(Number(ele?.selectedLots) * quantMultiple),
                    price: "0",
                    product: "M",
                    transactionType: !ele?.derivative && ele?.BuyorSell ? 'S' : !ele?.derivative && !ele?.BuyorSell ? 'B' : ele?.derivative && !ele?.BuyorSell ? 'B' : 'S',
                    priceType: ele?.orderType == 'Market' ? 'MKT' : "LMT",
                    retention: "IOC",
                    triggerPrice: "0",
                    remarks: "Test1",
                    name:props?.location?.state?.params?.name
                }
            })
            dispatch(
                executeACGAction({
                    payload: {
                        requestType: 'POST',
                        urlPath: ACTION_CODES.SET_MULTI_ORDERS,
                        reqObj: newData
                    },
                    storeKey: STORE_KEYS.SET_MULTI_ORDERS,
                    uniqueScreenIdentifier: {
                        tradeRecd: true
                    }
                })
            )
        }
        else {
            console.log('err')
        }
        // getPrimarySetPositions()
        setMultiLegged([{ derivative: false, optionType: false, instruments: FSInstrument.filter((ele: any) => ele?.OptionType == "XX").map((ele: any) => ele?.TradingSymbol), selectedInstrument: "", selectedLots: 0, orderType: '', BuyorSell: false, limitPrice: '', lotSize: [] }])
    }

//  Straddle Strangle Strategies Logic
const [selectedStrategy, setSelectedStrategy] = useState(0)
const handleClickChip = (chipToDelete: any) => {
    console.log(chipToDelete)
    setSelectedStrategy(chipToDelete?.key)
};

const placeStrategy = (e: any, type: string) => {
    console.log(e, "ashj")
    const newObj = {...e,name:props?.location?.state?.params?.name}
    if (type == "shortStraddle") {
        placeShortStraddle(newObj)
    }
    if (type == "shortStrangle") {
        placeShortStrangle(newObj)
    }
    if (type == "longStraddle") {
        placeLongStraddle(newObj)
    }
    if (type == "longStrangle") {
        placeLongStrangle(newObj)
    }
    if (type == "bullSpread") {
        placeBullSpread(newObj)
    }
    if (type == "bearSpread") {
        placeBearSpread(newObj)
    }
}

const placeShortStraddle = (e: any) => {
    dispatch(
        executeACGAction({
            payload: {
                requestType: 'POST',
                urlPath: ACTION_CODES.SET_SHORT_STRADDLE,
                reqObj: e
            },
            storeKey: STORE_KEYS.SET_SHORT_STRADDLE,
            uniqueScreenIdentifier: {
                setStraddle: true
            }
        })
    );
};
const placeShortStrangle = (e: any) => {
    dispatch(
        executeACGAction({
            payload: {
                requestType: 'POST',
                urlPath: ACTION_CODES.SET_SHORT_STRANGLE,
                reqObj: e
            },
            storeKey: STORE_KEYS.SET_SHORT_STRANGLE,
            // uniqueScreenIdentifier: {
            //     apiKeyRecd: true
            // }
        })
    );
};
const placeLongStraddle = (e: any) => {
    dispatch(
        executeACGAction({
            payload: {
                requestType: 'POST',
                urlPath: ACTION_CODES.SET_LONG_STRADDLE,
                reqObj: e
            },
            storeKey: STORE_KEYS.SET_LONG_STRADDLE,
            // uniqueScreenIdentifier: {
            //     apiKeyRecd: true
            // }
        })
    );
};
const placeLongStrangle = (e: any) => {
    dispatch(
        executeACGAction({
            payload: {
                requestType: 'POST',
                urlPath: ACTION_CODES.SET_LONG_STRANGLE,
                reqObj: e
            },
            storeKey: STORE_KEYS.SET_LONG_STRANGLE,
            // uniqueScreenIdentifier: {
            //     apiKeyRecd: true
            // }
        })
    );
};

const placeBullSpread = (e: any) => {
    dispatch(
        executeACGAction({
            payload: {
                requestType: 'POST',
                urlPath: ACTION_CODES.SET_BULL_CALL,
                reqObj: e
            },
            storeKey: STORE_KEYS.SET_BULL_CALL,
            // uniqueScreenIdentifier: {
            //     apiKeyRecd: true
            // }
        })
    );
};
const placeBearSpread = (e: any) => {
    dispatch(
        executeACGAction({
            payload: {
                requestType: 'POST',
                urlPath: ACTION_CODES.SET_BEAR_PUT,
                reqObj: e
            },
            storeKey: STORE_KEYS.SET_BEAR_PUT,
            // uniqueScreenIdentifier: {
            //     apiKeyRecd: true
            // }
        })
    );
};
    
    return(
        <div className="dashboard">
             <Snackbar className="login-snackbar" options={snackbarOptions} handleClose={closeSnackbar} />
            <Container maxWidth="xl" style={{marginTop:'60px'}}>
            <Card style={{ padding: '15px', borderRadius: '10px 10px 0px 0px' }}>
             <h4>{props?.location?.state?.params?.name}</h4>
             {/* <br /> */}
             <div style={{ display: 'flex', gap: '1%',marginBottom:'0px',marginLeft:'1%' }}>
             {state?.primaryUserDetail?.message ? <Autocomplete data={chartSymbol[0]} change={(e: any) => { changeMainSymbol(e) }} option={''} style={{ width: '270px',paddingLeft:'0px',paddingRight:'0px',marginLeft:'0px',marginRight:'0px'}} value={selectedChartSymbol} />:null}
                        {/* <Autocomplete data={quickLots} change={()=>{}} value={0} Quantity={true}/> */}
                        <TextField label={"Quantity"} variant="outlined" onChange={(e) => changeQuickLots(e)} type="number" value={quickLots} style={{ width: '120px' }} /> 
                    </div>
                    <div style={{ display: 'flex', gap: '7%',marginLeft:'1%',position:'absolute',zIndex:'3',marginTop:'0.15%'}}>
                        <Button
                            // formInput="buttonDiv"
                            className="simpleBuyButton"
                            fullWidth
                            name="Buy"
                            type="submit"
                            variant="contained"
                            secondary={false}
                            handleClick={quickBuySubmit}
                            disabled={selectedChartSymbol !== '' &&  selectedChartSymbol != undefined && quickLots !== '' ? false : true}
                        />
                         <Button
                            // formInput="buttonDiv"
                            className="simpleSellButton"
                            fullWidth
                            name="Sell"
                            type="submit"
                            variant="contained"
                            secondary={false}
                            handleClick={quickSellSubmit}
                            disabled={selectedChartSymbol !== '' &&  selectedChartSymbol != undefined && quickLots !== '' ? false : true}
                        />
                    </div>
             {state?.primaryUserDetail?.message ? <Chart symbol={chartToken == undefined ? '26000' : chartToken} fsGetUserKeys={state?.primaryUserDetail?.message} /> : null}
            </Card>

            <Card style={{ borderRadius: '0px 0px 10px 10px', padding: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', marginBottom: '0px', marginLeft: '7px' }}>
                        <div style={{ flex: '80%' }}>
                            <div className="headinglabel">Place Orders</div>
                        </div>
                        <div style={{ flex: '20%' }}>
                            <Switches type="strategies" change={() => setIsStrategy(!isStrategy)} checked={isStrategy} />
                        </div>
                    </div>

                    {!isStrategy ? <div>
                        {multiLegged?.map((ele: any, index: any) => {
                            return (
                                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
                                    <div style={{ marginTop: '10px' }}>
                                        <Switches type="Futures" change={(e: any) => changeLegValues(e, index, 'derivative')} checked={ele?.derivative} />
                                    </div>
                                    <div style={{ marginTop: '10px' }}>
                                        {ele?.derivative ? <Switches type="options" change={(e: any) => changeLegValues(e, index, 'optionType')} checked={ele?.optionType} /> : null}
                                    </div>
                                    <div style={{ marginTop: '10px' }}>
                                        {!ele?.derivative ? <Switches type="LONG/SHORT" change={(e: any) => changeLegValues(e, index, 'BuyorSell')} checked={ele?.BuyorSell} /> : null}
                                    </div>
                                    <div style={{ marginTop: '10px' }}>
                                        {ele?.derivative ? <Switches type="BUY/SELL" change={(e: any) => changeLegValues(e, index, 'BuyorSell')} checked={ele?.BuyorSell} /> : null}
                                    </div>

                                    {ele?.instruments ? <Autocomplete data={instr[index]} change={(e: any) => changeLegValues(e, index, 'selectedInstr')} option={ele?.derivative} style={{ width: '270px' }} value={ele?.selectedInstrument} /> : <h6 style={{ marginTop: '17px' }}>No Instruments data, please login to your broker</h6>}
                                    {ele?.instruments ? <Autocomplete data={lots[index]} type="numbers" change={(e: any) => changeLegValues(e, index, 'selectedLots')} value={ele?.selectedLots} style={{ width: '103px' }}/> : null}
                                    {ele?.instruments ? <Autocomplete data={['Market', 'Limit']} orderType={true} change={(e: any) => changeLegValues(e, index, 'orderType')} type="numbers" style={{ width: '160px' }} value={ele?.orderType} /> : null}
                                    {ele?.orderType == 'Limit' ? <TextField label={"Price"} variant="outlined" onChange={(e: any) => changeLegValues(e, index, 'limitPrice')} type="number" value={ele?.limitPrice} style={{ width: '120px' }} /> : null}
                                   
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        {index == 0 ? null : <DeleteOutlineIcon onClick={() => deleteLeg(index)} className='remove_more_icon'></DeleteOutlineIcon>}
                                    </div>
                                    {index == 0 && singleOrder ?
                                        <div className="orderButtonDiv">
                                            <Button
                                                formInput="buttonDiv"
                                                className="simpleOrderButton"
                                                fullWidth
                                                name="Place Order"
                                                type="submit"
                                                variant="contained"
                                                secondary={false}
                                                handleClick={submitOrder}
                                               
                                            />
                                        </div> : null}

                                    {index == multiLegged?.length - 1 ? <AddCircleOutlineIcon onClick={addLeg} className="add_more_icon">add leg</AddCircleOutlineIcon> : null}
                                    {index == multiLegged?.length - 1 && !singleOrder ?
                                        <div className="orderButtonDiv">
                                            <Button
                                                formInput="buttonDiv"
                                                className="simpleOrderButton"
                                                fullWidth
                                                name="Place Order"
                                                variant="contained"
                                                secondary={false}
                                                handleClick={submitOrder}
                                            />
                                        </div> : null}
                                </div>
                            )
                        })}
                    </div> :
                        <div>
                            <Chip click={handleClickChip} active={selectedStrategy} />
                            {isStrategy ?
                                <div>
                                    {selectedStrategy == 0 ? <ShortStraddle click={(e: any) => placeStrategy(e, "shortStraddle")} /> : null}
                                    {selectedStrategy == 1 ? <ShortStrangle click={(e: any) => placeStrategy(e, "shortStrangle")} /> : null}
                                    {selectedStrategy == 2 ? <LongStraddle click={(e: any) => placeStrategy(e, "longStraddle")} /> : null}
                                    {selectedStrategy == 3 ? <LongStrangle click={(e: any) => placeStrategy(e, "longStrangle")} /> : null}
                                    {selectedStrategy == 4 ? <BullSpread click={(e: any) => placeStrategy(e, "bullSpread")} /> : null}
                                    {selectedStrategy == 5 ? <BearSpread click={(e: any) => placeStrategy(e, "bearSpread")} /> : null}
                                </div>
                                : null}
                        </div>

                    }
                </Card>

            </Container>
            {/* .filter((ele: any) => Math.abs(Number(ele?.RealizedPNL)) != 0) */}
            <Container maxWidth="xl" style={{ marginTop: '5px' }}>
                <AdminPositions data={state?.primarySetPositions?.message?.data?.filter((ele: any) => Math.abs(Number(ele?.netQuantity)) != 0) } type="positions" admin={true} setName={props?.location?.state?.params?.name}/>
            </Container>
        </div>
       
    )
}
export default AdminSetDetail