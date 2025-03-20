import React, { useState } from 'react';
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from 'react-router-dom'; // Importe useNavigate

function Header() {
  const navigate = useNavigate(); // Use useNavigate para obter a função de navegação
  const [isFading, setIsFading] = useState(false);

  const handleLoginClick = () => {
    setIsFading(true);
    setTimeout(() => {
      navigate('/login');
    }, 1000); // Adicione um atraso de 1 segundo (1000 milissegundos)
  };

  return (
    <header className={isFading ? 'fade-out' : ''}>
      <div className="imgLogo">
        <img src="./img/notaskLogoBranco.png" alt="logoImg" />
      </div>
      <div className="links">
        <a href="#">O projeto</a>
        <a href="#">Funcionalidades</a>
        <a href="#">Novidades</a>
      </div>
      <div className="buttons">
        <button className='login' onClick={handleLoginClick}>Entre</button> {/* Use a função handleLoginClick */}
        <button className='cadastro'>Cadastre-se <GoArrowRight /></button>
      </div>
    </header>
  );
}

export default Header;