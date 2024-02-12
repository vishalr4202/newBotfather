import { useContext, useState } from 'react';
// import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useHistory } from 'react-router-dom';
import { Stack, Avatar, Checkbox, TableRow, TableCell, Typography, ListItemText, MenuItem, Radio } from '@mui/material';
import Label from '../../Label';
// import UserMoreMenu from '../../CustomTableMenu/index';
import './tableRow.scss';
// import SnackbarAlert from '../../../atoms/Snackbar';
import { useDispatch } from 'react-redux';
import InfoIcon from '@mui/icons-material/InfoOutlined';
// import DialerIcon from '../../../../assets/images/Dialer.svg';
// import ProfileIcon from '../../../../assets/images/ProfileIcon.svg';
// import clickcallAuth from '../../../features/RemoteAssistance/clickcall.auth'
// import { executeACGAction, resetErr, updateScreenIdentifiers } from '../../../../app/store/slice';
import { ACTION_CODES, STORE_KEYS } from '../../../../app/constants/apiConstants';
// import { Button } from '@material-ui/core';
// import useGetState from '../../../utils/hooks/useGetState';
import Button from '../../Button'

const options = {
    DEFAULT: {
        message: '',
        open: false,
        type: ''
    },
    CALL_SUCCESS: {
        message: 'Call Connected Successfully !',
        open: true,
        type: 'success'
    },
    CALL_FAIL: {
        message: 'Call Not Connected !',
        open: true,
        type: 'success'
    }

};

