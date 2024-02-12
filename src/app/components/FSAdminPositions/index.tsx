import { useState } from 'react';
import { Container, Card } from '@mui/material';
import CustomTable from '../CustomTable';
import { applySortFilter } from '../../utils/helper';
import CustomTableToolbar from '../CustomTableToolbar';
import { executeACGAction } from '../../store/slice';
import { ACTION_CODES, STORE_KEYS } from '../../constants/apiConstants';
import { useDispatch, useSelector } from 'react-redux';

const TABLE_HEAD = [
    { id: 'tradingSymbol', label: 'Symbol', alignRight: false },
    // { id: 'buy_price', label: 'Buy Price', alignRight: false },
    { id: 'netQuantity', label: 'Buy Quantity', alignRight: false },
    { id: 'netUploadPrice', label: 'Entry Price', alignRight: false },
    { id: 'LTP', label: 'LTP', alignRight: false },
    { id: 'unrealizedMTOM', label: 'P&L', alignRight: false },
    { id : 'Action', label:'Close', alignRight:false}
];
const TABLE_HEAD_DAY = [
    { id: 'tradingSymbol', label: 'Symbol', alignRight: false },
    { id: 'netQuantity', label: 'Quantity', alignRight: false },
    { id: 'netUploadPrice', label: 'Entry Price', alignRight: false },
    { id: 'LTP', label: 'LTP', alignRight: false },
    // { id: 'sell_value', label: 'Sell Value', alignRight: false },
    { id: 'unrealizedMTOM', label: 'P&L', alignRight: false },
];

const ORDER_TABLE_HEAD = [
    { id: 'tradingSymbol', label: 'Trading Symbol', alignRight: false },
    { id: 'orderNumber', label: 'Order Number', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: 'transactionType', label: 'Transaction Type', alignRight: false },
    { id: 'exchange', label: 'Exchange', alignRight: false },
    { id: 'price', label: 'Price', alignRight: false },
    { id: 'priceType', label: 'Price Type', alignRight: false },
    { id: 'quantity', label: 'Quantity', alignRight: false },
    { id: 'orderTime', label: 'Order Time', alignRight: false },
]

