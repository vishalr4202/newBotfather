import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Grid from "@material-ui/core/Grid";
import { Container } from '@mui/material';
import AdminAction from "../../components/AdminAction";
// import { getFromLocalStorage } from '../../../utilities/storageUtility';
// import './index.scss';
import '../index.scss';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ACTION_CODES, STORE_KEYS } from '../../constants/apiConstants';
import { executeACGAction, updateScreenIdentifiers } from '../../store/slice';
import { acgSelector } from '../../store/selector';
import AdminCustomCard from "../../components/FSAdminCustomCard"
import AdminPositions from '../../components/FSAdminPositions';
const options = {
  DEFAULT: {
    message: '',
    open: false,
    type: ''
  }
};
const UserDetail = (props: any) => {
  const dispatch = useDispatch();
  // const [snackbarOptions, setSnackbarOptions] = useState(options.DEFAULT);
  const history = useHistory()
  const [user, setUser] = useState('')
  const [displayBlock, setDisplayBlock] = useState({ Margin: false, Positions: false, Orders: false, Profile: false })
  const [pnl, setPnl] = useState(0)
  const [dayPnl, setDayPnl] = useState(0)
  const acgStateSelector = createStructuredSelector({
    acgSlice: acgSelector()
  });
  const { acgSlice: state } = useSelector(acgStateSelector);

  // const getMargin = () => {
  //   dispatch(
  //     executeACGAction({
  //       payload: {
  //         requestType: 'GET',
  //         urlPath: ACTION_CODES.USER_GET_MARGIN,
  //       },
  //       storeKey: STORE_KEYS.USER_GET_MARGIN,
  //       // uniqueScreenIdentifier: {
  //       //     apiKeyRecd: true
  //       // }
  //     })
  //   );
  //   setDisplayBlock({ Margin: true, Positions: false, Orders: false, Profile: false })
  // };

  const getPositions = () => {
    dispatch(
      executeACGAction({
        payload: {
          requestType: 'GET',
          urlPath: ACTION_CODES.FS_USER_POSITIONS,
        },
        storeKey: STORE_KEYS.FS_USER_POSITION,
        // uniqueScreenIdentifier: {
        //     apiKeyRecd: true
        // }
      })
    );
    setDisplayBlock({ Margin: false, Positions: true, Orders: false, Profile: false })
  };

  const getOrders = () => {
    dispatch(
      executeACGAction({
        payload: {
          requestType: 'GET',
          urlPath: ACTION_CODES.FS_USER_ORDERS,
        },
        storeKey: STORE_KEYS.FS_USER_GET_ORDERS,
        // uniqueScreenIdentifier: {
        //     apiKeyRecd: true
        // }
      })
    );
    setDisplayBlock({ Margin: false, Positions: false, Orders: true, Profile: false })
  };

  useEffect(() => {
    if (state?.fspositions?.message?.data?.length > 0) {
      let pnl = 0
      let dayPnl = 0
      state?.fspositions?.message?.data.map((ele: any) => {
        return pnl += Number(ele?.unrealizedMTOM)
      })
      state?.fspositions?.message?.data.map((ele: any) => {
        return dayPnl += Number(ele?.RealizedPNL)
      })
      setPnl(pnl)
      // setDayPnl(dayPnl)
    }

  }, [state?.getUserPositions?.message])

  const getProfile = () => {
    dispatch(
      executeACGAction({
        payload: {
          requestType: 'GET',
          urlPath: ACTION_CODES.GET_FS_USER_PROFILE,
        },
        storeKey: STORE_KEYS.FS_USER_PROFILE,
        // uniqueScreenIdentifier: {
        //     apiKeyRecd: true
        // }
      })
    );
    setDisplayBlock({ Margin: false, Positions: false, Orders: false, Profile: true })
  };
console.log(state,"statefsuseraction");
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className="dashboard" style={{ marginLeft: '0px' }}>
      <Container maxWidth="xl" style={{ marginTop: '10px' }}>
        <Grid container spacing={4}>
          {/* <Grid item xs={12} lg={3} xl={3} md={6}>
            <AdminAction title="Get Margin" click={getMargin} />
          </Grid> */}
          <Grid item xs={12} lg={3} xl={3} md={6}>
            <AdminAction title="Get Positions" click={getPositions} />
          </Grid>
          <Grid item xs={12} lg={3} xl={3} md={6}>
            <AdminAction title="Get Orders" click={getOrders} />
          </Grid>
          <Grid item xs={12} lg={3} xl={3} md={6}>
            <AdminAction title="Get Profile" click={getProfile} />
          </Grid>
        </Grid>
      </Container>
      {state?.fsorders?.message && displayBlock?.Orders ?
        <Container maxWidth="xl" style={{ marginTop: '60px' }}>
          <AdminPositions data={state?.fsorders?.message?.data?.map((ele: any) => {
            var tm = new Date(ele?.order_timestamp).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
            let index = tm.indexOf(',')
            let time = tm.slice(index + 1);
            console.log(ele,"ele")
            return (
              { ...ele, time }
            )
          })} type="orders" selectable={false} />
        </Container>
        : null}

      {state?.fspositions?.message && displayBlock?.Positions ?
        <Container maxWidth="xl" style={{ marginTop: '60px' }}>
          <center><h3>Unrealized: {pnl}, Realized : {dayPnl}</h3></center> 
          <AdminPositions data={state?.fspositions?.message?.data} type="Daypositions" />
          {/* <h6>Total Pnl: <span style={{ position: 'absolute', right: '9.5%', fontWeight: 'bold' }}>{pnl}</span></h6> */}
          {/* <center><h3>Day:</h3></center>
          <AdminPositions data={state?.getUserPositions?.message?.day} type="Daypositions" />
          <h6>Total Pnl: <span style={{ position: 'absolute', right: '9.5%', fontWeight: 'bold' }}>{dayPnl}</span></h6> */}
        </Container>
        : null}

      {state?.getUserAccountBalance?.data && displayBlock?.Margin ?
        <Container maxWidth="xl" style={{ marginTop: '60px' }}>
          {state?.getUserAccountBalance?.data ? <AdminCustomCard detailsCommodity={state?.getUserAccountBalance?.data?.commodity?.available} detailsEquity={state?.getUserAccountBalance?.data?.equity?.available} net={state?.getUserAccountBalance?.data?.equity?.net} type="Margin" /> : null
          }
        </Container>
        : null}
      {state?.fsuserDetails?.message && displayBlock?.Profile ?
        <Container maxWidth="xl" style={{ marginTop: '60px',width:"50%" }}>
          {state?.fsuserDetails?.message ? <AdminCustomCard profileDetails={state?.fsuserDetails?.message} type="Profile" /> : null
          }
        </Container>
        : null}
    </div>
  );
};

export default UserDetail;
