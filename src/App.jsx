import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
<<<<<<< HEAD
import Home from './pages/Home'; // Crie este componente se necessário
import Login from './pages/login';
import Cadastro from './pages/Cadastro'; // Crie este componente se necessário
=======
import Home from './pages/Home'; 
import Login from '../src/pages/login';
import TesteApiPage from './pages/TesteApiPage';
import HomeTarefas from './pages/HomeTarefas';
import UserInfo from './pages/UserInfo';
import ConfigUser from './pages/ConfigUser';

>>>>>>> a4f70a9 (todas as mudanças)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
<<<<<<< HEAD
        <Route path="/cadastro" element={<Cadastro />} />
=======
        <Route path='/testeapi'element={<TesteApiPage/>}  />
        <Route path='/home' element={<HomeTarefas/>}  />
        <Route path='/usuario' element={<UserInfo/>}  />
        <Route path='/configuracao' element={<ConfigUser/>}/>
>>>>>>> a4f70a9 (todas as mudanças)
      </Routes>
    </Router>
  );
}

export default App;
