import { useState, useEffect } from 'react';
import { Container, Card } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { executeACGAction } from '../../store/slice';
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
import FSInstrument from "../../../utils/FSInstruments/fsInstruments.json";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TradingViewWidget from '../../components/BTCChart'

const PlaceOrder = () => {
    const [derivative, setDerivative] = useState(false);
    const [optionType, setOptionType] = useState(false)
    const [instruments, setInstruments] = useState([]);
    const [selectedInstrument, setSelectedInstrument] = useState('');
    const [selectedLots, setSelectedLots] = useState('')
    const [orderType, setOrderType] = useState('')
    const [BuyorSell, setBuyOrSell] = useState(false)
    const [limitPrice, setLimitPrice] = useState('');
    const [lotSize, setLotSize] = useState<any>([])


    const [multiLegged, setMultiLegged] = useState<any>([{ derivative: false, optionType: false, instruments: FSInstrument.filter((ele: any) => ele?.OptionType == "XX").map((ele: any) => ele?.TradingSymbol), selectedInstrument: "", selectedLots: [], orderType: '', BuyorSell: false, limitPrice: '', lotSize: [] }])
    const dispatch = useDispatch();
    const acgStateSelector = createStructuredSelector({
        acgSlice: acgSelector()
    });
    const { acgSlice: state } = useSelector(acgStateSelector);
    const setDerivativeValue = (e: any) => {
        // console.log(e.target.checked,"setDerivativeValue")
        setDerivative(e.target.checked)
        setOptionType(false)
    }
    const setOptionValue = (e: any) => {
        // console.log(e.target.checked,"setOptionValue")
        setOptionType(e.target.checked)
    }
    const setBuyOrSellValue = (e: any) => {
        // console.log(e.target.checked,"setBuyOrSellValue")
        setBuyOrSell(e.target.checked)
    }

    // useEffect(() => {
    //     if(derivative==false){
    //         const data:any = FSInstrument.filter((ele:any)=> ele?.OptionType=="XX").map((ele:any)=>ele?.TradingSymbol)
    //         console.log(data,"future")
    //         setInstruments(data)
    //     }else{
    //         setInstruments([])
    //     }
    // }, [FSInstrument])

    useEffect(() => {
        if (derivative == true) {
            const data: any = FSInstrument.filter((ele: any) => ele?.OptionType == "CE").map((ele: any) => ele?.TradingSymbol)
            console.log(data, "derivative-t")
            setInstruments(data)
        } else if (derivative == false) {
            const data: any = FSInstrument.filter((ele: any) => ele?.OptionType == "XX").map((ele: any) => ele?.TradingSymbol)
            console.log(data, "derivative-f")
            setInstruments(data)
        }
    }, [derivative])

    useEffect(() => {
        if (optionType == true) {
            const data: any = FSInstrument.filter((ele: any) => ele?.OptionType == "PE").map((ele: any) => ele?.TradingSymbol)
            // console.log(data,"optionType-t")
            setInstruments(data)
        } else if (optionType == false && derivative) {
            const data: any = FSInstrument.filter((ele: any) => ele?.OptionType == "CE").map((ele: any) => ele?.TradingSymbol)
            // console.log(data,"optionType-f")
            setInstruments(data)
        }
    }, [optionType])


    useEffect(() => {
        console.log(selectedInstrument, "seeld")
        if (selectedInstrument == '') {
            setLotSize([])
        }
        else if (selectedInstrument !== '' && selectedInstrument.includes('BANKNIFTY')) {
            const arr = []
            for (let i = 1; i <= 60; i++) {
                arr.push(i.toString())
            }
            setLotSize(arr)
        }
        else if (selectedInstrument !== '' && selectedInstrument.includes('FINNIFTY')) {
            const arr = []
            for (let i = 1; i <= 45; i++) {
                arr.push(i.toString())
            }
            setLotSize(arr)
        }
        else {
            const arr = []
            for (let i = 1; i <= 36; i++) {
                arr.push(i.toString())
            }
            setLotSize(arr)
        }
    }, [selectedInstrument])

    const getSelectedInstr = (e: any) => {
        console.log(e.target.innerText, "eded")
        if (e.target.innerText) {
            setSelectedInstrument(e.target.innerText)
        }
        else {
            setSelectedInstrument('')
        }

    }
    const getSelectedLot = (e: any) => {
        console.log(e.target.innerText, "lot")
        setSelectedLots(e.target.innerText)
    }
    const getOrderType = (e: any) => {
        console.log(e.target.innerText, "order")
        setOrderType(e.target.innerText);
    }
    const setLimitPriceValue = (e: any) => {
        setLimitPrice(e.target.value)
    }

    const submitOrder = () => {
        // let data = {
        //     deriviative: derivative ? "options" : "futures",
        //     entry_type: derivative && optionType ? "PE" : "CE",
        //     transaction_type: !derivative && BuyorSell ? 'S' : !derivative && !BuyorSell ? 'B' : derivative && !BuyorSell ? 'B' : 'S',
        //     tradingsymbol: selectedInstrument,
        //     quantity: selectedLots,
        //     order: orderType,
        //     limit: limitPrice !== '' ? limitPrice : null
        // }
           const newData = [...multiLegged].map((ele:any) => {
                let quantMultiple = 50;
                if(ele?.selectedInstrument.includes('BANKNIFTY')){
                  quantMultiple = 15
                }
                if(ele?.selectedInstrument.includes('FINNIFTY')){
                  quantMultiple = 40
                }
                return{
              exchange: "NFO",
              tradingsymbol: ele?.selectedInstrument,
              quantity: ele?.selectedLots,
              price: "0",
              product: "M",
              transaction_type:!ele?.derivative && ele?.BuyorSell ? 'S' : !ele?.derivative && !ele?.BuyorSell ? 'B' : ele?.derivative && !ele?.BuyorSell ? 'B' : 'S',
              priceType: ele?.orderType == 'Market' ? 'MKT' :"LMT",
              retention: "IOC",
              triggerPrice: "0",
              remarks: "Test1"
                }
            })

        // console.log(data, "data");
        console.log(multiLegged,"legs")
        if ( singleOrder) {
            dispatch(
                executeACGAction({
                    payload: {
                        requestType: 'POST',
                        urlPath: ACTION_CODES.FS_PLACE_SINGLE_ORDER,
                        reqObj: newData[0]
                    },
                    storeKey: STORE_KEYS.FS_PLACE_SINGLE_ORDER,
                    uniqueScreenIdentifier: {
                        tradeRecd: true
                    }
                })
            )
        } 
        else if(!singleOrder){

            const newData = [...multiLegged].map((ele:any) => {
                let quantMultiple = 50;
                if(ele?.selectedInstrument.includes('BANKNIFTY')){
                  quantMultiple = 15
                }
                if(ele?.selectedInstrument.includes('FINNIFTY')){
                  quantMultiple = 40
                }
                return{
              exchange: "NFO",
              tradingSymbol: ele?.selectedInstrument,
              quantity: String(Number(ele?.selectedLots)*quantMultiple),
              price: "0",
              product: "M",
              transactionType:!ele?.derivative && ele?.BuyorSell ? 'S' : !ele?.derivative && !ele?.BuyorSell ? 'B' : ele?.derivative && !ele?.BuyorSell ? 'B' : 'S',
              priceType: ele?.orderType == 'Market' ? 'MKT' :"LMT",
              retention: "IOC",
              triggerPrice: "0",
              remarks: "Test1"
                }
            })
            dispatch(
                executeACGAction({
                    payload: {
                        requestType: 'POST',
                        urlPath: ACTION_CODES.FS_PLACE_MULTIPLE_ORDER,
                        reqObj: newData
                    },
                    storeKey: STORE_KEYS.FS_PLACE_MULTIPLE_ORDER,
                    uniqueScreenIdentifier: {
                        tradeRecd: true
                    }
                })
            )
        }
        else {
            console.log('err')
        }
        setSelectedInstrument('')
        setSelectedLots('')
        setOrderType('')
        setLimitPrice('')
        getPositions()
        setMultiLegged([{ derivative: false, optionType: false, instruments: FSInstrument.filter((ele: any) => ele?.OptionType == "XX").map((ele: any) => ele?.TradingSymbol), selectedInstrument: "", selectedLots: 0, orderType: '', BuyorSell: false, limitPrice: '', lotSize: [] }])
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

    useEffect(() => {
        getPositions()
    }, [])

    const [instr, setInstr] = useState<any>([FSInstrument.filter((ele: any) => ele?.OptionType == "XX").map((ele: any) => ele?.TradingSymbol)])
    const [lots, setLots] = useState<any>([[]]);
    const [singleOrder, setSingleOrder] = useState(true)

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

    const changeLegValues = (e: any, index: any, text: string) => {
        console.log(e.target.checked, index, text, "inner")
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
                }
            }
            else {
                return ele
            }
        })
        setMultiLegged(newData)
        // console.log(newData, "newData")
    }


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

    const deleteLeg = (index:any) => {
        alert(index)
        const newData = [...multiLegged]
        const removed = newData.filter((ele:any,innerIndex:any) => index !== innerIndex)
        const newSymb = [...instr];
        const removedInstr = newSymb.filter((ele:any,innerIndex:any) => index !== innerIndex)
        const newLot = [...lots]
        const removedLot = newLot.filter((ele:any,innerIndex:any) => index !== innerIndex)
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

    return (
        <div style={{ marginLeft: '0px', marginTop: '5px' }}>
            <Container maxWidth="xl" style={{ marginTop: '0px' }}>
                <Card style={{ padding: '15px', borderRadius: '10px 10px 0px 0px' }}>
                    <iframe style={{ width: '93vw', height: '65vh' }} frameBorder="0" src="https://ssltvc.investing.com/?pair_ID=8985&height=550&width=1400&interval=60&plotStyle=candle&domain_ID=56&lang_ID=56&timezone_ID=20" allowFullScreen></iframe>
                </Card>
                <Card style={{ borderRadius: '0px 0px 10px 10px', padding: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', marginBottom: '0px', marginLeft: '7px' }}>
                        <div style={{ flex: '80%' }}>
                            <div className="headinglabel">Place Orders</div>
                        </div>
                    </div>

                    {/* {singleOrder ?
                        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                            <div style={{ marginTop: '10px' }}>
                                <Switches type="Futures" change={setDerivativeValue} checked={derivative} />
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                {derivative ? <Switches type="options" change={setOptionValue} checked={optionType} /> : null}
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                {!derivative ? <Switches type="LONG/SHORT" change={setBuyOrSellValue} checked={BuyorSell} /> : null}
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                {derivative ? <Switches type="BUY/SELL" change={setBuyOrSellValue} checked={BuyorSell} /> : null}
                            </div>
                            {instruments ? <Autocomplete data={instruments} change={getSelectedInstr} option={derivative} style={{ width: '270px' }} value={selectedInstrument} /> : <h6 style={{ marginTop: '17px' }}>No Instruments data, please login to your broker</h6>}
                            {instruments ? <Autocomplete data={lotSize} type="numbers" change={getSelectedLot} value={selectedLots} /> : null}
                            {instruments ? <Autocomplete data={['Market', 'Limit']} orderType={true} change={getOrderType} type="numbers" style={{ width: '180px' }} value={orderType} /> : null}
                            {orderType == 'Limit' ? <TextField label={"Price"} variant="outlined" onChange={(e) => setLimitPriceValue(e)} type="number" value={limitPrice} style={{ width: '120px' }} /> : null}
                            <div className="orderButtonDiv">
                                <Button
                                    formInput="buttonDiv"
                                    className="simpleLoginButton"
                                    fullWidth
                                    name="Place Order"
                                    //  instruments?.length > 0 && 
                                    disabled={selectedInstrument !== '' && selectedLots != '' && orderType !== '' ? false : true}
                                    type="submit"
                                    variant="contained"
                                    secondary={false}
                                    handleClick={submitOrder}
                                />
                            </div>
                        </div>
                        : null
                    } */}


                    { multiLegged?.map((ele: any, index: any) => {
                        return (
                            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap',marginTop:'10px' }}>
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
                                {ele?.instruments ? <Autocomplete data={lots[index]} type="numbers" change={(e: any) => changeLegValues(e, index, 'selectedLots')} value={ele?.selectedLots} /> : null}
                                {ele?.instruments ? <Autocomplete data={['Market', 'Limit']} orderType={true} change={(e: any) => changeLegValues(e, index, 'orderType')} type="numbers" style={{ width: '180px' }} value={ele?.orderType} /> : null}
                                {ele?.orderType == 'Limit' ? <TextField label={"Price"} variant="outlined" onChange={(e) => setLimitPriceValue(e)} type="number" value={ele?.limitPrice} style={{ width: '120px' }} /> : null}
                                <div style={{display:'flex',flexDirection:'column'}}>
                               
                                {index == 0 ? null : <DeleteOutlineIcon onClick={()=>deleteLeg(index)}className='remove_more_icon'></DeleteOutlineIcon>}
                                </div>
                               {index == 0 && singleOrder?  
                                <div className="orderButtonDiv">
                                   <Button
                                formInput="buttonDiv"
                                className="simpleLoginButton"
                                fullWidth
                                name="Place Order"
                                //  instruments?.length > 0 && 
                                // disabled={selectedInstrument !== '' && selectedLots != '' && orderType !== '' ? false : true}
                                type="submit"
                                variant="contained"
                                secondary={false}
                                handleClick={submitOrder}
                            />
                             </div>:null}
                              
                             {index == multiLegged?.length -1 ? <AddCircleOutlineIcon onClick={addLeg} className="add_more_icon">add leg</AddCircleOutlineIcon> : null }
                             {index == multiLegged?.length - 1 && !singleOrder?  
                                <div className="orderButtonDiv">
                                   <Button
                                formInput="buttonDiv"
                                className="simpleLoginButton"
                                fullWidth
                                name="Place Order"
                                //  instruments?.length > 0 && 
                                // disabled={selectedInstrument !== '' && selectedLots != '' && orderType !== '' ? false : true}
                                type="submit"
                                variant="contained"
                                secondary={false}
                                handleClick={submitOrder}
                            />
                             </div>:null}
                            </div>
                        )
                    })}
                </Card>
            </Container>
            <Container maxWidth="xl" style={{ marginTop: '5px' }}>
                {/* <center><h3>Open Positions</h3></center> */}
                <AdminPositions data={state?.getUserPositions?.message?.net?.filter((ele: any) => ele?.quantity != 0)} type="positions" />
            </Container>
            {/* <Container maxWidth="xl" style={{marginTop:'10px'}}>
            <Card style={{ padding: '15px', borderRadius: '10px' }}>
            <div style={{height:'100vh'}}>
            <TradingViewWidget />
            </div>
            </Card>
            </Container> */}
        </div>
    )
}

export default PlaceOrder;