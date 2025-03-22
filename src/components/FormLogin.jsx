import React from 'react'
import Input from "../components/Input.jsx"
import ButtonLogin from "../components/ButtonLogin.jsx"
import '../styles/formLogin.css'

function FormLogin() {
    return (
        <form action="#" method="post">
            <div className='text-content'>  
                <h1>Bem Vindo!</h1>
                <p>Entre com seu login e senha</p>
            </div>

            <div className='inputs'>
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
            <span className='text-content'>Não possui uma conta? <a href="">Crie uma!</a></span>
        </form>
    )
}

export default FormLogin
