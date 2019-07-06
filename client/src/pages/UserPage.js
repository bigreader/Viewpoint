import React from 'react';
import PageContainer from '../components/PageContainer';
import Column from '../components/Column';
import CellList from '../components/CellList';

class UserPage extends React.Component {
  state = {
    username: ''
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
        <CellList list="Decisions"/>
      </Column>
    </PageContainer>
  )
}

export default UserPage;
