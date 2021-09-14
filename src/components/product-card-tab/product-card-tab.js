import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// icons
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import FormatListBulletedOutlinedIcon from '@material-ui/icons/FormatListBulletedOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import SystemUpdateAltOutlinedIcon from '@material-ui/icons/SystemUpdateAltOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    margin: '0 10px',
  },
  // tabs: {
  //   color: 'red',
  // },
}));

const ProductCardTab = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static' color='default'>
        <Tabs
          value={value}
          onChange={handleChange}
          // variant='scrollable'
          // scrollButtons='on'
          indicatorColor='primary'
          textColor='primary'
          aria-label='scrollable force tabs example'
          centered
        >
          <Tab
            label='Description'
            icon={<DescriptionOutlinedIcon />}
            // className={classes.tabs}
            {...a11yProps(0)}
          />
          <Tab
            label='Characteristics'
            icon={<FormatListBulletedOutlinedIcon />}
            {...a11yProps(1)}
          />
          <Tab
            label='Opinion'
            icon={<StarBorderOutlinedIcon />}
            {...a11yProps(2)}
          />
          <Tab
            label='Communicator'
            icon={<ChatBubbleOutlineOutlinedIcon />}
            {...a11yProps(3)}
          />
          <Tab
            label='Review'
            icon={<ThumbUpAltOutlinedIcon />}
            {...a11yProps(4)}
          />
          <Tab
            label='Drivers and files'
            icon={<SystemUpdateAltOutlinedIcon />}
            {...a11yProps(5)}
          />
          <Tab
            label='Accessories'
            icon={<AddCircleOutlineOutlinedIcon />}
            {...a11yProps(6)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Description
      </TabPanel>
      <TabPanel value={value} index={1}>
        Characteristics
      </TabPanel>
      <TabPanel value={value} index={2}>
        Opinion
      </TabPanel>
      <TabPanel value={value} index={3}>
        Communicator
      </TabPanel>
      <TabPanel value={value} index={4}>
        Review
      </TabPanel>
      <TabPanel value={value} index={5}>
        Drivers and files
      </TabPanel>
      <TabPanel value={value} index={6}>
        Accessories
      </TabPanel>
    </div>
  );
};

export default ProductCardTab;
