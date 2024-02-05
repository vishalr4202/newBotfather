import { useState } from 'react';
import {
    Card,
    Table,
    TableRow,
    TableBody,
    TableCell,
    Container,
    TableContainer,
    TablePagination,
    Grid,
    Typography
} from '@mui/material';
import { useEffect } from 'react';
import Scrollbar from '../Scrollbar';
// import SearchNotFound from '../SearchNotFound';
import TableColumns from './TableColumns/index';
import { makeStyles } from '@material-ui/core/styles';
import TablePaginator from './TablePagination/index';
import TableRows from './TableRows/index';
import theme from '../../../utilities/theme/theme.module.scss';
import './index.scss';
// import MachineListCard from '../MachineListCard';
// import ModalTableCard from '../ModelTableCard';
// import { ModalCardType } from '../ModelTableCard';

// import MachineMonitoringCard from '../MachineMonitoringCard';
// import NoData from '../../../assets/nodata.svg';
const useStyles = makeStyles({
    root: {
        paddingLeft: '3px !important',
        paddingRight: '3px !important',
        '& .simplebar-placeholder': {
            minHeight: '400px !imortant',
            height: 'auto !important'
        },
        // '& .simplebar-content .MuiTableContainer-root': {
        //     overflowX: 'clip',
        //     minWidth: 'max-content'
        // },
        '& .MuiPaper-root': {
            // marginTop: '20px',
            borderRadius: '0px 0px 15px 15px'
        },
        '& .MuiTableCell-head .MuiButtonBase-root': {
            // fontSize: '14px',
            fontWeight: 500
        },
        '& *,.MuiTableCell-root, .MuiTypography-root,.MuiButtonBase-root': {
            // fontFamily: 'poppins'
            // fontSize: '13px'
        },

        '&  .MuiTableRow-root.Mui-selected': {
            // backgroundColor: 'rgba(25, 118, 210, 0.20) !important'
        },
        '& .MuiTableRow-root:nth-child(odd)': {
            // backgroundColor: `${theme.s050Bg}`,
        },
        '& .MuiTableRow-head': {
            // backgroundColor: "white !important",
        },
        '& .MuiTablePagination-root .MuiToolbar-root ': {
            // backgroundColor: "#E0E9EF",
            // backgroundColor: '#2b2d42'
            backgroundColor: 'transparent'

        },
        '& .MuiToolbar-root': {
            backgroundColor: `${theme.s050Bg}`
        },
        '& .MuiTablePagination-spacer': {
            display: 'none'
        },
        '& .MuiTablePagination-displayedRows': {
            marginTop: '1rem',
            fontFamily: 'PoppinsSemiBold',
            fontSize: '12px'
        }
    }
});

interface Props {
    selectable: boolean;
    headers: any;
    body: any;
    filteredUsers: any;
    secondaryData?: any;
    filterName: string;
    orderBy: any;
    order: any;
    onRequestSort: any;
    onSelectAllClick: any;
    rowCount: number;
    page: number;
    setPageNumber: Function;
    selected: any;
    machineSelected?: any;
    onPageChange: any;
    rowChange: Function;
    machineRowChange?: any;
    selectRow: any;
    route?: any;
    drawerTable?: boolean;
    editMenu?: boolean;
    link?: boolean;
    icon?: boolean;
    isRequestPage?: boolean;
    isTableImageReqd?: boolean;
    removeFn?: any;
    userUnlockFn?: any;
    isLoading?: boolean;
    noDataText?: string;
    type?: string;
    tableDataObj?: any;
    idKey?: string;
    favClick?: Function;
    isRadio?: boolean;
    isPermission?: any;
    checkDrodownSelection?: any;
    isPagination?: boolean;
    isSelectAll?: boolean;
    clip?: boolean;
    noAction?: Boolean;
    overflow?: boolean;
    alarmFlag?: boolean;
    userFlag?: boolean;
    onlyDeleteModeInner?: boolean;
    tableType?: string
}

