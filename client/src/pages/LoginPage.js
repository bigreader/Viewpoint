import React from 'react';
import PageContainer from '../components/PageContainer';
import Auth from '../utils/auth';

class LoginPage extends React.Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = ({ target }) => this.setState({ [target.name]: target.value });

  render = () => (
    <PageContainer>
      <form className="d-flex flex-column">
        <input type="username" name="username" onChange={this.handleChange} />
        <input type="password" name="password" onChange={this.handleChange} />
        <button type="submit" onClick={event => {
          event.preventDefault();
          Auth.login(this.state.username, this.state.password);
        }}>Sign In</button>
        <button type="button" onClick={event => {
          event.preventDefault();
          Auth.create(this.state.username, this.state.password);
        }}>Create Account</button>
      </form>
    </PageContainer>
  );
}

export default LoginPage;