type Props = {data?: any,type?:string ,selectable?:boolean,admin?:boolean,setName?: string};
const AdminPositions = (props:Props) =>{
    const {data,type,selectable,admin,setName} = props
    const [page, setPage] = useState<number>(0);
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState(type == "orders" ? 'order_id':'tradingsymbol');
    const [selected, setSelected] = useState<any>([]);
    const [filterName, setFilterName] = useState<string>('');
    const [tableData, setTableData] = useState<any[]>([]);
    const dispatch = useDispatch();
    const filteredList = applySortFilter(data, order, filterName, orderBy);

    const handleRequestSort = (event: any, property: any) => {
        setFilterName('');
        const isAsc = orderBy === event && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(event);
    };
    const handleChangePage = (event: any, newPage: React.SetStateAction<number>) => {
        setPage(newPage);
    };

    const handleSelectAllClick = (event: any) => {
        if (event.target.checked) {
            const newSelecteds = [];
            console.log("clicked")
            for (let i = 0; i < filteredList.length; i++) {
                if(filteredList[i].email){
                    newSelecteds.push(filteredList[i].email)   
                }
                else if(filteredList[i].time){
                    newSelecteds.push(filteredList[i].time)  
                }
                else if(filteredList[i].tradingSymbol){
                    newSelecteds.push(filteredList[i].tradingSymbol);
                }
               
            }
            console.log(newSelecteds)
            const toRemove = tableData.slice(page, tableData.length);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };
    const showRow = (event: any) => {
        console.log(event,"evt")
        // const derivative = event.tradingsymbol.includes('CE') || event.tradingsymbol.includes('PE') ? "options" : "futures"
        // const entry_type = derivative == 'options' ? event.tradingsymbol.includes('CE') ? "CE" : "PE" : null
        // let data = {
        //     deriviative:derivative,
        //     entry_type:entry_type,
        //     transaction_type:derivative == 'options'?  event?.quantity > 0  ? "SELL" : "BUY" : derivative == "futures" ? event?.quantity > 0  ? "Short" : "Long" : null,
        //     tradingsymbol:event?.tradingsymbol,
        //     quantity:event.quantity,
        //     order:"Market",
        //     limit: null
        // }
        // console.log(derivative)
        //     dispatch(
        //         executeACGAction({
        //             payload: {
        //                 requestType: 'POST',
        //                 urlPath: ACTION_CODES.SET_BASIC_TRADE,
        //                 reqObj:data
        //             },
        //             storeKey: STORE_KEYS.SET_BASIC_TRADE
        //         })
        //     );
        if(!admin){
            const newData = [event].map((ele:any) => {
                let quantMultiple = 50;
                if(ele?.tradingSymbol.includes('BANKNIFTY')){
                  quantMultiple = 15
                }
                if(ele?.tradingSymbol.includes('FINNIFTY')){
                  quantMultiple = 40
                }
                return{
              exchange: "NFO",
              tradingsymbol: ele?.tradingSymbol,
              quantity: String(Math.abs(Number(ele?.netQuantity)/quantMultiple)),
              price: "0",
              product: "M",
              transaction_type:Number(ele?.netQuantity) > 0  ? 'S' : 'B',
              priceType:  'MKT' ,
              retention: "IOC",
              triggerPrice: "0",
              remarks: "Test1"
                }
            })
            console.log(newData,"newData")
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
        if(admin){
            console.log(setName,"setnamse")
            const newData = [event].map((ele:any) => {
             return{
              exchange: "NFO",
              tradingsymbol: ele?.tradingSymbol,
              quantity: String(Math.abs(Number(ele?.netQuantity))),
              product: "M",
              transactionType:Number(ele?.netQuantity) > 0  ? 'S' : 'B',
              name: setName
            }
            })
            console.log(newData,"newData")
            dispatch(
                executeACGAction({
                    payload: {
                        requestType: 'POST',
                        urlPath: ACTION_CODES.EXIT_SET_ORDER,
                        reqObj: newData[0]
                    },
                    storeKey: STORE_KEYS.EXIT_SET_ORDER,
                    uniqueScreenIdentifier: {
                        tradeRecd: true
                    }
                })
            )
        }
      
     };
    const handleClick = (requestedBy: string) => {
        console.log(requestedBy,"req")
        const selectedIndex = selected.indexOf(requestedBy);
        let newSelected: any[] | ((prevState: unknown[]) => unknown[]) = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, requestedBy);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };
    return(
        // <Container maxWidth="xl">
            <div>
                {/* <SnackbarAlert options={snackbarOptions} handleClose={closeSnackbar} /> */}
                <Container
                    maxWidth="xl"
                    style={{
                        paddingLeft: '3px',
                        paddingRight: '3px'
                    }}
                >
                    <Card
                        style={{
                            borderRadius: '15px 15px 0px 0px',
                            // backgroundColor: '#2b2d42',
                            // backgroundColor: '#24263a73',
                            overflow: 'inherit',
                            // boxShadow:'rgba(78, 181, 141, 0.67) 1px -2px 1px -1px, rgba(78, 181, 141, 0.67) 1px 1px 1px 0px, rgba(78, 181, 141, 0.67) -1px -1px 3px 0px'
                            // boxShadow:'rgba(78, 181, 141, 0.67) 1px -2px 1px -1px, rgba(78, 181, 141, 0.67) 1px 0px 1px 0px, rgba(78, 181, 141, 0.67) -1px -2px 3px 0px'
                        }}
                    >
                        <CustomTableToolbar
                            drawerOpen={false}
                            numSelected={selected?.length}
                            filterName={filterName}
                            onFilterName={()=>{}}
                            resetInput={()=>{}}
                            displayInput={false}
                            text={{
                                title: `${type} List`,
                                subTitle: `${filteredList?.length} ${type}`
                            }}
                            filterButton={false}
                            customButton={false}
                        />
                    </Card>
                </Container>
                <CustomTable
                    selectable={selectable ? true :false}
                    headers={type== "positions" ? TABLE_HEAD : type=="Daypositions" ? TABLE_HEAD_DAY: ORDER_TABLE_HEAD}
                    body={filteredList}
                    tableType="positions"
                    isLoading={false}
                    filteredUsers={filteredList}
                    filterName={filterName}
                    selected={selected}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                    rowChange={(event: string) => handleClick(event)}
                    rowCount={filteredList?.length}
                    onPageChange={handleChangePage}
                    page={page}
                    setPageNumber={setPage}
                    selectRow={showRow}
                    route={() => {}}
                    isRequestPage={true}
                    link={true}
                    removeFn={() => {}}
                />
            </div>
        // </Container>
    )
}

export default AdminPositions
