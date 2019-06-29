import React from 'react';

export default (props) => (
  <a href="#create" onClick={() => {
    props.onCreate({
      name: prompt()
    })
  }}>
    <li className="bg-subtle">
      <h3 className="title">Add {props.type}...</h3>
      <div className="selectable"></div>
    </li>
  </a>
);
