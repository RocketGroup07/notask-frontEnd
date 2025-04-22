import React, { useState } from 'react';
import Input from "../components/input.jsx";
import ButtonLogin from "../components/ButtonLogin.jsx";
import '../styles/formLogin.css';
import { Link, useNavigate} from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';


function FormLogin() {
    const [isFading, setIsFading] = useState(false);
    const navigate = useNavigate();

    const handleClick = (path, event) => {
        event.preventDefault();
        setIsFading(true);
        NProgress.start();
        setTimeout(() => {
            navigate(path);
            NProgress.done();
        }, 1000); // atraso em milissegundos
    };

    return (
        <form action="#" method="post" className='form-login'>
            <div className='text-content'>
                <h1>Bem Vindo!</h1>
                <p>Entre com seu login e senha</p>
            </div>

            <div>
                <Input
                    label="Email: "
                    placeholder="Digite seu email"
                    id="email" />

                <Input
                    label="Senha: "
                    placeholder="Digite sua senha"
                    id="senha" />
            </div>
            <div className='link'>
                <Link onClick={(event) => handleClick("/", event)}>Esqueceu a Senha?</Link>
            </div>
            <ButtonLogin onClick={(event) => handleClick("../", event)} className="button" type="submit" value="Entrar" />
            <span className='text-content font-size'>Não possui uma conta?
                <span className='link font-size'>
                    <Link onClick={(event) => handleClick('/Cadastro', event)}> Crie uma conta</Link>
                </span>
            </span>
        </form>
    );
}

export default FormLogin;