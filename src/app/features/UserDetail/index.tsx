import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Grid from "@material-ui/core/Grid";
import { Container } from '@mui/material';
import ClickTiles from "../../components/CastCard";
import AdminAction from "../../components/AdminAction";
// import { getFromLocalStorage } from '../../../utilities/storageUtility';
// import './index.scss';
import '../index.scss';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ACTION_CODES, STORE_KEYS } from '../../constants/apiConstants';
import { executeACGAction, updateScreenIdentifiers } from '../../store/slice';
import { acgSelector } from '../../store/selector';
import AdminCustomCard from "../../components/AdminCustomCard"
import AdminPositions from '../../components/AdminPositions';

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

  useEffect(() => {
    if (props?.location?.state?.params) {
      setUser(props?.location?.state?.params)
      dispatch(updateScreenIdentifiers({
        storeKey: STORE_KEYS.ADMIN_GET_ORDERS,
        uniqueScreenIdentifier: {
            message: ''
        }
    }))
    dispatch(updateScreenIdentifiers({
      storeKey: STORE_KEYS.ADMIN_GET_POSITIONS,
      uniqueScreenIdentifier: {
          message: ''
      }
  }))
  dispatch(updateScreenIdentifiers({
    storeKey: STORE_KEYS.ADMIN_GET_MARGIN,
    uniqueScreenIdentifier: {
        message: ''
    }
}))
dispatch(updateScreenIdentifiers({
  storeKey: STORE_KEYS.ADMIN_GET_PROFILE,
  uniqueScreenIdentifier: {
      message: ''
  }
}))
    }
    else {
      history.push('/adminDash')
    }

  }, [])



  const getMargin = () => {
    dispatch(
      executeACGAction({
        payload: {
          requestType: 'POST',
          urlPath: ACTION_CODES.ADMIN_GET_MARGIN,
          reqObj: {
            user: user,
          }
        },
        storeKey: STORE_KEYS.ADMIN_GET_MARGIN,
        // uniqueScreenIdentifier: {
        //     apiKeyRecd: true
        // }
      })
    );
    setDisplayBlock({ Margin: true, Positions: false, Orders: false, Profile: false })
  };

  const getPositions = () => {
    dispatch(
      executeACGAction({
        payload: {
          requestType: 'POST',
          urlPath: ACTION_CODES.ADMIN_GET_POSITIONS,
          reqObj: {
            user: user,
          }
        },
        storeKey: STORE_KEYS.ADMIN_GET_POSITIONS,
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
          requestType: 'POST',
          urlPath: ACTION_CODES.ADMIN_GET_ORDERS,
          reqObj: {
            user: user,
          }
        },
        storeKey: STORE_KEYS.ADMIN_GET_ORDERS,
        // uniqueScreenIdentifier: {
        //     apiKeyRecd: true
        // }
      })
    );
    setDisplayBlock({ Margin: false, Positions: false, Orders: true, Profile: false })
  };

  useEffect(() => {
    if (state?.adminGetPositions?.message?.net?.length > 0) {
      let pnl = 0
      let dayPnl = 0
      state?.adminGetPositions?.message?.net.map((ele: any) => {
        return pnl += ele?.pnl
      })
      state?.adminGetPositions?.message?.day.map((ele: any) => {
        return dayPnl += ele?.pnl
      })
      setPnl(pnl)
      setDayPnl(dayPnl)
    }

  }, [state?.adminGetPositions?.message])

  const getProfile = () => {
    dispatch(
      executeACGAction({
        payload: {
          requestType: 'POST',
          urlPath: ACTION_CODES.ADMIN_GET_PROFILE,
          reqObj: {
            user: user,
          }
        },
        storeKey: STORE_KEYS.ADMIN_GET_PROFILE,
        // uniqueScreenIdentifier: {
        //     apiKeyRecd: true
        // }
      })
    );
    setDisplayBlock({ Margin: false, Positions: false, Orders: false, Profile: true })
  };


  return (
    <div className="dashboard">
      <Container maxWidth="xl" style={{ marginTop: '60px' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={3} xl={3} md={6}>
            <AdminAction title="Get Margin" click={getMargin} />
          </Grid>
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
      {state?.adminGetOrders?.message && displayBlock?.Orders ?
        <Container maxWidth="xl" style={{ marginTop: '60px' }}>
          <AdminPositions data={state?.adminGetOrders?.message?.map((ele: any) => {
            var tm = new Date(ele?.order_timestamp).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
            let index = ele?.order_timestamp.indexOf('T')
            let time= ele?.order_timestamp.slice(index+1,index + 9);
            console.log(time)
            return (
              { ...ele, time }
            )
          })} type="orders"/>
          {/* <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Placed By</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Order Id</th>
                  <th>Symbol</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {state?.adminGetOrders?.message?.map((ele: any, index: number) => {
                  return (
                    <tr key={index}>
                      <td>{ele?.placed_by}</td>
                      <td>{ele?.status}</td>
                      <td>{ele?.exchange_update_timestamp}</td>
                      <td>{ele?.order_id}</td>
                      <td>{ele?.tradingsymbol}</td>
                      <td>{ele?.transaction_type}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div> */}
        </Container>
        : null}

      {state?.adminGetPositions?.message && displayBlock?.Positions ?
        <Container maxWidth="xl" style={{ marginTop: '60px' }}>
          <center><h3>Net:</h3></center>
          <AdminPositions data={state?.adminGetPositions?.message?.net} type="positions"/>
          {/* <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Buy Price</th>
                  <th>Buy Quantity</th>
                  <th>Value</th>
                  <th>Sell Price</th>
                  <th>Sell Quantity</th>
                  <th>Sell Value</th>
                  <th>P&L</th>
                </tr>
              </thead>
              <tbody>
                {state?.adminGetPositions?.message?.net?.map((ele: any, index: number) => {
                  return (
                    <tr key={index}>
                      <td>{ele?.tradingsymbol}</td>
                      <td>{ele?.buy_price}</td>
                      <td>{ele?.buy_quantity}</td>
                      <td>{ele?.buy_value}</td>
                      <td>{ele?.sell_price}</td>
                      <td>{ele?.sell_quantity}</td>
                      <td>{ele?.sell_value}</td>
                      <td>{ele?.pnl}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div> */}
          <h6>Total Pnl: <span style={{ position: 'absolute', right: '9.5%', fontWeight: 'bold' }}>{pnl}</span></h6>
          <center><h3>Day:</h3></center>
          <AdminPositions data={state?.adminGetPositions?.message?.day}  type="positions"/>
          {/* <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Buy Price</th>
                  <th>Buy Quantity</th>
                  <th>Value</th>
                  <th>Sell Price</th>
                  <th>Sell Quantity</th>
                  <th>Sell Value</th>
                  <th>P&L</th>
                </tr>
              </thead>
              <tbody>
                {state?.adminGetPositions?.message?.day?.map((ele: any, index: number) => {
                  return (
                    <tr key={index}>
                      <td>{ele?.tradingsymbol}</td>
                      <td>{ele?.buy_price}</td>
                      <td>{ele?.buy_quantity}</td>
                      <td>{ele?.buy_value}</td>
                      <td>{ele?.sell_price}</td>
                      <td>{ele?.sell_quantity}</td>
                      <td>{ele?.sell_value}</td>
                      <td>{ele?.pnl}</td>
                    </tr>
                  )
                })
                }
              </tbody>
            </table>
          </div> */}
          <h6>Total Pnl: <span style={{ position: 'absolute', right: '9.5%', fontWeight: 'bold' }}>{dayPnl}</span></h6>
        </Container>
        : null}

      {state?.adminGetMargin?.message && displayBlock?.Margin ?
        <Container maxWidth="xl" style={{ marginTop: '60px' }}>
          {state?.adminGetMargin?.message ? <AdminCustomCard detailsCommodity={state?.adminGetMargin?.message?.commodity?.available} detailsEquity={state?.adminGetMargin?.message?.equity?.available} net={state?.adminGetMargin?.message?.equity?.net} type="Margin" /> : null
          }
        </Container>
        : null}

      {state?.adminGetProfile?.message && displayBlock?.Profile ?
        <Container maxWidth="xl" style={{ marginTop: '60px' }}>
          {state?.adminGetProfile?.message ? <AdminCustomCard profileDetails={state?.adminGetProfile?.message?.data} type="Profile" /> : null
          }
        </Container>
        : null}

    </div>
  );
};

export default UserDetail;
