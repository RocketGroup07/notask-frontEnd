import React from 'react'
import Input from "../components/input.jsx"
import ButtonLogin from "../components/ButtonLogin.jsx"
import '../styles/formLogin.css'

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
                <a href="#">Esqueceu a senha?</a>
            </div>
            <ButtonLogin className="button" type="submit" value="Entrar" />
            <span className='text-content'>Não possui uma conta?
                <span className='link'>
                    <a href="./pages/Cadastro.jsx">Crie uma!</a>
                </span>
            </span>
        </form>
    )
}

export default FormLogin
