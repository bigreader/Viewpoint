import React from 'react';
import Cell from '../components/Cell';
import CellList from '../components/CellList';
import Navbar from '../components/Navbar';
import Slice from '../components/Slice';

function Page() {
  return (
    <>
      <Navbar />

      <div className="container-fluid my-3 my-lg-5 px-lg-5">
        <div className="row">
          <div className="col-lg-3">
            <CellList list="Options">
              <Cell live title="Alaska" status="Mixed" bg="grad-3" />
              <Cell live active title="Iceland" status="Mostly Negative" bg="grad-2" />
              <Cell live title="Yellowstone" status="Very Positive" bg="grad-5" />
            </CellList>
            <hr />
            <CellList list="Factors">
              <Cell live title="Price" status="2 good options" bg="grad-4" />
              <Cell live title="Scenery" status="All great options" bg="grad-5" />
              <Cell live title="Food" status="1 good option" bg="grad-2" />
              <Cell live title="Schedule" status="2 decent options" bg="grad-3" />
            </CellList>
          </div>

          <div className="col-lg-6 px-lg-5">
            <Slice title="Iceland" />
          </div>

          <div class="col-lg-3">
            <CellList list="Insights" editable={false}>
              <Cell title="Schedule" bg="mostly-p">
                It's close, but <b>Alaska</b> looks like the best choice.
              </Cell>
              <Cell title="Yellowstone" bg="mostly-n">
                You've got better options than this one in each of your factors.
              </Cell>
              <Cell title="Scenery" bg="grad-5">
                Every option looks good for this factor.
              </Cell>
              <Cell title="Iceland &amp; Alaska" bg="grad-3">
                You feel similar ways about both of these options. Adding more factors might help you decide.
              </Cell>
              <Cell title="Alaska" bg="prob-p">
                You haven't added feelings on <b>Schedule</b> yet.
              </Cell>
              <Cell title="42 days left" status="July 31, 2019" bg="grad-1" />
            </CellList>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
