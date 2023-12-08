import React from 'react';
import { RouteProps, Redirect, Route, withRouter } from 'react-router-dom';
import { getFromLocalStorage } from '../../utilities/storageUtility';
import PageNotFound from '../components/PageNotFound';
import { STORE_KEYS } from '../constants/apiConstants';
interface PrivateRouteProps extends RouteProps {
    component: React.FC<RouteProps>;
    path: any;
}

const UserRoutes = ({ component: Component, path, ...rest }: PrivateRouteProps) => {
    const accessToken = getFromLocalStorage('token');
    const role = getFromLocalStorage('role');

    return (
        <Route
            {...rest}
            path={path[0]}
            render={(props: any) =>
                accessToken && accessToken !== '' && role == 'undefined' ? (
                        <Component {...props} />
                    )  : (
                    <Redirect to="/" />
                )
            }
        />
    );
};
export default UserRoutes;
