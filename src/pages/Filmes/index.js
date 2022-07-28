import { useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './filme.css';
import api from '../../services/api';

function Filmes(){
    const {id} = useParams();
    const [filme,setFilme] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // EFFECT PARA CARREGAR O FILME, SELECIONANDO DIRETO NA API

    useEffect(()=>{
        
        async function loadFilme(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key: "fb2d3106275f3bb91465fda027eeb0b0",
                    language: "pt-BR",
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                console.log("Failed to load movie")
                navigate("/", { replace: true});
                return;
            })
        }

        loadFilme();

        return () =>{
            console.log('component desmount')
        }
    },[navigate, id])

    // FUNÇÃO PARA SALVAR O FILME NA LISTA DE FAVORITOS

    function salvarFilme(){
        const minhaLista = localStorage.getItem('@favoritos')

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some( (filmeFav)=>filmeFav.id === filme.id)

        if(hasFilme){
            alert('Esse filme já está na lista!');
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('@favoritos', JSON.stringify(filmesSalvos))
        alert('Filme salvo com sucesso!')
    }

    // AWAITING REQUEST DA API 

    if(loading){
        return(
            <div className='filme-info'>
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    // RETORNO DAS INFORMAÇÕES DO REQUEST NA PAGINA 

    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span><br/>
            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target='blank' rel='external' href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filmes;