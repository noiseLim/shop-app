import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import SearchPanelItem from '../search-panel-item';

import './search-panel.scss';

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
    }
}));

// const GlobalCSS = withStyles({
//     '@global': {
//         '.MuiAccordionSummary-content': {
//             margin: 0,
//             display: 'flex',
//             flexGrow: 1,
//             transition: 'margin 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
//         },
//         // 'Mui-expanded': {
//         //     margin: '22px 0',
//         // }
//     },
// })(() => null);

export default function SimpleAccordion() {
    const classes = useStyles();

    return (
        <div className="search__panel">
            <div className={classes.root}>
                <Accordion className={classes.accordion}>
                    {/* <GlobalCSS /> */}
                    <AccordionSummary className={classes.summary}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        <Typography component={'span'} className={classes.heading}>Brand</Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.details}>
                        <Typography component={'span'}>
                            <SearchPanelItem />
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>        
    );
}