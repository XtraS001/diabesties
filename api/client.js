import axios from 'axios';

export default axios.create({
  // baseURL: 'http://yourIPGoesHere:3000/api',
  baseURL: 'http://localhost:5000/api/',
});