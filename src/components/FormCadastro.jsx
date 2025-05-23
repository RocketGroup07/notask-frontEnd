import '../styles/global.css';
import '../styles/cadastro.css';
import Input from './input';
import ButtonLogin from './ButtonLogin';
import {useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as React from 'react';
import * as Toast from '@radix-ui/react-toast';
import { api } from '../lib/axios';
import nProgress from 'nprogress';


function FormCadastro() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const senha = watch("senha");
    const [open, setOpen] = React.useState(false);
    const [toastMessage, setToastMessage] = React.useState('');
    const [toastType, setToastType] = React.useState('success');
    const timerRef = React.useRef(0);

    React.useEffect(() => {
        return () => clearTimeout(timerRef.current);
    }, []);

    const showToast = (message, type = 'success') => {
        setToastMessage(message);
        setToastType(type);
        setOpen(false);
        window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => {
            setOpen(true);
        }, 100);
    };

    const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
            nProgress.start()
            console.log("dados", data)
            await api.post("usuarios/", {
                nome: data.nome,
                username: data.userName,
                email: data.email,
                senha: data.senha,
            });
            showToast('Cadastro realizado com sucesso!', 'success');
            setTimeout(() => {
                navigate("/login");
            }, 1500);
            nProgress.done()
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            showToast('Há algo de errado no seu cadastro!', 'error');
            nProgress.done()
        }
    };

    const onError = (errors) => {
        if (errors.confirmarSenha) {
            showToast(errors.confirmarSenha.message, 'error');
        } else if (errors.nome) {
            showToast(errors.nome.message, 'error');
        } else if (errors.userName) {
            showToast(errors.userName.message, 'error');
        } else if (errors.email) {
            showToast(errors.email.message, 'error');
        } else if (errors.senha) {
            showToast(errors.senha.message, 'error');
        } else {
            showToast('Há algo de errado no seu cadastro!', 'error');
        }
    };

    return (
        <>
            <Toast.Provider swipeDirection="right">
                <form className="form-cadastro" onSubmit={handleSubmit(onSubmit, onError)}>
                    <div>
                        <div className="flex">
                            <Input
                                label="Nome: "
                                placeholder="Digite seu nome completo"
                                id="nome"
                                register={register("nome", { required: "O campo Nome é obrigatório" })}
                            />
                            <Input
                                label="Nome de usuário: "
                                placeholder="Digite seu usuário"
                                id="usuario"
                                register={register("userName", { required: "O campo Nome de usuário é obrigatório" })}
                            />
                        </div>
                        <div className="flex">
                            <Input
                                label="Email: "
                                placeholder="Digite seu email"
                                id="email"
                                register={register("email", { 
                                required: "O campo Email é obrigatório" ,
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Digite um email válido"
                                }
                            })}
                            />
                            <Input
                                type="password"
                                label="Senha: "
                                placeholder="Digite sua senha"
                                id="senha"
                                register={register("senha", { 
                                    required: "O campo Senha é obrigatório",
                                    minLength: {
                                        value: 6,
                                        message: "A senha precisa ter no minímo 6 caracteres"
                                    }

                                 })}
                            />
                        </div>
                        <Input
                            type="password"
                            label="Confirmar senha: "
                            placeholder="Digite sua senha novamente"
                            id="confirmarSenha"
                            register={register("confirmarSenha", {
                                required: "O campo Confirmar senha é obrigatório",
                                validate: (value) =>
                                    value === senha || "As senhas não coincidem",
                            })}
                        />

                    </div>
                    <ButtonLogin className="button" type="submit" value="Cadastrar" />
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
                        {toastMessage}
                    </Toast.Description>
                    <Toast.Close className="ToastClose">×</Toast.Close>
                </Toast.Root>
                <Toast.Viewport className="ToastViewport" />
            </Toast.Provider>
        </>
    );
}

export default FormCadastro;