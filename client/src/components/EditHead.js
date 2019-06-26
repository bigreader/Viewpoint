import React from 'react';

export default (props) => (
  <div class="edit-head">
    <h2>{props.children}</h2>
    {props.editable === false? null : <button class="btn btn-sm btn-outline-secondary">Edit</button>}
  </div>
);
