/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import { withRouter, Link, NavLink, useHistory } from 'react-router-dom';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Avatar from '@mui/material/Avatar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { paths, ROUTES_PATH } from '../../constants/paths';
// import BellIcon from '../../../assets/images/BellIcon.svg';
// import ProfileIcon from '../../../assets/images/ProfileIcon.svg';
// import LoginLogo from '../../../assets/ACGLoginLogo.svg';
import { createStructuredSelector } from 'reselect';
import './index.scss';
import { useDispatch,useSelector } from 'react-redux';
import { removeLocalStorage } from '../../../utilities/storageUtility';
import { executeACGAction, reset, updateScreenIdentifiers } from '../../store/slice';
import { acgSelector } from '../../store/selector';
// import Switch from '../Switch';
// import useGetState from '../../utils/hooks/useGetState';
import { ACTION_CODES, STORE_KEYS } from '../../constants/apiConstants';
// import SnackbarAlert from '../Snackbar';
import Label from '../Label/index';
// import BroadCastIcon from '../../../assets/images/BroadCastIcon.svg';
// import CurrentBroadcastCard from '../CurrentBroadCastCard';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';

const drawerWidth = 240;

const options = {
    DEFAULT: {
        message: '',
        open: false,
        type: ''
    }
};

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: 'hidden'
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`
    }
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    })
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme)
    })
}));
const settings = [ 'Change Password', 'Logout'];

function MiniDrawer() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [anchorCrrBcst, setAnchorCrrBcst] = useState<null | HTMLElement>(null);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const [currentBroadcast, setCurrentBroadcast] = useState<any>([]);
    // { BroadcastMessage: 'Heelo', DateTimeRange: 'time' } bradcast obj

    const acgStateSelector = createStructuredSelector({
        acgSlice: acgSelector()
    });
    const { acgSlice: state } = useSelector(acgStateSelector);

    const history = useHistory();
    // const state = useGetState();
    const [updateProfile, setUpdateProfile] = useState(false);
    const [updatePassword, setUpdatePassword] = useState(false);
    const [snackbarOptions, setSnackbarOptions] = useState(options.DEFAULT);
    const [routes, setRoutes] = useState([]);
    // const userName = state?.[STORE_KEYS.USER_DTL];
    const userName ="nitint"

    const dispatch = useDispatch();
    const getFormat = (__data: any) => {
        const result: any = [];
        const keyArr: any = new Set<string>(__data?.map((item: any) => item?.Module));
        const key: any = [...keyArr];
        key.forEach((k: any) => {
            const obj: any = {};
            const arr: any = [];
            __data.forEach((item: any) => {
                if (item.Module == k) {
                    arr.push(item);
                }
            });
            obj['module'] = k;
            obj['value'] = arr;
            result.push(obj);
        });
        return result;
    };

    useEffect(() => {
        const getRoutes = (__data?: any) => {
            const newRoutes: any = [];
            // __data?.forEach((newroute: any) => {
                ROUTES_PATH?.forEach((route: any) => {
                    const __route = { ...route };
                    if (state?.loginData?.role === route.role ) {
                        __route.isAccess = true;
                        __route.isVisible = true;
                        newRoutes.push(__route);
                    }
                // });
            });
            return newRoutes.filter((v: any, i: any, self: any) => i === self?.findIndex((t: any) => t.path == v.path));
          };
          
            const __routes = getFormat(getRoutes());
            setRoutes(__routes[0]?.value);
    },[state?.loginData])

    const getCurrentBroadcast = () => {
        // const payload = {
        //     payload: {
        //         urlPath: ACTION_CODES.GET_CRR_BRDCAST,
        //         requestType: 'GET'
        //     },
        //     uniqueScreenIdentifier: { isCrrBroadcast: true },
        //     storeKey: STORE_KEYS.CURRENT_BROADCAST
        // };
        // dispatch(executeACGAction(payload));
    };

    // useEffect(() => {
    //     getCurrentBroadcast();
    // }, []);

    // useEffect(() => {
    //     if (state?.[STORE_KEYS.CURRENT_BROADCAST]?.body?.data) {
    //         setCurrentBroadcast(state?.[STORE_KEYS.CURRENT_BROADCAST]?.body?.data);
    //     }
    // }, [state?.[STORE_KEYS.CURRENT_BROADCAST]?.body?.data]);

    // useEffect(() => {
    //     if (state?.[STORE_KEYS.ROUTES_PRIVILEGES]) {
    //         const __routes = getFormat(state?.[STORE_KEYS.ROUTES_PRIVILEGES]);
    //         setRoutes(__routes);
    //     }
    // }, [state?.[STORE_KEYS.ROUTES_PRIVILEGES]]);

    const handleLogout = () => {
        removeLocalStorage('token');
        removeLocalStorage('role');
        dispatch(reset());
        handleCloseUserMenu();
        history.push(paths.LOGIN.path[0]);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        !anchorElUser ? setAnchorElUser(event.currentTarget) : handleCloseUserMenu();
        // dispatch(
        //     updateScreenIdentifiers({
        //         storeKey: STORE_KEYS.GLOBAL_DRAWER,
        //         uniqueScreenIdentifier: {
        //             body: true
        //         }
        //     })
        // );
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
        // dispatch(
        //     updateScreenIdentifiers({
        //         storeKey: STORE_KEYS.GLOBAL_DRAWER,
        //         uniqueScreenIdentifier: {
        //             body: false
        //         }
        //     })
        // );
    };

    const handleCloseCrrBcst = () => {
        setAnchorCrrBcst(null);
    };

    const closeSnackbar = () => setSnackbarOptions(options.DEFAULT);

    return (
        <div className="Navigation">
            {/* <SnackbarAlert options={snackbarOptions} handleClose={closeSnackbar} /> */}
            {location.hash === `#${paths.LOGIN.path[0]}` || location.hash === `#${paths.LOGIN.path[1]}` || location.hash === `#${paths.FORGOT_PWD.path}` ? null : (
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <AppBar position="fixed" open={open} className={open ? 'appbar openedAppbar' : 'appbar'}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{
                                    marginRight: 5,
                                    ...(open && { display: 'none' })
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" noWrap component="div">
                                {/* <Link to={'/'}>
                                    {' '}
                                    
                                </Link> */}
                            </Typography>
                            <Box sx={{ flexGrow: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                                    <IconButton onClick={handleOpenUserMenu}>
                                        <Avatar
                                            alt="Remy Sharp"
                                            // src={ProfileIcon}
                                            style={{ width: '35px', height: '35px' }}
                                        />
                                        <Typography variant="caption" className="profileMenuDiv">
                                            {state?.loginData?.username}
                                            {anchorElUser ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                        </Typography>
                                    </IconButton>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right'
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right'
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                        className="profileDropDown"
                                    >
                                        {settings.map((setting) => (
                                            <MenuItem
                                                key={setting}
                                                // onClick={handleCloseUserMenu}
                                                sx={{ color: 'text.secondary' }}
                                                className="actionmenu"
                                            >
                                                {setting === 'Notifications' || setting === 'Coach Marks' ? (
                                                    <Typography textAlign="center">
                                                        {setting}
                                                         {/* <Switch /> */}
                                                    </Typography>
                                                ) : setting === 'Logout' ? (
                                                    <Typography textAlign="center">
                                                        <a onClick={handleLogout}>{setting}</a>
                                                    </Typography>
                                                ) : setting === 'Security Question' ? (
                                                    <Typography textAlign="center">
                                                        <a onClick={() => setUpdateProfile(true)}>{setting}</a>
                                                    </Typography>
                                                ) : setting === 'Change Password' ? (
                                                    <Typography textAlign="center">
                                                        <a onClick={() => setUpdatePassword(true)}>{setting}</a>
                                                    </Typography>
                                                ) : (
                                                    <Typography
                                                        textAlign="center"
                                                        onClick={handleCloseUserMenu}
                                                        style={{ padding: '5px', paddingLeft: '0px' }}
                                                    >
                                                        {setting}
                                                    </Typography>
                                                )}
                                                {/* {setting === 'Logout' ? (
                                                    <Typography textAlign="center">
                                                        <a onClick={handleLogout}>{setting}</a>
                                                    </Typography>
                                                ) : (
                                                    <Typography textAlign="center">{setting}</Typography>
                                                )} */}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                    
                                </Box>
                            </Box>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        open={open}
                        className={open ? 'openableDrawer opened' : 'openableDrawer'}
                    >
                        <DrawerHeader>
                            <IconButton onClick={handleDrawerClose}>
                                {open ? <ChevronLeftIcon sx={{ color: 'white' }} /> : null}
                            </IconButton>
                        </DrawerHeader>
                        <Divider />

                        <List onClick={handleDrawerClose}>
                            {routes?.map((__route: any, idx: number) => {
                                // console.log(__route,"route")
                                return (
                                    <>
                                        {open && (
                                            <Label
                                                className="navLabel"
                                                key={__route?.module}
                                                label={__route?.module?.toUpperCase()}
                                            />
                                        )}
                                        {
                                             __route.isVisible && (
                                                <NavLink
                                                    to={__route?.path}
                                                    activeClassName="activeLink"
                                                    className="navigationlink"
                                                    key={__route?.FeatureCode}
                                                    // onMouseEnter={handleDrawerOpen}
                                                    // onMouseLeave={handleDrawerClose}
                                                >
                                                    <Tooltip followCursor title={__route?.title?.split(' ').join('-')}>
                                                        <ListItem disablePadding sx={{ display: 'block' }}>
                                                            <ListItemButton
                                                                sx={{
                                                                    minHeight: 48,
                                                                    justifyContent: open ? 'initial' : 'center'
                                                                    // px: 2.5,
                                                                }}
                                                            >
                                                                <ListItemIcon
                                                                    sx={{
                                                                        minWidth: 0,
                                                                        mr: open ? 3 : 'auto',
                                                                        justifyContent: 'center'
                                                                    }}
                                                                >
                                                                    <img src={__route?.imgSrc} alt="FMicon" />
                                                                </ListItemIcon>
                                                                <ListItemText
                                                                    primary={__route?.title?.split(' ').join('-')}
                                                                    sx={{ opacity: open ? 1 : 0 }}
                                                                />
                                                            </ListItemButton>
                                                        </ListItem>
                                                    </Tooltip>
                                                </NavLink>
                                            )
                                        }
                                        {__route?.value?.map(
                                            (item: any) =>
                                            {console.log(item,"item")}
                                        )}
                                    </>
                                );
                            })}
                        </List>

                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorCrrBcst}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            open={Boolean(anchorCrrBcst)}
                            onClose={handleCloseCrrBcst}
                            className="profileDropDown"
                        >
                            <MenuItem>
                                <div style={{ flex: '70%' }}>
                                    <h5
                                        style={{
                                            fontSize: '13px',
                                            color: '#DADCEE',
                                            marginBottom: '10px',
                                            fontFamily: 'Montserrat'
                                        }}
                                    >
                                        Broadcast
                                    </h5>
                                </div>
                            </MenuItem>
                        </Menu>
                    </Drawer>
                </Box>
            )}
        </div>
    );
}

export default withRouter(MiniDrawer);
