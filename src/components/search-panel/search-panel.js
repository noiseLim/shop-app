// import React from 'react';

// import './search-panel.scss';

// const SearchPanel = () => {
//     return (
//         <div className="search__panel">
//             <button className="search__btn">Search</button>
//         </div>
//     )
// }

// export default SearchPanel;

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
}));

export default function SimpleAccordion() {
    const classes = useStyles();

    return (
        <div className="search__panel">
            <div className={classes.root}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        <Typography className={classes.heading}>Brand</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <SearchPanelItem />
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>        
    );
}