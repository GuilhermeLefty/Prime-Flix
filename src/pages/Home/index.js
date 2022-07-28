import {useEffect, useState} from 'react';
import api from '../../services/api';
import { Link} from 'react-router-dom';
import './home.css';


//https://api.themoviedb.org/3/movie/550?api_key=fb2d3106275f3bb91465fda027eeb0b0&language=pt-BR

function Home(){
    const [filmes,setFilmes] = useState([]);
    const [loading, setLoading] = useState([true]);


    useEffect(() =>{

        async function loadFilmes(){
            const response = await api.get("movie/now_playing", {
                params:{
                    api_key: "fb2d3106275f3bb91465fda027eeb0b0",
                    language: "pt-BR",
                    page: 1
                }
            })

            //console.log(response.data.results.slice(0,10));
            setFilmes(response.data.results.slice(0,10))
            setLoading(false);
        }

        loadFilmes();

    },[])

    if(loading){
        return(
            <dic className='loading'>
                <h2>Carregando filmes...</h2>
            </dic>
        )
    }




    return(
        <div className="container">
           <div className="lista-filmes">
            {filmes.map((filme)=>{
                return(
                    <article key={filme.id}>
                        <strong>{filme.title}</strong>
                        <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                        <Link to={`/Filmes/${filme.id}`}>Acessar</Link>
                    </article>
                ) 
            })}
           </div>
        </div>
    )
}

export default Home;