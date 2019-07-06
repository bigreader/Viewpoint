import React from 'react';
import PageContainer from '../components/PageContainer';
import Column from '../components/Column';
import CellList from '../components/CellList';
import API from '../utils/api';

class UserPage extends React.Component {
  state = {
    username: '',
    decisions: []
  }

  componentDidMount = () => {
    API.user.me().then(res => {
      this.setState({ username: res.data.username });

      API.decision.list().then(res => {
        this.setState({ decisions: res.data });
      })
    })
  }

  render = () => (
    <PageContainer>
      <Column col="md-6 lg-4" className="text-center d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
        <img src="/img/avatar.png" alt="avatar" className="rounded-circle w-50 h-auto mb-4" />
        <p className="i mb-0">Welcome,</p>
        <h2 className="text-center">{this.state.username || 'Anonymous'}</h2>
        <p className="text-secondary">6 decisions &mdash; 126 feelings</p>
        <button className="btn btn-sm btn-outline-secondary px-3">Settings</button>
      </Column>
      <Column col="md-6 lg-8">
        <CellList list="Decisions"
          cells={this.state.decisions.map(decision => {
            return {
              id: decision._id,
              title: decision.name
            }
          })} />
      </Column>
    </PageContainer>
  )
}

export default UserPage;
