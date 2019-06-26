import React from 'react';
import EditHead from '../EditHead';
import Cell from '../Cell';
import CellList from '../CellList';

export default (props) => (
  <>
    <EditHead>{props.title}</EditHead>
    <img class="img-fluid rounded my-3" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Gullfoss_from_the_Air.jpg/1024px-Gullfoss_from_the_Air.jpg" alt={props.title} />
    <CellList list="moods" head={false}>
      <Cell title="Price" bg="mood-1" />
      <Cell title="Scenery" bg="mood-5" />
      <Cell title="Food" bg="mood-2" />
      <Cell title="Schedule" bg="mood-3" />
    </CellList>
  </>
);
