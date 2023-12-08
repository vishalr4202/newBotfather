// export const BASEURL = 'http://13.235.150.170:8001/';
export const BASEURL = 'http://localhost:8001/';

export const ACTION_CODES = {
    LOGIN: 'login',
    USER_DASH:'dashboard',
    FS_LOGIN:'firstStockLogin',
    GET_ACCESS_TOKEN:'getAccessToken',
    ADMIN_DASH:'getAllUsers',
    ADMIN_GET_MARGIN:'getAccountBalance',
    ADMIN_GET_POSITIONS:'getPositions',
    ADMIN_GET_PROFILE:'getProfile',
    ADMIN_GET_ORDERS:'getOrders',
    USER_GET_MARGIN:'getUserAccountBalance',
    USER_GET_POSITIONS:'getUserPositions',
    USER_GET_PROFILE:'getUserProfile',
    USER_GET_ORDERS:'getUserOrders',
    GET_INSTRUMENTS:'getInstruments',
    SET_BASIC_TRADE:'setBasicTrade',
    GET_FS_USER_PROFILE:"fsuserDetails",
    FS_USER_ORDERS:"fsorders",
    FS_PLACE_SINGLE_ORDER:'fsplacesingleorder',
    FS_PLACE_MULTIPLE_ORDER:'fsplacemultiorders'
};

export const STORE_KEYS = {
    LOGIN_DATA: 'loginData',
    USER_DASH_DATA: 'userDashData',
    FS_LOGIN:'fs_loginData',
    ACCESS_TOKEN:'accessToken',
    ADMIN_ALL_USERS:'allusers',
    ADMIN_GET_MARGIN:'adminGetMargin',
    ADMIN_GET_POSITIONS:'adminGetPositions',
    ADMIN_GET_PROFILE:'adminGetProfile',
    ADMIN_GET_ORDERS:'adminGetOrders',
    USER_GET_MARGIN:'getUserAccountBalance',
    USER_GET_POSITIONS:'getUserPositions',
    USER_GET_PROFILE:'getUserProfile',
    USER_GET_ORDERS:'getUserOrders',
    INSTRUMENTS:'instruments',
    SET_BASIC_TRADE:'basicTrade',
    FS_USER_PROFILE:"fsuserDetails",
    FS_USER_GET_ORDERS:"fsorders",
    FS_PLACE_SINGLE_ORDER:'fsplacesingleorder',
    FS_PLACE_MULTIPLE_ORDER:'fsplacemultiorders',
};
