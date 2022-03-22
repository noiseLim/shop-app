import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
} from '@material-ui/core';

// icons
import {
  DescriptionOutlined,
  FormatListBulletedOutlined,
  StarBorderOutlined,
  ChatBubbleOutlineOutlined,
  ThumbUpAltOutlined,
  SystemUpdateAltOutlined,
  AddCircleOutlineOutlined,
} from '@material-ui/icons';

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
  tabs: {
    '& .MuiTab-textColorPrimary.Mui-selected': {
      color: 'rgb(17, 117, 39)',
    },
    '& .PrivateTabIndicator-colorPrimary-67': {
      backgroundColor: 'rgb(17, 117, 39)',
    },
  },
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
          className={classes.tabs}
        >
          <Tab
            label='Description'
            icon={<DescriptionOutlined />}
            {...a11yProps(0)}
          />
          <Tab
            label='Characteristics'
            icon={<FormatListBulletedOutlined />}
            {...a11yProps(1)}
          />
          <Tab
            label='Opinion'
            icon={<StarBorderOutlined />}
            {...a11yProps(2)}
          />
          <Tab
            label='Communicator'
            icon={<ChatBubbleOutlineOutlined />}
            {...a11yProps(3)}
          />
          <Tab label='Review' icon={<ThumbUpAltOutlined />} {...a11yProps(4)} />
          <Tab
            label='Drivers and files'
            icon={<SystemUpdateAltOutlined />}
            {...a11yProps(5)}
          />
          <Tab
            label='Accessories'
            icon={<AddCircleOutlineOutlined />}
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
