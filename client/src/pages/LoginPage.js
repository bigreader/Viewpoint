import React from 'react';
import PageContainer from '../components/PageContainer';
import Column from '../components/Column';
import Auth from '../utils/auth';
import { Redirect } from 'react-router-dom';

class LoginPage extends React.Component {
  state = {
    username: '',
    password: '',
    mode: 'login',
    loggedIn: false,
    status: ''
  }

  handleChange = ({ target }) => this.setState({ [target.name]: target.value, confirmFailed: false });

  render = () => {
    if (this.state.loggedIn) return <Redirect to="/" />

    return (
      <PageContainer navbar={false} margins={false}>
        <Column col="md-4" className="max-height-md bg-mostly-p">

        </Column>

        <Column col="md-8 lg-6 xl-4" className="mx-auto max-height-md d-flex flex-column justify-content-center align-items-center">
          <form className="w-100 m-3">
            <input type="username" className="form-control mb-3" name="username" placeholder="Username" onChange={this.handleChange} />
            <div className="form-group d-flex mb-0">
              <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.handleChange} />
              {this.state.mode === 'create' && <input type="password" className={"form-control ml-3" + (this.state.confirmFailed? ' border-danger' : '')} name="passwordConfirm" placeholder="Confirm Password" onChange={this.handleChange} />}
            </div>
            <small className="text-secondary d-block mb-3">{this.state.status}&nbsp;</small>
            <button type="submit" className={'btn mr-3 ' + (this.state.mode === 'login'? 'btn-primary' : 'btn-outline-primary')} onClick={event => {
              event.preventDefault();
              if (this.state.mode !== 'login') return this.setState({ mode: 'login' });
              if (this.state.username.length === 0) {
                return this.setState({ status: "Enter your username" });
              }
              if (this.state.password.length === 0) {
                return this.setState({ status: "Enter your password" });
              }
              Auth.login(this.state.username, this.state.password).then(() => {
                this.setState({ loggedIn: true });
              }).catch(res => {
                this.setState({ status: "Incorrect username or password" });
              });
            }}>Sign In</button>
            <button type="button" className={'btn mr-3 ' + (this.state.mode === 'create' ? 'btn-primary' : 'btn-outline-primary')} onClick={event => {
              event.preventDefault();
              if (this.state.mode !== 'create') return this.setState({ mode: 'create' });
              if (this.state.username.length === 0) {
                return this.setState({ status: "Enter a username" });
              }
              if (this.state.password.length === 0) {
                return this.setState({ status: "Enter a password" });
              }
              if (this.state.password !== this.state.passwordConfirm) {
                return this.setState({ status: "Passwords didn't match", confirmFailed: true });
              }
              
              Auth.create(this.state.username, this.state.password).then(() => {
                Auth.login(this.state.username, this.state.password).then(() => {
                  this.setState({ loggedIn: true });
                });
              });
            }}>Create Account</button>
          </form>
        </Column>

        <script async type="text/javascript" src="/assets/zxcvbn.js"></script>
      </PageContainer>
    )
  }
}

export default LoginPage;
