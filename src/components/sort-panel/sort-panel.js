import React from 'react';
import {useDispatch} from 'react-redux';

import {setListView} from './sort-panel-slice'

import './sort-panel.scss';

const SortPanel = () => {

    const dispatch = useDispatch();
    return (
        <div className="sort__panel">
            <button 
            className="sort__btn"
            onClick={() => dispatch(setListView())}>Sort</button>
        </div>
    )

}

export default SortPanel;