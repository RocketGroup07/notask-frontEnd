import FormCadastro from "./FormCadastro"
import NavButton from "./NavButton";
import { GoArrowLeft } from "react-icons/go";

function PaginaFormCadastro() {
  return (

    <div className='contFormLoginD'>
      <div className="direitaLogin">
        <div className="contFormLoginDe">
          <div className="buttonLoginContent" style={{width: "80%"}}>
            <NavButton to="/"
              style={{
                background: "none",
                border: "none",
                color: "#333",
                fontSize: "2rem",
                cursor: "pointer",
                padding: "8px",
              }}>
              <GoArrowLeft />
            </NavButton>
          </div>
          <div className="titleLogin">
            <h1>Cadastro</h1>
          </div>
          <div className="contFormLoginDef">
            <div className="FormLoginD">
              <FormCadastro />
            </div>
          </div>
        </div>
      </div>
      <div className="esquerdaLogin">
        <div className="imgLoginFundo" style={{height: "100%"}}>
          <img src="../img/telaCadastro.png" alt="" style={{
            borderRadius: "25px 0 0 25px",
            height: "100%"
          }}/>
        </div>
      </div>
    </div >
  )
}

export default PaginaFormCadastro
