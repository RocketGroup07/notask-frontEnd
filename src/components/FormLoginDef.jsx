import '../styles/FormLoginDef.css';
import '../styles/formLogin.css';
import 'nprogress/nprogress.css';
import FormLogin from './FormLogin.jsx';
import NavButton from './NavButton.jsx';
import { GoArrowLeft } from 'react-icons/go';

function FormLoginDef() {
    return (
        <div className='contFormLoginD'>


            <div className="esquerdaLogin">
                <div className="imgLoginFundo">
                    <img src="../img/fundoLogin.png" alt="" />
                </div>
            </div>
            <div className="direitaLogin">
                <div className="contFormLoginDe">
                    <div className="buttonLoginContent" style={{ width: "80%" }}>
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
                        <h1>Login</h1>
                    </div>
                    <div className="contFormLoginDef">
                        <div className="FormLoginD">
                            <FormLogin />
                        </div>
                        <div className="buttonLogin">

                        </div>
                    </div>




                </div>


            </div>

        </div>
    )
}

export default FormLoginDef