interface Props {
    isItemSelected: boolean;
    change: any;
    header: any;
    click: any;
    row: any;
    selectable: boolean;
    route?: any;
    editMenu?: boolean;
    link?: boolean;
    icon?: boolean;
    isRequestPage?: boolean;
    isTableImageReqd?: boolean;
    removeFn?: any;
    userUnlockFn?: any;
    isRadio?: boolean;
    isPermission?: boolean;
    checkDrodownSelection?: any;
    noAction?: Boolean;
    alarmFlag?: boolean;
    userFlag?: boolean;
    onlyDeleteModeInner?: boolean;
    tableType?:string
}
const UserlistBody = (props: Props) => {
    const {
        isItemSelected,
        click,
        row,
        selectable,
        change,
        header,
        route,
        editMenu,
        link,
        icon,
        isRequestPage = false,
        isTableImageReqd = true,
        removeFn = () => { },
        userUnlockFn = () => { },
        isRadio = false,
        isPermission = false,
        checkDrodownSelection,
        noAction,
        alarmFlag,
        userFlag,
        onlyDeleteModeInner,
        tableType
    } = props;
    const { id, email,symbol, role, status, company, avatarUrl, isVerified, OnboardStatus, time , tradingsymbol,quantity,pnl,tradingSymbol } = row;

    const history = useHistory();
    const orderList = header.map((ele: any) => {
        return ele.id;
    });
    const [selectedInput, setSelectedInput] = useState<any | null>(null);
    // const dispatch = useDispatch();
    // const state = useGetState();
    // const userName = state[STORE_KEYS.USER_DTL]

    const [snackbarOptions, setSnackbarOptions] = useState(options.DEFAULT);
    const closeSnackbar = () => setSnackbarOptions(options.DEFAULT);

    const handleInputChange = (event: any, key: any) => {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        event.preventDefault();
        if (selectedInput == row?.FeatureKey || row?.IsEditable === 'Y') {
            const __row = { ...row };
            checkDrodownSelection(__row, 'N', 'input', true);
            setSelectedInput(null);
        } else {
            const __row = { ...row };
            setSelectedInput(key);
            checkDrodownSelection(__row, 'Y', 'input', true);
        }
    };

    const [selectedValue, setSelectedValue] = useState<any | null>(null);

    const handleChange = (event: any) => {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        event.preventDefault();
        if (row?.IsHomePage === 'Y') {
            const __row = { ...row };
            checkDrodownSelection(__row, 'N', 'radio', true);
            setSelectedValue(null);
        } else {
            const __row = { ...row };
            setSelectedValue(event.target.value);
            checkDrodownSelection(__row, 'Y', 'radio', true);
        }
    };

    const handleCheckAndRadio = () => {
        const __row = { ...row };
        __row.IsHomePage = 'N';
        __row.IsEditable = 'N';
        checkDrodownSelection(row, 'N', 'radio', false);
        setSelectedValue(null);
        checkDrodownSelection(row, 'N', 'input', false);
        setSelectedInput(null);
    };

    const handleClickCall = (contactno: any) => {
        // const phoneName = userName.UserName.replace(/\s+/g, '_')
        // console.log("phone name log--->", phoneName.replace(/\s+/g, '_'));
        var request = {
            userName: row.UserName,
            custNumber: contactno,
            // phoneName: phoneName//row.UserName
        };
        console.log("data check--->", request);
        
        // clickcallAuth
        //     .getCallBackData()
        //     .then((response) => {
        //         console.log("get call back data log+++++ ", response);
        //     })
        //     .catch((error) => {
        //         console.log("-------", error);
        //     });
        // addCallHistory()
    }

    //   const userData = useContext(PermissionsContext);
    // .splice(-1);
    // orderList.splice(-1);

    // const routeToSupervisor = (ele: any) => {
    //     console.log(ele);
    //     history.push({
    //         pathname: '/dashboard/supervisor-detail',
    //         state: {
    //             params: ele
    //         }
    //     });
    // };

    // function mapOrder(array, order, key) {
    //   [array].sort(function (a, b) {
    //     var A = a[key],
    //       B = b[key];

    //     if (order.indexOf(A) > order.indexOf(B)) {
    //       return 1;
    //     } else {
    //       return -1;
    //     }
    //   });

    //   return array;
    // }

    // /**
    //  * Example:
    //  */

    // var item_array, item_order, ordered_array;

    // item_array = [
    //   { id: 2, label: "Two" },
    //   { id: 3, label: "Three" },
    //   { id: 5, label: "Five" },
    //   { id: 4, label: "Four" },
    //   { id: 1, label: "One" },
    // ];

    // ordered_array = mapOrder(row, orderList, "name");
    // console.log("Ordered:", JSON.stringify(ordered_array));
    const handler = (rows: any, ele: any) => {
        if (route) {
            route(row, ele);
        } else {
            return;
        }
    };

    const linkArray = [
        'householdID',
        'requestedBy',
        'hhId',
        'grantee',
        'facilityName',
        'requestedTo',
        'memberName',
        'UserName',
        'AlternatePhoneNo',
        'PhoneNo'
    ];
    const displayArray = orderList.map((ele: any, index: number) => {
        const cellKey = index + 1;
        if (linkArray.includes(ele) === true) {
            if (link) {
                return (
                    <TableCell component="th" scope="row" padding="none" key={cellKey} style={{ paddingLeft: '10px' }}>
                        {/* <SnackbarAlert options={snackbarOptions} handleClose={closeSnackbar} /> */}
                        <Stack direction="row" alignItems="center" spacing={2}>
                            {ele != 'grantee' && (ele == 'name' || ele == 'UserName') && isTableImageReqd ? (
                                <Avatar
                                    alt={row[ele]}
                                    style={{ width: '32px', height: '32px', marginLeft: '13px' }}
                                    // src={ProfileIcon}
                                />
                            ) : null}
                            {(ele == 'AlternatePhoneNo' || ele == 'PhoneNo') && isTableImageReqd ? (
                                <a style={{ cursor: 'pointer' }}>
                                    {/* <img onClick={() => { handleClickCall(row[ele]) }} src={DialerIcon} alt={row[ele]} /> */}
                                </a>
                            ) : null}
                            <Typography
                                variant="subtitle2"
                                noWrap
                                style={{
                                    fontFamily: 'PoppinsSemiBold !important'
                                    // color: '#0F1A8B',
                                    // textDecoration: 'underline',
                                    // cursor: 'pointer'
                                }}
                            // onClick={() => routeToSupervisor(row)}
                            // onClick={() => handler(row, ele)}
                            >
                                {row[ele]}
                            </Typography>
                            {/* {ele === 'facilityName' ? <div className="forceMajeure">Force Majeure</div> : null} */}
                        </Stack>
                    </TableCell>
                );
            } else {
                return (
                    <TableCell component="th" scope="row" padding="none" key={cellKey} style={{ paddingLeft: '10px' }}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            {ele != 'grantee' && isTableImageReqd ? (
                                <Avatar alt={row[ele]} src={'https://minimal-kit-react.vercel.app' + avatarUrl} />
                            ) : null}
                            <Typography
                                variant="subtitle2"
                                noWrap
                                style={{
                                    fontFamily: 'PoppinsSemiBold !important'
                                }}
                                // onClick={() => routeToSupervisor(row)}
                                onClick={() => handler(row, ele)}
                            >
                                {row[ele]}
                            </Typography>
                            {/* {ele === 'facilityName' ? <div className="forceMajeure">Force Majeure</div> : null} */}
                        </Stack>
                    </TableCell>
                );
            }
        }
        if (ele == 'isVerified') {
            return (
                <TableCell align="left" key={cellKey}>
                    {isVerified ? 'Yes' : 'No'}
                </TableCell>
            );
        }
        if (ele === 'municipalLinks' && icon) {
            return (
                <TableCell align="left" key={cellKey}>
                    {row[ele]} <InfoIcon className="infoIcon" />
                </TableCell>
            );
        }
        if (ele === 'parentGroups' && icon) {
            return (
                <TableCell align="left" key={cellKey}>
                    {row[ele]} <InfoIcon className="infoIcon" />
                </TableCell>
            );
        }
        if (ele === 'assignedMls' && icon) {
            return (
                <TableCell align="left" key={cellKey}>
                    {row[ele]} <InfoIcon className="infoIcon" />
                </TableCell>
            );
        }
        if (ele === 'LTP') {
            const getInitial = row['netQuantity']*row['netUploadPrice'];
            const ltp = Number(getInitial) + Number(row['unrealizedMTOM'])
            return (
                <TableCell align="left" key={cellKey}>
                    {ltp/row['netQuantity'] ?ltp/row['netQuantity'] : 'Closed' }
                </TableCell>
            );
        }

        if (ele === 'status' || ele === 'OnboardStatus') {
            return (
                <TableCell align="left" key={cellKey}>
                    {status || OnboardStatus ? (
                        <Label
                            variant="ghost"
                            color={
                                status === 'REJECTED'
                                    ? 'failure'
                                    : status === 'Active' ||
                                        status === 'Approved' ||
                                        status === 'Onboarded' ||
                                        OnboardStatus === 'Onboarded'||
                                        status === 'COMPLETE'
                                        ? 'general'
                                        : status === 'REJECTED' || status === 'Unassigned' || OnboardStatus === 'Unassigned'
                                            ? 'failure'
                                            : status === 'Approval Pending'
                                                ? 'warning'
                                                : 'synced'
                            }
                        >
                            {ele === 'status' ? sentenceCase(status) : sentenceCase(OnboardStatus)}
                        </Label>
                    ) : null}
                </TableCell>
            );
        }
        if (ele === 'Action' && tableType !== 'positions' && quantity!==0) {
            return (
                <TableCell align="left" key={cellKey}>
                    <ListItemText
                    style={{cursor:'pointer',textDecoration:'underline'}}
                    primary="View"
                    onClick={() => handler(row, ele)}
                    primaryTypographyProps={{ variant: "body2" }}
                  />
                </TableCell>
            );
        }
        else if(ele === 'Action' && quantity !== 0 && tableType=='positions'){
            let isProfit =  Number(pnl) > 0 || row['unrealizedMTOM'] > 0;
            return (
                <TableCell align="left" key={cellKey}>
                    {/* <Button
                     style={{cursor:'pointer',color:'white'}}
                     className={isProfit ? "exitGreen" : "exitRed"}
                     variant="contained" disableElevation
                    size="small"
                    onClick={() => click(row)}>
                        close
                    </Button> */}
                       <Button
                            // formInput="buttonDiv"
                            className={isProfit ? "tableProfitCloseButton" : "tableLossCloseButton"}
                            fullWidth
                            name="Close"
                            type="submit"
                            variant="contained"
                            secondary={false}
                            handleClick={() => click(row)}
                        />
                </TableCell>
            );
        }

        if (ele === 'setHome' && isRadio && selectable) {
            return (
                <TableCell align="center" key={cellKey}>
                    <div style={{ margin: '0 auto', textAlign: 'left' }}>
                        <Radio
                            checked={row?.IsHomePage === 'Y'}
                            onClick={(event: any) => handleChange(event)}
                            value={row?.FeatureKey}
                            name="radio-buttons"
                            inputProps={{ 'aria-label': row?.FeatureKey }}
                        />
                    </div>
                </TableCell>
            );
        }
        if (ele === 'DowntimeFlag' && !selectable && isRequestPage) {
            return (
                <TableCell align="center" key={cellKey}>
                    {row?.DowntimeFlag !== null && (
                        <div style={{ margin: '0 auto', textAlign: 'left' }}>
                            <Checkbox checked={row?.DowntimeFlag === 'Yes' ? true : false} disabled={true} />
                        </div>
                    )}
                </TableCell>
            );
        }

        if (ele === 'setPermission' && isPermission && selectable) {
            return (
                <TableCell align="center" key={cellKey}>
                    <div style={{ margin: '0 auto', textAlign: 'left' }}>
                        <Checkbox
                            checked={selectedInput == row?.FeatureKey || row?.IsEditable === 'Y' ? true : false}
                            onClick={(event: any) => handleInputChange(event, row?.FeatureKey)}
                        />
                    </div>
                </TableCell>
            );
        }
        // }
        return (
            <TableCell align="left" key={cellKey} className={noAction ? 'noAction' : ''}>
                {row[ele] == 0 ? <span style={{ color: 'red' }}>{row[ele]}</span> : <span>{row[ele]}</span>}
            </TableCell>
        );
    });
    // console.log(displayArray);
    return (<>
        <TableRow
            hover
            key={email || time || tradingsymbol}
            tabIndex={-1}
            role="checkbox"
            selected={isItemSelected}
            aria-checked={isItemSelected}
            // onClick={() => click(row)}
            className="tableRow"
        >
            {selectable ? (
                <TableCell padding="checkbox">
                    <Checkbox
                        checked={isItemSelected}
                        onChange={
                            isPermission
                                ? (event: any) => {
                                    handleCheckAndRadio();
                                    change(event, email || time || tradingsymbol||tradingSymbol );
                                }
                                : (event: any) => {
                                    event.nativeEvent.stopImmediatePropagation();
                                    event.stopPropagation();
                                    change(event, email || time || tradingsymbol || tradingSymbol );
                                }
                        }
                    />
                </TableCell>
            ) : //  (
                //     <TableCell padding="checkbox"></TableCell>
                // )
                null}

            {displayArray}
            {/* <TableCell align="left">
                <UserMoreMenu click={() => handler(row)} />
            </TableCell> */}
        </TableRow>
    </>);
};

export default UserlistBody;
