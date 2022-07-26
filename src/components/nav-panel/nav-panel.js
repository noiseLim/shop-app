import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import NavPanelItem from '../nav-panel-item';
import { getCategory } from './nav-panel-slice';
import { Context } from '../..';

import './nav-panel.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  accordion: {
    boxShadow: '0 0 0 0',
    minHeight: 0,
    margin: 0,
  },
  summary: {
    minHeight: 0,
    '&:hover': {
      backgroundColor: 'rgba(41, 167, 69, 0.1)',
      // borderRadius: 4,
    },
  },
  details: {
    padding: '0 16px',
  },
}));

const NavPanel = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const ShopService = useContext(Context);
  const categoryItems = useSelector((state) => state.navPanel.category);

  useEffect(() => {
    ShopService.getCategoryItems().then((res) => dispatch(getCategory(res)));
  }, []);

  return (
    <div className='search__panel'>
      <div className={classes.root}>
        {categoryItems.map((categoryItem) => {
          return (
            <Accordion key={categoryItem.id} className={classes.accordion}>
              <AccordionSummary
                className={classes.summary}
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <Typography component={'span'} className={classes.heading}>
                  {categoryItem.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.details}>
                <Typography component={'span'}>
                  <NavPanelItem />
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default NavPanel;
