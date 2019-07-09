import React from 'react';
import { Link } from 'react-router-dom';
import './Cell.css';

export default (props) => {
  const contents = (
    <>
      {props.title && <h3 className="title">{props.title}</h3>}
      {props.status && <p className="status">{props.status}</p>}
      {props.children && <p className="body">{props.children}</p>}
      {props.live && <div className="selectable" onClick={props.onClick}></div>}
      {props.editing && <button className="delete" onClick={props.onDelete}>&times;</button>}
    </>
  );

  return (
    <li className={'bg-' + (props.bg || 'unknown') + (props.active ? ' active' : '')}>
      {(props.link && !props.editing) ? <Link to={props.link}>{contents}</Link> : contents}
    </li>
  );
}



