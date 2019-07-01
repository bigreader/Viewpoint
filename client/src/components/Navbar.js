import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import API from '../utils/api';

class Navbar extends React.Component {

  state = {
    decisions: null
  }

  componentDidMount() {
    this.reload();
  }

  reload = () => {
    if (this.props.showDecisions) {
      API.decision.list().then(res => {
        this.setState({
          decisions: res.data
        });
      });
    }
  }

  render() {
    return (
      <nav className={'navbar navbar-dark font-weight-bold justify-content-between bg-' + (this.props.bg || 'prob-p')}>
        <Link className="navbar-brand" to="/">Viewpoint</Link>
        {this.state.decisions &&
          <div className="nav-item dropdown" style={{ fontSize: '1.5em', lineHeight: '1em' }}>
            <a className="nav-link text-white dropdown-toggle" href="/decisions" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {this.props.current ? this.props.current.name : 'Decisions'}
            </a>
            <div className="dropdown-menu">
              {this.state.decisions.map((decision, i) => {
                // let className = 'dropdown-item';
                // if (this.props.current && decision._id === this.props.current._id) className += ' active';
                return <NavLink key={decision._id} className="dropdown-item" to={'/decisions/' + decision._id}>{decision.name}</NavLink>;
              })}
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="add" onClick={event => {
                event.preventDefault();
                const name = prompt('Decision name:');
                if (!name) return;
                API.decision.create({ name }).then(this.reload);
              }}>Add new...</a>
            </div>
          </div>}
        <div className="nav-item dropdown">
          <a className="nav-link text-white dropdown-toggle" href="/account" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Account
            </a>
          <div className="dropdown-menu">
            <a className="dropdown-item" href="add">Sign out</a>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar;
