import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
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

import WithShopService from '../hoc';
import {productLoaded, productRequested, productError} from '../product-list/product-list-slice';


const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
        marginLeft: 10,
        marginRight: 10,
    },
    app: {
        backgroundColor: 'rgb(41, 167, 69)',
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
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

const StyledBadge = withStyles((theme) => ({
    badge: {
        border: `2px solid rgb(41, 167, 69)`,
        backgroundColor: 'white',
        padding: '0 4px',
        color: 'rgb(41, 167, 69)',
    },
}))(Badge);

const AppHeader = ({ShopService}) => {

    const [searchValue, setSearchValue] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productRequested());
        ShopService.getProductItems(searchValue)
            .then(res => dispatch(productLoaded(res)))
            .catch(error => dispatch(productError()))
    }, [])

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
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
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
            <MenuItem>
                <IconButton 
                    aria-label="cart" 
                    className={classes.badge}>
                    <StyledBadge badgeContent={2}>
                        <ShoppingCartIcon />
                    </StyledBadge>
                </IconButton>
                <p>Cart</p>
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
                    <Typography className={classes.title} variant="h6" noWrap>
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
                        <IconButton aria-label="show favotites" color="inherit">
                            <StyledBadge badgeContent={4}>
                                <FavoriteIcon />
                            </StyledBadge>
                        </IconButton>
                        <IconButton aria-label="cart" color="inherit">
                            <StyledBadge badgeContent={2}>
                                <ShoppingCartIcon />
                            </StyledBadge>
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