import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { Container, Card } from '@mui/material';
import { ACTION_CODES, STORE_KEYS } from '../constants/apiConstants';
import { createStructuredSelector } from 'reselect';
import { SCREEN_TITLES } from '../constants/StringConstants';
import './index.scss';
// import users from '../_mocks_/clients';
import CustomTable from '../components/CustomTable/index';
import CustomTableToolbar from '../components/CustomTableToolbar';
import { applySortFilter } from '../utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import { executeACGAction } from '../store/slice';
import { acgSelector } from '../store/selector';
import {useHistory} from 'react-router-dom'

const TABLE_HEAD = [
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'email', label: 'e-mail', alignRight: false },
    { id: 'updated', label: 'Updated_At', alignRight: false },
    { id: 'Action', label: 'Action', alignLeft: true }
];
const options = {
    DEFAULT: {
        message: '',
        open: false,
        type: ''
    }
};
const ClientManagement = () => {
    // const dispatch = useDispatch();
    const history = useHistory();
    const [snackbarOptions, setSnackbarOptions] = useState(options.DEFAULT);
    // const state = useGetState();
    const [page, setPage] = useState<number>(0);
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('updated');
    const [selected, setSelected] = useState<any>([]);
    const [filterName, setFilterName] = useState<string>('');
    const [tableData, setTableData] = useState<any[]>([]);
    const dispatch = useDispatch();
    const acgStateSelector = createStructuredSelector({
        acgSlice: acgSelector()
    });
    const { acgSlice: state } = useSelector(acgStateSelector);

    useEffect(() => {
        if(state?.allusers?.message?.length>0){
            setTableData(state?.allusers?.message)
        }
        
    }, [state?.allusers?.message])

    const getClientSummary = () => {
        // dispatch(
        //     executeACGAction({
        //         payload: {
        //             requestType: 'GET',
        //             urlPath: ACTION_CODES.GET_CLIENT_SUMMARY
        //         },
        //         storeKey: STORE_KEYS.CLIENT_SUMMARY
        //     })
        // );
    };

    useEffect(() => {
        dispatch(
            executeACGAction({
                payload: {
                    requestType: 'GET',
                    urlPath: ACTION_CODES.ADMIN_DASH
                },
                storeKey: STORE_KEYS.ADMIN_ALL_USERS
            })
        );
    }, [])

    // useEffect(getClientSummary, []);


    const closeSnackbar = () => setSnackbarOptions(options.DEFAULT);

    const filteredList = applySortFilter(tableData, order, filterName, orderBy);

    const handleFilterByName = (event: { target: { value: string } }) => {
        setOrderBy('email');
        setPage(0);
        setFilterName(event.target.value);
    };

    const handleChangePage = (event: any, newPage: React.SetStateAction<number>) => {
        setPage(newPage);
    };

    const showRow = (event: any) => {
        console.log(event,"rows")
     };
    const handleRequestSort = (event: any, property: any) => {
        setFilterName('');
        const isAsc = orderBy === event && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(event);
    };

    const handleSelectAllClick = (event: any) => {
        if (event.target.checked) {
            const newSelecteds = [];
            for (let i = 0; i < tableData.length; i++) {
                newSelecteds.push(tableData[i].email);
            }
            const toRemove = tableData.slice(page, tableData.length);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };
    const resetInput = () => {
        setFilterName('');
        setPage(0);
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

    const getUserEmail = (ele:any) => {
        console.log(ele?.email)
        history.push({
            pathname:'/userDetail',
            state:{
                params:ele?.email
            }
        })
    }
    return (
        <div className="dashboard">
            {/* <SnackbarAlert options={snackbarOptions} handleClose={closeSnackbar} /> */}
            <Container maxWidth="xl" style={{ marginTop: '60px' }}>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', marginBottom: '15px', marginLeft: '7px' }}>
                    <div style={{ flex: '80%' }}>
                        <div className="headinglabel">{SCREEN_TITLES.CLIENT_MANAGEMENT}</div>
                        {/* <StatusCard
                            totalClients={[
                                {
                                    count: TotalClients,
                                    handleClick: _noop,
                                    image: TotalClientsIcon,
                                    text: 'Total Clients'
                                },
                            ]}
                        /> */}
                    </div>
                    <div
                        style={{
                            flex: '10%',
                            marginLeft: '20px',
                            marginTop: '60px',
                            display: 'flex',
                            justifyContent: 'flex-end'
                        }}
                        className="dashboardDropdownDiv"
                    >
                    </div>
                </div>
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
                                onFilterName={handleFilterByName}
                                resetInput={resetInput}
                                displayInput={true}
                                text={{
                                    title: 'Client List',
                                    subTitle: `${tableData?.length} clients`
                                }}
                                filterButton={false}
                                customButton={false}
                            />
                        </Card>
                    </Container>
                    <CustomTable
                        selectable={true}
                        headers={TABLE_HEAD}
                        body={filteredList}
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
                        route={(ele:string)=>getUserEmail(ele)}
                        isRequestPage={true}
                        link={true}
                        removeFn={() => { }}
                    />
                </div>
            </Container>
        </div>
    );
};

export default ClientManagement;
