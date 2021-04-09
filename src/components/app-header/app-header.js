import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { withStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Link from '@material-ui/core/Link';
import {useHistory} from 'react-router-dom';
import { Typography } from '@material-ui/core';

import WithShopService from '../hoc';
import {productLoaded, productRequested, productError} from '../product-list/product-list-slice';
import {setIsAuth} from '../app/app-slice';
import {LOGIN_ROUTE, SHOP_ROUTE, CART_ROUTE} from '../../utils/consts';


const useStyles = makeStyles((theme) => ({
    grow: {
        position: 'fixed',
        right: 0,
        left: 0,
        zIndex: 1,
        backgroundColor: 'rgb(41, 167, 69)',
        boxShadow: '5px 5px 10px rgba(0,0,0,.2)'
    },
    app: {
        backgroundColor: 'rgb(41, 167, 69)',
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: 1180,
        boxShadow: 'none',
        paddingLeft: 10,
        paddingRight: 10,
    },
    badge: {
        color: 'rgb(41, 167, 69)',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
    [theme.breakpoints.up('sm')]: {
        display: 'block',
        color: '#fff',
        cursor: 'pointer',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        // padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        zIndex: 1,
        // pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 25, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
        display: 'flex',
        marginLeft: 'auto'
        },
    },
    sectionMobile: {
        display: 'flex',
        marginLeft: 'auto',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    link: {
        color: '#000000DE',
    },
    price: {
        marginLeft: 8
    },
    icon: {
        '&:hover': {
            backgroundColor: 'rgb(41, 167, 69)'
        }
    }
}));

const StyledBadge = withStyles((theme) => ({
    badge: {
        border: `2px solid rgb(41, 167, 69)`,
        backgroundColor: 'white',
        padding: '0 4px',
        color: 'rgb(41, 167, 69)'
    },
}))(Badge);

const AppHeader = ({ShopService}) => {

    const history = useHistory();
    const [searchValue, setSearchValue] = useState('');
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.app._isAuth);
    const totalPrice = useSelector(state => state.productList.totalPrice);
    const totalQuantityProducts = useSelector(state => state.productList.totalQuantityProducts);

    useEffect(() => {
        dispatch(productRequested());
        ShopService.getProductItems(searchValue)
            .then(res => dispatch(productLoaded(res)))
            .catch(error => dispatch(productError()))
    }, [])

    // useEffect(() => {
    //     setIsAuth()
    // }, [isAuth])

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}>
            {isAuth ?
                <div>
                    <MenuItem onClick={handleMenuClose}>Admin</MenuItem>
                    <Link href={LOGIN_ROUTE} underline='none' className={classes.link}>
                        <MenuItem onClick={handleMenuClose}>Sign In</MenuItem>
                    </Link>
                </div>
                :
                <MenuItem onClick={() => dispatch(setIsAuth())}>Log in</MenuItem>
            }
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}>
            <MenuItem>
                <IconButton 
                    aria-label="show favotites" 
                    className={classes.badge}>
                    <StyledBadge badgeContent={4}>
                        <FavoriteIcon/>
                    </StyledBadge>
                </IconButton>
                <p>Favorites</p>
            </MenuItem>
            <MenuItem onClick={() => history.push(CART_ROUTE)}>
                <IconButton 
                    aria-label="cart" 
                    className={classes.badge}>
                    <StyledBadge badgeContent={totalQuantityProducts}>
                        <ShoppingCartIcon />
                    </StyledBadge>
                </IconButton>
                Cart
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    className={classes.badge}>
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    function searchHandler() {
        ShopService.getProductItems(searchValue)
            .then(res => dispatch(productLoaded(res)))
            .catch(error => dispatch(productError()))
    }

    function clickPress(e) {
        if (e.key === 'Enter') {
            searchHandler()
        }
    }

    return (
        <div className={classes.grow}>
            <AppBar 
                position="static"
                className={classes.app}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer">
                        <MenuIcon />
                    </IconButton>
                    <Typography 
                        href={SHOP_ROUTE} 
                        underline='none' 
                        className={classes.title} 
                        variant="h6" 
                        noWrap
                        onClick={() => history.push(SHOP_ROUTE)}>
                        Shop App
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <IconButton 
                                aria-label="search" 
                                color="inherit" 
                                onClick={() => searchHandler()}>
                                <SearchIcon />
                            </IconButton>
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            value={searchValue} 
                            onChange={(e) => setSearchValue(e.target.value)}
                            type="text"
                            onKeyPress={clickPress}/>
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton aria-label="show favotites" color="inherit" className={classes.icon}>
                            <StyledBadge badgeContent={4}>
                                <FavoriteIcon />
                            </StyledBadge>
                        </IconButton>
                        <IconButton 
                            aria-label="cart" 
                            color="inherit"
                            className={classes.icon}
                            onClick={() => history.push(CART_ROUTE)}>
                            <StyledBadge badgeContent={totalQuantityProducts}>
                                <ShoppingCartIcon />
                            </StyledBadge>
                            <Typography className={classes.price}>
                                {totalPrice} $
                            </Typography>
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit">
                            <AccountCircle />
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit">
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
                {renderMobileMenu}
                {renderMenu}
        </div>
    );
}

export default WithShopService()(AppHeader);