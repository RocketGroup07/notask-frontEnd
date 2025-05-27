import { GoArrowRight } from "react-icons/go"; // Adicionando a importação do GoArrowRight
import { CgHome, CgLayoutGridSmall, CgAdd } from "react-icons/cg";
import NavButton from './NavButton';

function MenuDrop({ isOpen }) {
  return (
    <div className={`menu-drop ${isOpen ? 'open' : ''}`}>
      <div className="abaLinksMobile">
        <a href="#"><div className="iconHeaderMobile"><CgHome/></div> Home</a>
      </div>
      <div className="abaLinksMobile"><a href="#"><div className="iconHeaderMobile"><CgLayoutGridSmall /></div>Funcionalidades</a></div>
      <div className="abaLinksMobile"><a href="#"><div className="iconHeaderMobile"><CgAdd/></div>Novidades</a></div>
      
      
      <div className="buttons">
        <NavButton className="login" to="/login">Entre</NavButton>
        <NavButton className="cadastro" to="/cadastro">
        Cadastre-se <GoArrowRight />
      </NavButton>
      </div>
    </div>
  );
}

export default MenuDrop;
