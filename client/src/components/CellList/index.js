import React from 'react';
import EditHead from '../EditHead';

export default (props) => (
  <>
    {props.head === false? null : <EditHead editable={props.editable}>{props.list}</EditHead>}
    <ul id={'list-' + props.list.toLowerCase()} className={'cell-list' + (props.grid? ' cell-grid' : '')}>
      {props.children}
    </ul>
  </>
);
