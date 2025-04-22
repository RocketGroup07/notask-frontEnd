import React from 'react';
import { GoArrowRight } from "react-icons/go"; // Adicionando a importação do GoArrowRight
import { CgHome, CgLayoutGridSmall, CgAdd } from "react-icons/cg";

function MenuDrop({ isOpen, handleLoginClick }) {
  return (
    <div className={`menu-drop ${isOpen ? 'open' : ''}`}>
      <div className="abaLinksMobile">
        <a href="#"><div className="iconHeaderMobile"><CgHome/></div> Home</a>
      </div>
      <div className="abaLinksMobile"><a href="#"><div className="iconHeaderMobile"><CgLayoutGridSmall /></div>Funcionalidades</a></div>
      <div className="abaLinksMobile"><a href="#"><div className="iconHeaderMobile"><CgAdd/></div>Novidades</a></div>
      
      
      <div className="buttons">
        <button className='login' onClick={handleLoginClick}>Entre</button>
        <button className='cadastro' onClick={handleLoginClick}>Cadastre-se <GoArrowRight /></button>
      </div>
    </div>
  );
}

export default MenuDrop;
