import React from 'react';
import '../styles/global.css';
import '../styles/cadastro.css';
import Input from './input';
import ButtonLogin from './ButtonLogin';

function FormCadastro() {
    return (
        <form className="form-cadastro" action="/cadastro" method="POST">
            <h1>Faça seu cadastro!</h1>
            <p>Preencha todos os campos abaixo:</p>

            <div className="inputs">
                <Input
                    label="Nome: "
                    placeholder="Digite seu nome completo"
                    id="nome" />
                <Input
                    label="Nome de usuario: "
                    placeholder="Digite seu nome de usuario"
                    id="usuario" />
                <Input
                    label="Email: "
                    placeholder="Digite seu email"
                    id="email" />
                <Input
                    label="Senha: "
                    placeholder="Digite sua senha"
                    id="senha" />
                <Input
                    label="Confirmar senha: "
                    placeholder="Digite sua senha novamente"
                    id="confirmarSenha" />
            </div>
        </form>
    );
}

export default FormCadastro;