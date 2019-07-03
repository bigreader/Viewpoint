import React from 'react';
import Navbar from './Navbar';

export default props => (
  <>
    <Navbar />

    <div className="container-fluid my-3 my-xl-5 px-xl-5">
      <div className="row">
        {props.children}
      </div>
    </div>
  </>
);