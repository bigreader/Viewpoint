import React from 'react';
import Cell from '../Cell';
import API from '../../utils/api';
// import './MoodCell.css';

class MoodCell extends React.Component {
  state = {
    set: this.props.mood.set,
    val: this.props.mood.val
  }

  render() {
    return (
      <Cell
        title={this.props.mood[this.props.titleSide].name}
        bg={this.state.set ? 'mood-' + this.state.val : 'unknown'}
        live
        onClick={() => {
          const newVal = parseInt(prompt('Enter a new mood'));
          let data = {
            set: false,
            val: null
          }
          if (newVal >= 1 && newVal <= 5) {
            data = {
              set: true,
              val: newVal
            }
          }
          this.setState(data);
          API.mood.update(this.props.decisionId, this.props.mood._id, data);
        }} />
    );
  }
}

export default MoodCell;
