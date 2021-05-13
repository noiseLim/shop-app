import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ViewStreamIcon from "@material-ui/icons/ViewStream";
import ViewModuleIcon from "@material-ui/icons/ViewModule";

import { setListView } from "./sort-panel-slice";

import "./sort-panel.scss";

const SortPanel = () => {
  const listView = useSelector((state) => state.sortPanel.listView);

  const dispatch = useDispatch();
  return (
    <div className="sort__panel">
      <div className="sort__btn_wrapper">
        {listView ? (
          <ViewModuleIcon
            style={{ fontSize: 40 }}
            className="sort__btn"
            onClick={() => dispatch(setListView())}
          >
            Sort
          </ViewModuleIcon>
        ) : (
          <ViewStreamIcon
            style={{ fontSize: 40 }}
            className="sort__btn"
            onClick={() => dispatch(setListView())}
          >
            Sort
          </ViewStreamIcon>
        )}
      </div>
    </div>
  );
};

export default SortPanel;
