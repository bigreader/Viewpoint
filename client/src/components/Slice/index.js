import React from 'react';
import EditHead from '../EditHead';
import MoodList from '../MoodList';

export default ({ decision, selected, ...props }) => {
  if (!decision || !selected.id) {
    return (
      <>
        <EditHead editable={false}>{decision.name}</EditHead>
        <i className="ml-3">Select an option or factor to start.</i>
      </>
    )
  }

  const slice = decision[selected.from].find(slice => slice._id === selected.id);
  const searchKey = selected.from.replace(/s$/, ''); //depluralize collection key, eww
  const moods = decision.moods.filter(mood => mood[searchKey]._id === selected.id);

  return (
    <>
      <EditHead>{slice.name}</EditHead>
      {slice.img && <img className="img-fluid rounded my-3" src={slice.img} alt={decision.title} />}
      <MoodList decision={decision} side={searchKey} moods={moods} onMoodChange={props.onMoodChange}/>
    </>
  )
}
