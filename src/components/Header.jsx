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

  const handleRegisterClick = () => {
    setIsFading(true);
    NProgress.start();
    setTimeout(() => {
      navigate('/cadastro');
      NProgress.done();
    }, 1000); // atraso em milissegundos
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

 

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
        <button className='login' onClick={handleLoginClick}>Entre</button>
        <button className='cadastro' onClick={handleRegisterClick}>Cadastre-se <GoArrowRight /></button>
      </div>
      <div className="hamburguerHeader" onClick={toggleMenu}>
        <div className="iconImg"><TfiViewList/></div>
      </div>
      <MenuDrop isOpen={isMenuOpen} handleLoginClick={handleLoginClick} />
    </header>
  );
}

export default Header;