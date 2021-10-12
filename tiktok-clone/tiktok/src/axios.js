import axios from 'axios';

const instance = axios.create({
  baseURL: "https://tiktock-clone.herokuapp.com/"
});

export default instance;
