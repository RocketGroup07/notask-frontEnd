import React, { useState } from "react";
import Input from "../components/input.jsx";
import ButtonLogin from "../components/ButtonLogin.jsx";
import "../styles/formLogin.css";
import { Link, useNavigate } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useForm } from "react-hook-form";
import { api } from "../lib/axios.js";
import nProgress from "nprogress";

function FormLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await api.post("usuarios/login", {
        email: data.email,
        senha: data.senha,
      });
      const token = response.data;
      console.log("deu certo", data);

      if (token) {
        localStorage.setItem("token", token); // Salva o token
        nProgress.start();
        setTimeout(() => {
          navigate("/home");
          nProgress.done();
        }, 1000);
      } else {
        alert("Token não recebido!");
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      alert("Erro ao logar usuário. Tente novamente.");
    }
  };

  const onError = (errors) => {
    if (errors.email) return alert(errors.email.message);
    if (errors.senha) return alert(errors.senha.message);
  };

  // Função para navegação
  const handleClick = (to, event) => {
    event.preventDefault();
    NProgress.start();
    setTimeout(() => {
      navigate(to);
      NProgress.done();
    }, 1000);
  };

  return (
    <form
      action="#"
      method="post"
      className="form-login"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <div>
        <Input
          label="Email: "
          placeholder="Digite seu email"
          id="email"
          register={register("email", {
            required: "O campo Senha é obrigatório",
          })}
        />

        <Input
          label="Senha: "
          placeholder="Digite sua senha"
          id="senha"
          type={"password"}
          register={register("senha", {
            required: "O campo Senha é obrigatório",
          })}
        />
      </div>
      <div className="link">
        <Link onClick={(event) => handleClick("/", event)}>
          Esqueceu a Senha?
        </Link>
      </div>
      <ButtonLogin className="button" type="submit" value="Entrar" />
      <span className="text-content font-size">
        Não possui uma conta?
        <span className="link font-size">
          <Link onClick={(event) => handleClick("/cadastro", event)}>
            Criar conta
          </Link>
        </span>
      </span>
    </form>
  );
}

export default FormLogin;
