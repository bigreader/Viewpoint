import React from 'react';

export default (props) => (
  <li class={'bg-' + props.bg + (props.active? ' active':'')}>
    {!props.title? null : <h3 class="title">{props.title}</h3>}
    {!props.status? null : <p class="status">{props.status}</p>}
    {!props.children? null : <p class="body">{props.children}</p>}
    {!props.live? null : <div class="selectable"></div>}
  </li>
);
