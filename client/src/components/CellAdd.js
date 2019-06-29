import React from 'react';

export default (props) => (
  <a href="#create" onClick={() => {
    props.onCreate({
      name: prompt()
    })
  }}>
    <li className="bg-border">
      <h3 className="title">Add {props.type}...</h3>
    </li>
  </a>
);
