import React from 'react';
import MD5 from 'md5.js';
import './BannerImage.css';

const hexTop = ['8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
function randomPattern(str) {
  let digit = new MD5().update(str).digest('hex')[0];
  if (digit > '7') {
    digit = hexTop.indexOf(digit);
  }
  return parseInt(digit) + 1;
}

export default props => (
  <div className={'banner-image bg-' + props.bg} >
    <img className="pattern" src={`/img/pattern-${randomPattern(props.title)}.svg`} alt="" />
    <h3>{props.title}</h3>
    <h4>{props.summary}</h4>
  </div>
);
