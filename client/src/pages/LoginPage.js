import React from 'react';
import PageContainer from '../components/PageContainer';
import Auth from '../utils/auth';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

class LoginPage extends React.Component {
  state = {
    username: '',
    password: '',
    loggedIn: false
  }

  handleChange = ({ target }) => this.setState({ [target.name]: target.value });

  render = () => {
    if (this.state.loggedIn) return <Redirect to="/" />
    
    return (
      <PageContainer>
        <form className="d-flex flex-column">
          <input type="username" name="username" onChange={this.handleChange} />
          <input type="password" name="password" onChange={this.handleChange} />
          <button type="submit" onClick={event => {
            event.preventDefault();
            Auth.login(this.state.username, this.state.password).then(() => {
              this.setState({ loggedIn: true });
            });
          }}>Sign In</button>
          <button type="button" onClick={event => {
            event.preventDefault();
            Auth.create(this.state.username, this.state.password);
          }}>Create Account</button>
        </form>
        {JSON.stringify(this.state.user)}
      </PageContainer>
    )
  }
}

export default LoginPage;
