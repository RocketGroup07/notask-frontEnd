import React, { useState } from 'react';
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from 'react-router-dom'; // Importado useNavigate
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { TfiViewList } from "react-icons/tfi";
import MenuDrop from './menuDrop';

NProgress.configure({ showSpinner: false, speed: 500 });

function Header() {
  const navigate = useNavigate(); // useNavigate para obter a função de navegação
  const [isFading, setIsFading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLoginClick = () => {
    setIsFading(true);
    NProgress.start();
    setTimeout(() => {
      navigate('/login');
      NProgress.done();
    }, 1000); // atraso em milissegundos
  };

<<<<<<< HEAD
  const handleCadastroClick = () => {
    setIsFading(true);
    NProgress.start();
    setTimeout(() => {
      navigate('/cadastro'); // Navega para a rota de cadastro
      NProgress.done();
    }, 1000); // atraso em milissegundos
  };
=======
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

 
>>>>>>> a4f70a9 (todas as mudanças)

  return (
    <header className={`header ${isFading ? 'fade-out' : ''} sticky`}>
      <div className="imgLogo">
        <img src="./img/notaskLogoBranco.png" alt="logoImg" />
      </div>
      <div className='links' >  
        <a href="#">O projeto</a>
        <a href="#">Funcionalidades</a>
        <a href="#">Novidades</a>
      </div>
      <div className="buttons">
<<<<<<< HEAD
        <button className='login' onClick={handleLoginClick}>Entre</button> {/* Use a função handleLoginClick */}
        <button className='cadastro' onClick={handleCadastroClick}>Cadastre-se <GoArrowRight /></button>
=======
        <button className='login' onClick={handleLoginClick}>Entre</button>
        <button className='cadastro' onClick={handleLoginClick}>Cadastre-se <GoArrowRight /></button>
>>>>>>> a4f70a9 (todas as mudanças)
      </div>
      <div className="hamburguerHeader" onClick={toggleMenu}>
        <div className="iconImg"><TfiViewList/></div>
      </div>
      <MenuDrop isOpen={isMenuOpen} handleLoginClick={handleLoginClick} />
    </header>
  );
}

export default Header;