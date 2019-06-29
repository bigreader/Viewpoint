import React from 'react';
import './Cell.css';

// const bgs = ['grad-1', 'grad-2', 'grad-3', 'grad-4', 'grad-5'];
// function randomBg() {
//   return bgs[Math.floor(Math.random() * bgs.length)];
// }

export default (props) => (
  <li className={'bg-' + (props.bg || 'unknown') + (props.active? ' active':'')}>
    {!props.title? null : <h3 className="title">{props.title}</h3>}
    {!props.status? null : <p className="status">{props.status}</p>}
    {!props.children? null : <p className="body">{props.children}</p>}
    {!props.live? null : <div className="selectable" onClick={props.onClick}></div>}
    {!props.editing ? null : <button className="delete" onClick={props.onDelete}>&times;</button>}
  </li>
);