export default function User(props: Props) {
    const {
        selectable,
        headers,
        body,
        filteredUsers,
        filterName,
        orderBy,
        order,
        onRequestSort,
        onSelectAllClick,
        rowCount,
        page,
        setPageNumber,
        selected,
        onPageChange,
        rowChange,
        selectRow,
        route,
        drawerTable,
        editMenu,
        link,
        icon,
        isRequestPage,
        isTableImageReqd = true,
        removeFn = () => { },
        userUnlockFn = () => { },
        isLoading = false,
        noDataText = 'No data to show',
        type,
        secondaryData,
        machineRowChange,
        machineSelected,
        tableDataObj,
        idKey = 'id',
        favClick = () => { },
        isRadio,
        isPermission,
        checkDrodownSelection,
        isPagination = true,
        isSelectAll,
        clip,
        noAction,
        overflow = true,
        alarmFlag,
        userFlag,
        onlyDeleteModeInner,
        tableType
    } = props;
    const classes = useStyles();
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [tableData, setTableData] = useState([]);
    const [machineRowsPerPage, setMachineRowsPerPage] = useState(16);

    useEffect(() => {
        setTableData(body);
    }, []);
    const emptyRowDisplay = [];
    if (
        filteredUsers &&
        filteredUsers.length > 0 &&
        filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length < 10
    ) {
        for (let i = 0; i < 10 - filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length; i++) {
            emptyRowDisplay.push(i);
        }
    }

    // const showRow = (id:any) => {
    //     // alert(id)
    //     console.log(id);
    // };
    // console.log(selected, 'sdsd');
    const scrollCSS = {
        '&::-webkit-scrollbar': {
            width: '0.2em',
            height: '0.2em'
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: '#2b2d42',
            boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'darkgrey',
            outline: '1px solid slategrey'
        }
    };
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;
    const isUserNotFound = filteredUsers?.length === 0;
    return (
        <Container
            maxWidth="xl"
            className={
                !drawerTable && !clip
                    ? classes.root + ' TableBase'
                    : !drawerTable && clip
                        ? classes.root + ' TableBase clipped'
                        : classes.root + ' DrawerTableBase'
            }
        >
            <Card
                style={{
                    borderRadius: '0px 0px 10px 10px',
                    // backgroundColor: '#2e304a'
                    // backgroundColor: '#24263a73',
                    // boxShadow:'rgba(78, 181, 141, 0.67) 1px 2px 1px -1px, rgba(78, 181, 141, 0.67) 1px 1px 1px 0px, rgba(78, 181, 141, 0.67) -1px 0px 3px 0px'

                }}
            >
                <Scrollbar>
                    <TableContainer
                        sx={
                            !drawerTable
                                ? {
                                    minWidth: 800,
                                    // maxHeight: 400,
                                    ...scrollCSS
                                }
                                : {
                                    minWidth: 300,
                                    // maxHeight: 300,
                                    ...scrollCSS
                                }
                        }
                        // style={{ backgroundColor: '#2e304a' }}
                        style={{ backgroundColor: 'transparent' }}

                    >
                        <Table className="actualTable">
                            <TableColumns
                                order={order}
                                orderBy={orderBy}
                                headLabel={headers}
                                rowCount={rowCount}
                                numSelected={selected.length}
                                onRequestSort={onRequestSort}
                                onSelectAllClick={onSelectAllClick}
                                selectable={selectable}
                                isSelectAll={isSelectAll}
                            />
                            {filteredUsers && type == 'double' && filteredUsers.length > 0 && filteredUsers ? (
                                <TableBody>
                                    <TableRow style={{ backgroundColor: '#383B5E' }}>
                                        <TableCell colSpan={12} style={{ borderBottom: '0px', color: '#C0C2D8' }}>
                                            Machine Parameters
                                        </TableCell>
                                    </TableRow>

                                    {secondaryData
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row: any) => {
                                            const { id, name, role, status, company, avatarUrl, isVerified } = row;
                                            const isItemSelected = machineSelected.indexOf(id) !== -1;
                                            //    console.log(row)
                                            return (
                                                <TableRows
                                                    key={id}
                                                    isItemSelected={isItemSelected}
                                                    click={(e: any) => {
                                                        e.nativeEvent.stopImmediatePropagation();
                                                        selectRow(row);
                                                    }}
                                                    header={headers}
                                                    row={row}
                                                    selectable={selectable}
                                                    change={() => machineRowChange(id)}
                                                    // route={route}
                                                    // editMenu={editMenu}
                                                    link={link}
                                                    icon={icon}
                                                    // removeFn={() => removeFn(row)}
                                                    // isRequestPage={isRequestPage}
                                                    // isTableImageReqd={isTableImageReqd}
                                                    noAction={noAction}
                                                />
                                            );
                                        })}
                                    <TableRow style={{ backgroundColor: '#383B5E' }}>
                                        <TableCell colSpan={12} style={{ borderBottom: '0px', color: '#C0C2D8' }}>
                                            Model Parameters
                                        </TableCell>
                                    </TableRow>

                                    {filteredUsers
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row: any) => {
                                            const { id, name, role, status, company, avatarUrl, isVerified,email } = row;
                                            const isItemSelected = selected.indexOf(email) !== -1;
                                            //    console.log(row)
                                            return (
                                                <TableRows
                                                    key={email}
                                                    isItemSelected={isItemSelected}
                                                    click={() => selectRow(row)}
                                                    header={headers}
                                                    row={row}
                                                    selectable={selectable}
                                                    change={() => rowChange(email)}
                                                    route={route}
                                                    editMenu={editMenu}
                                                    link={link}
                                                    icon={icon}
                                                    removeFn={() => removeFn(row)}
                                                    isRequestPage={isRequestPage}
                                                    isTableImageReqd={isTableImageReqd}
                                                    noAction={noAction}
                                                    alarmFlag={alarmFlag}
                                                />
                                            );
                                        })}
                                </TableBody>
                            ) : type == 'multiple' ? (
                                <TableBody>
                                    {/* <TableRow style={{ backgroundColor: '#383B5E' }}>
                                        <TableCell colSpan={12} style={{ borderBottom: '0px', color: '#C0C2D8' }}>
                                            Machine Parameters
                                        </TableCell>
                                    </TableRow> */}

                                    {Object.keys(tableDataObj)?.map((arrData: any) => {
                                        return (
                                            <>
                                                <TableRow style={{ backgroundColor: '#383B5E' }}>
                                                    <TableCell
                                                        colSpan={12}
                                                        style={{ borderBottom: '0px', color: '#C0C2D8' }}
                                                    >
                                                        {arrData}
                                                    </TableCell>
                                                </TableRow>
                                                {tableDataObj?.[arrData]?.map((row: any, idx: any) => {
                                                    const indx = idx + 1;
                                                    const { id } = row;
                                                    const isItemSelected = selected.indexOf(id) !== -1;

                                                    return (
                                                        <TableRows
                                                            key={indx}
                                                            isItemSelected={isItemSelected}
                                                            header={headers}
                                                            row={row}
                                                            click={() => selectRow(row)}
                                                            selectable={selectable}
                                                            isRadio={isRadio}
                                                            isPermission={isPermission}
                                                            change={() => rowChange(id)}
                                                            route={route}
                                                            editMenu={editMenu}
                                                            link={link}
                                                            icon={icon}
                                                            removeFn={() => removeFn(row)}
                                                            isRequestPage={isRequestPage}
                                                            isTableImageReqd={isTableImageReqd}
                                                            checkDrodownSelection={checkDrodownSelection}
                                                            noAction={noAction}
                                                        />
                                                    );
                                                })}
                                            </>
                                        );
                                    })}
                                </TableBody>
                            ) : null}
                            <TableBody>
                                {/* {filteredUsers && type == 'double' &&
                                    filteredUsers.length > 0 ?
                                    // filteredUsers[0].modelParameters ?
                                    <TableRow style={{ backgroundColor: '#383B5E' }}>
                                        <TableCell colSpan={12} style={{ borderBottom: '0px', color: '#C0C2D8' }}>
                                            Model Parameters
                                        </TableCell>
                                    </TableRow> : null} */}
                                {filteredUsers &&
                                    !type &&
                                    filteredUsers.length > 0 &&
                                    filteredUsers
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row: any) => {
                                            const id = row[idKey];
                                            const {email,time,tradingsymbol, quantity,tradingSymbol} = row;
                                            const isItemSelected = selected.indexOf(email || time || tradingsymbol || tradingSymbol) !== -1;
                                            return (
                                                <TableRows
                                                    key={email || time || tradingsymbol || tradingSymbol}
                                                    isItemSelected={isItemSelected}
                                                    click={() => selectRow(row)}
                                                    header={headers}
                                                    row={row}
                                                    selectable={selectable}
                                                    change={() => rowChange(email || time || tradingsymbol || tradingSymbol)}
                                                    route={route}
                                                    editMenu={editMenu}
                                                    link={link}
                                                    icon={icon}
                                                    removeFn={() => removeFn(row)}
                                                    userUnlockFn={() => userUnlockFn(row)}
                                                    isRequestPage={isRequestPage}
                                                    isTableImageReqd={isTableImageReqd}
                                                    noAction={noAction}
                                                    alarmFlag={alarmFlag}
                                                    onlyDeleteModeInner={onlyDeleteModeInner}
                                                    userFlag={userFlag}
                                                    tableType={tableType}
                                                />
                                            );
                                        })}
                                {filteredUsers &&
                                    !type &&
                                    filteredUsers.length > 0 &&
                                    filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length < 10
                                    ? emptyRowDisplay.map((ele) => {
                                        return (
                                            <TableRow
                                                key={ele}
                                                style={{
                                                    height: '40px',
                                                    // backgroundColor: '#2b2d42',
                                                    // background:'linear-gradient(45deg, rgba(91, 228, 155, 0.75), rgba(87,90,137,0.75))',
                                                    // borderBottom: '0px'
                                                }}
                                            >
                                                <TableCell colSpan={12} />
                                            </TableRow>
                                        );
                                    })
                                    : null}
                                {/* {emptyRows > 0 ||
                                    (filteredUsers.length == 0 && (
                                        <TableRow style={{ height: 3 * emptyRows }}></TableRow>
                                    ))} */}

                                {filteredUsers?.length == 0 ? (
                                    <TableRow className="emptyTable">
                                        <TableCell colSpan={14} style={{ width: '100%' }}>
                                            <div className="nodataRow">
                                                {/* <img src={NoData} alt="no data" /> */}
                                                <Typography sx={{ mt: '2%' }} style={{ fontFamily: 'montserrat' }}>
                                                    {noDataText}
                                                </Typography>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : null}
                            </TableBody>
                            {/* {filterName?.length > 0 && !type && isUserNotFound && (
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center" colSpan={12} sx={{ py: 3 }}>
                                            <SearchNotFound searchQuery={filterName} />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            )} */}
                            
                            {/* 
                            {(filteredUsers?.length === 0 && type === 'modelList') ||
                            (filteredUsers?.length === 0 && type === 'machineList') ? (
                                <Container
                                    maxWidth="xl"
                                    style={{
                                        paddingLeft: '16px',
                                        paddingRight: '16px',
                                        paddingTop: '24px',
                                        paddingBottom: '24px'
                                    }}
                                >
                                    <Grid container spacing={2}>
                                        <h5
                                            style={{
                                                marginLeft: '20px',
                                                marginTop: '20px',
                                                fontSize: '12px',
                                                textAlign: 'center',
                                                color: '#c0c2d8'
                                            }}
                                        >
                                            {noDataText}
                                        </h5>
                                    </Grid>
                                </Container>
                            ) : null} */}
                        </Table>
                    </TableContainer>
                </Scrollbar>
                {type !== 'machineList' && isPagination ? (
                    <TablePagination
                        className={!overflow ? 'table_pagination nonescroll' : 'table_pagination '}
                        rowsPerPageOptions={[]}
                        component="div"
                        count={rowCount}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={onPageChange}
                        // labelDisplayedRows={() => {}}
                        ActionsComponent={() => (
                            <TablePaginator
                                count={rowCount}
                                rowsPerPage={ rowsPerPage}
                                page={page}
                                onPageChange={onPageChange}
                                setPageNumber={setPageNumber}
                            />
                        )}
                    />
                ) : null}
            </Card>
        </Container>
    );
}
