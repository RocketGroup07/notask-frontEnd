import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; 
import Login from '../src/pages/login';
import TesteApiPage from './pages/TesteApiPage';
import HomeTarefas from './pages/HomeTarefas';
import UserInfo from './pages/UserInfo';
import ConfigUser from './pages/ConfigUser';
import Cadastro from './pages/Cadastro'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/cadastro' element={<Cadastro/>} />
        <Route path='/testeapi'element={<TesteApiPage/>}  />
        <Route path='/home' element={<HomeTarefas/>}  />
        <Route path='/usuario' element={<UserInfo/>}  />
        <Route path='/configuracao' element={<ConfigUser/>}/>
      </Routes>
    </Router>
  );
}

export default App;
