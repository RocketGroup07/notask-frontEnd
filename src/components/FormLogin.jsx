import React, { useState } from 'react';
import Input from "../components/input.jsx";
import ButtonLogin from "../components/ButtonLogin.jsx";
import '../styles/formLogin.css';
import { Link, useNavigate } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const baseURL = "http://10.92.199.41:8080/usuarios/login";



function FormLogin() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(baseURL, {
                email: data.email,
                senha: data.senha,
            });
            const token = response.data;
            console.log("deu certo", data);
            if (token) {
            localStorage.setItem('token', token); // Salva o token
            // Redirecione ou faça outra ação aqui
        } else {
            alert("Token não recebido!");
        }
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            alert("Erro ao cadastrar usuário. Tente novamente.");
        }
    }

    const onError = (errors) => {
        if (errors.email) return alert(errors.email.message);
        if (errors.senha) return alert(errors.senha.message);
    }


    const [isFading, setIsFading] = useState(false);
    const navigate = useNavigate();


    return (
        <form action="#" method="post" className='form-login' onSubmit={handleSubmit(onSubmit, onError)}>
            <div>
                <Input
                    label="Email: "
                    placeholder="Digite seu email"
                    id="email" 
                    register={register("email", { required: "O campo Senha é obrigatório" })}/>

                <Input
                    label="Senha: "
                    placeholder="Digite sua senha"
                    id="senha"
                    type={"password"}
                    register={register("senha", { required: "O campo Senha é obrigatório" })} />
            </div>
            <div className='link'>
                <Link onClick={(event) => handleClick("/", event)}>Esqueceu a Senha?</Link>
            </div>
            <ButtonLogin className="button" type="submit" value="Entrar" />
            <span className='text-content font-size'>Não possui uma conta?
                <span className='link font-size'>
                    <Link onClick={(event) => handleClick('/Cadastro', event)}> Crie uma conta</Link>
                </span>
            </span>
        </form>
    );
}

export default FormLogin;