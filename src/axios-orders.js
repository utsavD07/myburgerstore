import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-myburger-07.firebaseio.com/'
});

export default instance;