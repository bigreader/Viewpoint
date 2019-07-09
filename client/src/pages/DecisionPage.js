import React from 'react';
import Cell from '../components/Cell';
import CellList from '../components/CellList';
import Navbar from '../components/Navbar';
import Slice from '../components/Slice';
import Calc from '../utils/calc';
import Decision from '../utils/decision';

class DecisionPage extends React.Component {
  state = {
    decision: null,
    selected: {
      from: '',
      id: ''
    },
    slice: {}
  }

  componentDidMount() {
    this.reloadDecision();
  }

  componentDidUpdate() {
    if (!this.state.decision || this.props.id !== this.state.decision.id) {
      this.reloadDecision();
    }
  }
  
  reloadDecision() {
    const decision = new Decision(this.props.id);
    decision.onRefresh(() => this.forceUpdate());
    decision.onChange(() => this.forceUpdate());
    this.setState({
      decision,
      selected: {
        from: '',
        id: ''
      }
    });
  }

  selectSlice = (from, id) => {
    this.setState({
      selected: { from, id },
      slice: this.state.decision[from].find(doc => doc._id === id)
    });
  }

  render() {
    if (!this.state.decision || !this.state.decision.data) {
      return (
        <>
          <Navbar showDecisions={true} />
          <p>Loading...</p>
        </>
      )
    }

    return (
      <>
        <Navbar showDecisions={true} current={this.state.decision} bg={Calc.moods.bg(this.state.decision.moods)} />

        <div className="container-fluid my-3 my-xl-5 px-xl-5">
          <div className="row">
            <div className="col-md-5 col-lg-3">
              <CellList list="Options" decision={this.state.decision} api={this.state.decision.option}
                selectFrom="options" onSelect={this.selectSlice} selected={this.state.selected}
                cells={this.state.decision.options.map(option => {
                  const moods = this.state.decision.moods.filter(mood => mood.option._id === option._id);
                  return {
                    id: option._id,
                    title: option.name,
                    status: Calc.moods.summary(moods),
                    bg: Calc.moods.bg(moods)
                  }
                })} />
              <hr />
              <CellList list="Factors" decision={this.state.decision} api={this.state.decision.factor}
                selectFrom="factors" onSelect={this.selectSlice} selected={this.state.selected}
                cells={this.state.decision.factors.map(factor => {
                  const moods = this.state.decision.moods.filter(mood => mood.factor._id === factor._id);
                  return {
                    id: factor._id,
                    title: factor.name,
                    status: Calc.moods.summary(moods),
                    bg: Calc.moods.bg(moods)
                  }
                })} />
            </div>

            <div className="col-md-7 col-lg-5 col-xl-6 px-xl-5">
              <Slice decision={this.state.decision} selected={this.state.selected} onChangeMood={(id, data) => {
                this.state.decision.moods.find(mood => mood._id === id).assign(data)
              }}/>
            </div>

            <div className="col-lg-4 col-xl-3">
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
}

export default DecisionPage;
