import React from 'react';
import Cell from '../Cell';
import EditHead from '../EditHead';
import CellAdd from '../CellAdd';
import './CellList.css';

class CellList extends React.Component {
  state = {
    editing: false
  }

  isActive = (id) => {
    return this.props.selectFrom === this.props.selected.from && id === this.props.selected.id
  }

  handleEdit = () => this.setState({ editing: !this.state.editing });

  render() {
    return (
      <>
        {this.props.head === false ? null : <EditHead editable={this.props.editable} editing={this.state.editing} onEdit={this.handleEdit}>{this.props.list}</EditHead>}
        <ul id={'list-' + this.props.list.toLowerCase()} className={'cell-list' + (this.props.grid ? ' cell-grid' : '')}>
          {!this.props.cells ? this.props.children : this.props.cells.map(cell => (
            <Cell
              key={cell.id}
              live={this.props.selectFrom}
              active={this.props.selectFrom && this.isActive(cell.id)}
              title={cell.title}
              status={cell.status}
              bg={cell.bg}
              editing={this.state.editing}
              onClick={() => this.props.onSelect(this.props.selectFrom, cell.id)}
              onDelete={() => {
                this.props.api.delete(null, cell.id).then(this.props.onChange)
              }}>
              {cell.body}
            </Cell>
          ))}
          {(this.state.editing || (this.props.api && this.props.cells && this.props.cells.length === 0))
            && <CellAdd
              type={this.props.list.toLowerCase().replace(/s$/, '')}
              onCreate={data => this.props.api.create(null, data).then(() => {
                this.props.onChange();
                this.setState({ editing: true });
              })} />}
        </ul>
      </>
    )
  }
}

export default CellList;
