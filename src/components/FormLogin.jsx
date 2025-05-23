import React, { useState, useRef, useEffect } from 'react';
import Input from "../components/input.jsx";
import ButtonLogin from "../components/ButtonLogin.jsx";
import '../styles/formLogin.css';
import { Link, useNavigate } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useForm } from 'react-hook-form';
import * as Toast from '@radix-ui/react-toast';
import { api } from '../lib/axios';
import nProgress from 'nprogress';

// const baseURL = "http://10.92.199.41:8080/usuarios/login";

function FormLogin() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isFading, setIsFading] = useState(false);
    const navigate = useNavigate();

    // Toast states
    const [open, setOpen] = useState(false);
    const [toastType, setToastType] = useState('success');
    const timerRef = useRef(0);

    useEffect(() => {
        return () => clearTimeout(timerRef.current);
    }, []);

    const showToast = (type = 'success') => {
        setToastType(type);
        setOpen(false);
        window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => {
            setOpen(true);
        }, 100);
    };

    // ...existing code...
    const onSubmit = async (data) => {
        nProgress.start()
        try {
            const response = await api.post("usuarios/login", {
                email: data.email,
                senha: data.senha,
            });
            const token = response.data;
            if (token) {
                localStorage.setItem('token', token);
                showToast('success');
                setTimeout(() => {
                    navigate("/home");
                }, 1500); // Aguarda 1.5s para mostrar o Toast antes de redirecionar
            } else {
                setToastType('error');
                showToast('error');
            }
            nProgress.done()
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            setToastType('error');
            showToast('error');
            nProgress.done()
        }
    }
    // ...existing code...

    const onError = (errors) => {
        setToastType('error');
        showToast('error');
    }

    const handleClick = (to, event) => {
        event.preventDefault();
        setIsFading(true);
        NProgress.start();
        setTimeout(() => {
            navigate(to);
            NProgress.done();
        }, 1000);
    };

    return (
        <Toast.Provider swipeDirection="right">
            <form action="#" method="post" className='form-login' onSubmit={handleSubmit(onSubmit, onError)}>
                <div>
                    <Input
                        label="Email: "
                        placeholder="Digite seu email"
                        id="email"
                        register={register("email", { required: "O campo Email é obrigatório" })} />

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
                        <Link onClick={(event) => handleClick("/cadastro", event)}>Cadastre-se</Link>
                    </span>
                </span>
            </form>
            <Toast.Root
                className={`ToastRoot ${toastType}`}
                open={open}
                onOpenChange={setOpen}
            >
                <Toast.Title className="ToastTitle">
                    {toastType === 'success' ? 'Sucesso!' : 'Erro!'}
                </Toast.Title>
                <Toast.Description className="ToastDescription">
                    {toastType === 'success'
                        ? 'Login feito com sucesso!'
                        : 'Algo está errado no seu login!'}
                </Toast.Description>
                <Toast.Close className="ToastClose">×</Toast.Close>
            </Toast.Root>
            <Toast.Viewport className="ToastViewport" />
        </Toast.Provider>
    );
}

export default FormLogin;