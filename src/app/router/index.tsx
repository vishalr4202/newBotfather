import { paths } from '../constants/paths';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Navigation from '../components/NavigationDrawer';
import PageNotFound from '../components/PageNotFound';
import AdminDash from '../features/Admindashboard';
import UserDash from '../features/UserDash';
import UserActions from '../features/UserActions';
import PlaceOrders from '../features/PlaceOrder'
import Login from '../features/Login';
import UserDetail from '../features/UserDetail';
import PrivateRoute from './PrivateRoute';
import UserRoutes from './UserRoutes';
import UserTabs from '../features/UserActionTabs'
import PlaceOrderTabs from '../features/PlaceOrderTabs'
const Router = () => {
    return(
        <HashRouter basename="/">
        <Navigation />
        <Switch>
        <Route exact path ={paths.LOGIN.path} component ={Login} />
        <UserRoutes exact path={paths.UserDash.path} component={UserDash} />
        <UserRoutes exact path={paths.UserAction.path} component={UserTabs} />
        {/* <UserRoutes exact path={paths.PlaceOrder.path} component={PlaceOrders} /> */}
        <UserRoutes exact path={paths.PlaceOrder.path} component={PlaceOrderTabs} />
        <PrivateRoute exact path={paths.AdminDash.path} component={AdminDash} />
        <PrivateRoute exact path ={paths.AdminUserDtl.path} component ={UserDetail} />
        <Route path="*">
            <PageNotFound />
        </Route>
        </Switch>
    </HashRouter>
    )
   
}

export default Router