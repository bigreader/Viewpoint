import Axios from 'axios';

export default {
  login: function(username, password) {
    Axios.post('/login', { username, password });
  },
  create: function(username, password) {
    Axios.post('/signup', { username, password })
  }
}