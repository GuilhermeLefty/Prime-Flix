import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from './pages/Home';
import Filmes from './pages/Filmes';
import Error from './pages/Error';

import Header from './components/Header';

function RoutesApp(){
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/Filmes/:id" element={<Filmes/>} />
            
                <Route path='*' element={ <Error/> } />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;
