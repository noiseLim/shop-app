import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./spinner.scss";

const useStyles = makeStyles({
  root: {
    color: "#29a745",
  },
});

const Spinner = () => {
  const classes = useStyles();
  return (
    <div className="spinner__grid">
      <CircularProgress
        size={100}
        classes={{
          root: classes.root,
        }}
      />
    </div>
  );
};

export default Spinner;
