import React from 'react';
import MoodCell from '../MoodCell';
// import './MoodList.css';

class MoodList extends React.Component {
  state = {
    editing: false
  }

  render() {
    const opposingSide = this.props.side === 'option' ? 'factor' : 'option';
    return (
      <ul className="cell-list">
        {this.props.moods && this.props.moods.map(mood => (
          <MoodCell key={mood._id} mood={mood} titleSide={opposingSide} decision={this.props.decision} />
        ))}
      </ul>
    )
  }
}

export default MoodList;
