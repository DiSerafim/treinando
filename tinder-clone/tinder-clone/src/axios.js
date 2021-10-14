import axios from 'axios';

const instance = axios.create({
  baseURL: "https://tinde-bkend.herokuapp.com",
});

export default instance;
