import axios from 'axios';


//LINK BASE: https://api.themoviedb.org/3/
//LINK API: https://api.themoviedb.org/3/movie/550?api_key=fb2d3106275f3bb91465fda027eeb0b0&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;