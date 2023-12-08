import FMicon from '../../assets/images/navigationicons/FMicon.svg';
// import CMicon from '../../assets/images/navigationicons/CMicon.svg';
// import UMicon from '../../assets/images/navigationicons/UMicon.svg';
import MMicon from '../../assets/images/navigationicons/MachineManagementIcon.svg';
import AuditTrail from '../../assets/images/navigationicons/AuditTrail.svg';
import MachineMonitoringIcon from '../../assets/images/navigationicons/MachineMonitoring.svg';
import RemoteAssistanceIcon from '../../assets/images/navigationicons/RemoteAssistance.svg';
import BMIcon from '../../assets/images/BroadCastIcon.svg';
import ReportsIcon from '../../assets/images/navigationicons/menu_user_reports.svg';
import SystemConfigIcon from '../../assets/images/navigationicons/SystemConfigIcon.svg';
import DNRPIcon from '../../assets/images/navigationicons/menu-dn-rp.svg'
import dashIcon from '../../assets/dashboard_new.png';
import UserAction from '../../assets/touch.png'
import order from '../../assets/order.png'

export const paths = {
    LOGIN: { path: ['/', '/login'] },
    AdminDash: { path: '/adminDash',title: 'Admin Dashboard' },
    UserDash: { path: '/userDash',title: 'User Dashboard' },
    UserAction: { path: '/useractions',title: 'User Action' },
    PlaceOrder: { path: '/placeorder',title: 'Place Order' },
    AdminUserDtl: { path: '/userdetail',title: 'User Detail' },
    FORGOT_PWD: { path: '/forgotPassword', title: 'Forgot Password' },
};

export const ROUTES_PATH = [
    {
        isVisible: true,
        isHomePage: false,
        isAccess: false,
        FeartureCode: 'CLMGMT',
        path: '/adminDash',
        title: 'Dashboard',
        imgSrc: dashIcon,
        role:'admin'
    },
    // {
    //     isVisible: true,
    //     isHomePage: false,
    //     isAccess: true,
    //     FeartureCode: 'UDTLPG',
    //     path: '/userdetail',
    //     title: 'User Detail',
    //     imgSrc: '',
    //     role:'admin'
    // },
    {
        isVisible: true,
        isHomePage: false,
        isAccess: true,
        FeartureCode: 'UMGMT',
        path: '/userDash',
        title: 'Dashboard',
        imgSrc: dashIcon,
        role:undefined
    },
    {
        isVisible: true,
        isHomePage: false,
        isAccess: true,
        FeartureCode: 'USACT',
        path: '/useractions',
        title: 'User Action',
        imgSrc: UserAction,
        role:undefined
    },
    {
        isVisible: true,
        isHomePage: false,
        isAccess: true,
        FeartureCode: 'PLACORDR',
        path: '/placeorder',
        title: 'Place Order',
        imgSrc: order,
        role:undefined
    },
];
