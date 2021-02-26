import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import WithShopService from '../hoc';
import { makeStyles , withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import {getCategoryId} from '../search-panel/search-panel-slice';



const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        paddingTop: 0,
        paddingBottom: 0,
    },
    listIcon: {
        minWidth: 0,
    },
    item: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    form: {
        marginRight: 0,
    }
}));

const GreenCheckbox = withStyles({
    root: {
        '&$checked': {
            color: 'rgb(41, 167, 69)',
        },
        padding: 4,
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

function SearchPanelItem({ShopService}) {

    const dispatch = useDispatch();
    
    const categoryId = useSelector(state => state.searchPanel.categoryId);
    const classes = useStyles();
    const [checked, setChecked] = useState([0]);

    useEffect(() => {
        ShopService.getCategoryIdCount()
            .then(res => dispatch(getCategoryId(res)))
    }, [])

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <List className={classes.root}>
            {[categoryId].map((value) => {
                const labelId = `checkbox-list-label-${value}`;

                return (
                    <ListItem className={classes.item} key={value} role={undefined} dense button onClick={handleToggle(value)}>
                        <ListItemIcon className={classes.listIcon}>
                            <FormControlLabel className={classes.form} control={<GreenCheckbox
                                edge="start"
                                checked={checked.indexOf(value) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}/>}
                                />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                    </ListItem>
                );
            })}
        </List>
    );
}

export default WithShopService()(SearchPanelItem); 