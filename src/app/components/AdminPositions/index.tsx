import { useState } from 'react';
import { Container, Card } from '@mui/material';
import CustomTable from '../CustomTable';
import { applySortFilter } from '../../utils/helper';
import CustomTableToolbar from '../CustomTableToolbar';
import { executeACGAction } from '../../store/slice';
import { ACTION_CODES, STORE_KEYS } from '../../constants/apiConstants';
import { useDispatch, useSelector } from 'react-redux';

const TABLE_HEAD = [
    { id: 'tradingsymbol', label: 'Symbol', alignRight: false },
    { id: 'buy_price', label: 'Buy Price', alignRight: false },
    { id: 'buy_quantity', label: 'Buy Quantity', alignRight: false },
    { id: 'buy_value', label: 'Value', alignRight: false },
    { id: 'sell_price', label: 'Sell Price', alignRight: false },
    { id: 'sell_quantity', label: 'Sell Quantity', alignRight: false },
    { id: 'sell_value', label: 'Sell Value', alignRight: false },
    { id: 'pnl', label: 'P&L', alignRight: false },
    { id : 'Action', label:'Close', alignRight:false}
];
const TABLE_HEAD_DAY = [
    { id: 'tradingsymbol', label: 'Symbol', alignRight: false },
    { id: 'buy_price', label: 'Buy Price', alignRight: false },
    { id: 'buy_quantity', label: 'Buy Quantity', alignRight: false },
    { id: 'buy_value', label: 'Value', alignRight: false },
    { id: 'sell_price', label: 'Sell Price', alignRight: false },
    { id: 'sell_quantity', label: 'Sell Quantity', alignRight: false },
    { id: 'sell_value', label: 'Sell Value', alignRight: false },
    { id: 'pnl', label: 'P&L', alignRight: false },
];

const ORDER_TABLE_HEAD = [
    { id: 'placed_by', label: 'Placed By', alignRight: false },
    { id: 'status', label: 'status', alignRight: false },
    { id: 'time', label: 'Time', alignRight: false },
    { id: 'order_id', label: 'Order Id', alignRight: false },
    { id: 'tradingsymbol', label: 'Symbol', alignRight: false },
    { id: 'transaction_type', label: 'Type', alignRight: false },
]

type Props = {data?: any,type?:string ,selectable?:boolean};
const AdminPositions = (props:Props) =>{
    const {data,type,selectable} = props
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
                else if(filteredList[i].tradingsymbol){
                    newSelecteds.push(filteredList[i].tradingsymbol);
                }
               
            }
            const toRemove = tableData.slice(page, tableData.length);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };
    const showRow = (event: any) => {
        console.log(event,"evt")
        const derivative = event.tradingsymbol.includes('CE') || event.tradingsymbol.includes('PE') ? "options" : "futures"
        const entry_type = derivative == 'options' ? event.tradingsymbol.includes('CE') ? "CE" : "PE" : null
        let data = {
            deriviative:derivative,
            entry_type:entry_type,
            transaction_type:derivative == 'options'?  event?.quantity > 0  ? "SELL" : "BUY" : derivative == "futures" ? event?.quantity > 0  ? "Short" : "Long" : null,
            tradingsymbol:event?.tradingsymbol,
            quantity:event.quantity,
            order:"Market",
            limit: null
        }
        console.log(derivative)
            dispatch(
                executeACGAction({
                    payload: {
                        requestType: 'POST',
                        urlPath: ACTION_CODES.SET_BASIC_TRADE,
                        reqObj:data
                    },
                    storeKey: STORE_KEYS.SET_BASIC_TRADE
                })
            );
            // window.location.reload();
     };
    const handleClick = (requestedBy: string) => {
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
