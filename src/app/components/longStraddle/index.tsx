import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import Dropdown from '../../components/Dropdown'
import Autocomplete from '../Autocomplete';
import FSInstrument from "../../../utils/FSInstruments/fsInstruments.json";
import { useEffect, useState } from 'react';
import { executeACGAction } from '../../store/slice';
import { ACTION_CODES, STORE_KEYS } from '../../constants/apiConstants';
import Button from '../Button';

type Props = {
    click?: any
}

const longStraddle = (props: Props) => {
    const { click } = props
    const [symbol, setSymbol] = useState<any>([])
    const [selectedSymbol, setSelectedSymbol] = useState('')
    const [strikePrice, setStrikePrice] = useState<any>([])
    const [selectedStrike, setSelectedStrike] = useState('')
    const [lots, setLots] = useState<any>([]);
    const [selectedLots, setSelectedLots] = useState('')
    const [expiry, setExpiry] = useState<any>([])
    const [selectedExpiry, setSelectedExpiry] = useState('')

    useEffect(() => {
        const unique = [...new Set(FSInstrument.map(item => item.Symbol))]
        setSymbol(unique)
    }, [])

    const setInstruments = (e: any) => {
        setSelectedSymbol(e.target.innerText)
    }

    const setStrike = (e: any) => {
        setSelectedStrike(e.target.innerText)
    }
    const setUserLots = (e: any) => {
        setSelectedLots(e.target.innerText)
    }
    const setUserSelectedExpiry = (e: any) => {
        setSelectedExpiry(e.target.innerText)
    }
    useEffect(() => {
        let price;
        let lots = [];
        if (selectedSymbol == 'NIFTY') {
            price = [...new Set(FSInstrument.filter((ele: any) => ele.Symbol == 'NIFTY').map(item => item.StrikePrice))]
            setStrikePrice([...new Set(FSInstrument.filter((ele: any) => ele.Symbol == 'NIFTY').map(item => item.StrikePrice.toString()))])
            setExpiry([...new Set(FSInstrument.filter((ele: any) => ele.Symbol == 'NIFTY').map(item => item.Expiry))])
            for (let i = 1; i <= 36; i++) {
                lots.push(i.toString())
            }
        }
        if (selectedSymbol == 'BANKNIFTY') {
            price = [...new Set(FSInstrument.filter((ele: any) => ele.Symbol == 'BANKNIFTY').map(item => item.StrikePrice))]
            setStrikePrice([...new Set(FSInstrument.filter((ele: any) => ele.Symbol == 'BANKNIFTY').map(item => item.StrikePrice.toString()))])
            setExpiry([...new Set(FSInstrument.filter((ele: any) => ele.Symbol == 'BANKNIFTY').map(item => item.Expiry))])
            for (let i = 1; i <= 36; i++) {
                lots.push(i.toString())
            }
        }
        if (selectedSymbol == 'FINNIFTY') {
            price = [...new Set(FSInstrument.filter((ele: any) => ele.Symbol == 'FINNIFTY').map(item => item.StrikePrice))]
            setStrikePrice([...new Set(FSInstrument.filter((ele: any) => ele.Symbol == 'FINNIFTY').map(item => item.StrikePrice.toString()))])
            setExpiry([...new Set(FSInstrument.filter((ele: any) => ele.Symbol == 'FINNIFTY').map(item => item.Expiry))])
            for (let i = 1; i <= 45; i++) {
                lots.push(i.toString())
            }
        }
        setLots(lots)
        setSelectedStrike('')
    }, [selectedSymbol])

    useEffect(() => {
        console.log(FSInstrument)
    }, [selectedStrike])

    const clickHandler = () => {
        const reqbody = {
            symbol: selectedSymbol,
            strikePrice: selectedStrike,
            expiry: selectedExpiry,
            quantity: selectedSymbol == 'NIFTY' ? String(Number(selectedLots) * 50) : selectedSymbol == 'BANKNIFTY' ? String(Number(selectedLots) * 15) : String(Number(selectedLots) * 45),
        }
        if (selectedSymbol !== '' && selectedStrike !== '' && selectedExpiry !== '' && selectedLots !== '') {
            click(reqbody)
            setTimeout(() => {
                setSelectedSymbol('')
                setSelectedStrike('')
                setSelectedLots('')
                setSelectedExpiry('')
            },1000)
            
        } else {
            console.log('fieldsMissing')
        }
    }
    return (
        <>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', marginTop: '40px' }}>
                <Autocomplete data={symbol} change={(e: any) => setInstruments(e)} value={selectedSymbol} style={{ width: '180px' }} />
                <Autocomplete data={strikePrice} change={(e: any) => setStrike(e)} value={selectedStrike} style={{ width: '180px' }} price={true} />
                <Autocomplete data={lots} change={(e: any) => setUserLots(e)} value={selectedLots} style={{ width: '180px' }} type="number" />
                <Autocomplete data={expiry} change={(e: any) => setUserSelectedExpiry(e)} value={selectedExpiry} style={{ width: '180px' }} expiry={true} />
            </div>
            <div style={{ width: '200px', margin: '0 auto', paddingBottom: '10px' }}>
                <Button
                    className="simpleOrderButton"
                    fullWidth
                    name="Place Order"
                    variant="contained"
                    secondary={false}
                    handleClick={clickHandler}
                    style={{ marginTop: '5px' }}
                />
            </div>
        </>
    )
}
export default longStraddle

