import API from './api';
// import Calc from './calc';

export default class Decision {

  data = null;
  id = '';
  name = 'Unloaded Decision';
  options = [];
  factors = [];
  moods = [];

  constructor(input) {
    if (typeof input === 'string') {
      this.id = input;
      this.refresh();
    } else {
      this.loadData(input);
    }
  }

  refresh = () => {
    API.decision.find(this.id).then(res => {
      console.log('refreshed decision', res.data);
      this.loadData(res.data);
      this.refreshCalls.forEach(call => call());
    });
  }

  loadData = (data) => {
    this.data = data;
    this.id = data._id;
    this.name = data.name;
    this.options = data.options;
    this.factors = data.factors;
    this.moods = data.moods;
  }


  create = (list, api, data) => {
    console.log('creating', data);
    if (!list) return;
    return api.create(this.id, data).then(this.refresh);
  }

  update = (list, api, id, data) => {
    console.log('updating ' + id, data);

    if (!list) return;

    const item = list.find(item => item._id === id);
    if (!item) throw new Error('Unable to find decision child with id ' + id);

    item.assign(data);
    this.changeCalls.forEach(call => call());
    return api.update(this.id, id, data);
  }

  delete = (list, api, id) => {
    console.log('deleting ' + id);

    if (!list) return;

    const item = list.find(item => item._id === id);
    if (!item) throw new Error('Unable to find decision child with id ' + id);

    return api.delete(this.id, id).then(this.refresh);
  }

  option = {
    create: (data) => this.create(this.options, API.option, data),
    update: (id, data) => this.update(this.options, API.option, id, data),
    delete: (id) => this.delete(this.options, API.option, id)
  }

  factor = {
    create: (data) => this.create(this.factors, API.factor, data),
    update: (id, data) => this.update(this.factors, API.factor, id, data),
    delete: (id) => this.delete(this.factors, API.factor, id)
  }

  mood = {
    update: (id, data) => this.update(this.moods, API.mood, id, data)
  }


  refreshCalls = [];
  onRefresh(call) {
    this.refreshCalls.push(call);
  }

  offRefresh(call) {
    this.refreshCalls.splice(this.refreshCalls.findIndex(call), 1);
  }

  changeCalls = [];
  onChange(call) {
    this.changeCalls.push(call);
  }

  offChange(call) {
    this.changeCalls.splice(this.changeCalls.findIndex(call), 1);
  }

}
