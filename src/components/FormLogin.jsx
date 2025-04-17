import React from 'react'
import Input from "../components/input.jsx"
import ButtonLogin from "../components/ButtonLogin.jsx"
import '../styles/formLogin.css'
import { Link } from 'react-router-dom'

function FormLogin() {
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
                <Link href={"/Home"}>Esqueceu a Senha?</Link>
            </div>
            <ButtonLogin className="button" type="submit" value="Entrar" />
            <span className='text-content'>Não possui uma conta?
                <span className='link'>
                    <Link to={"/Cadastro"}> Crie uma conta</Link>
                </span>
            </span>
        </form>
    )
}

export default FormLogin
