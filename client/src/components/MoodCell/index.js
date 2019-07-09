import React from 'react';
import Cell from '../Cell';
// import API from '../../utils/api';
// import './MoodCell.css';

class MoodCell extends React.Component {
  
  render() {
    return (
      <Cell
        title={this.props.mood[this.props.titleSide].name}
        bg={this.props.mood.set ? 'mood-' + this.props.mood.val : 'unknown'}
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
          this.props.decision.apis.mood.update(this.props.mood._id, data);
        }} />
    );
  }
}

export default MoodCell;
