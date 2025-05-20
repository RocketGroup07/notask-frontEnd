import '../styles/global.css';
import '../styles/cadastro.css';
import Input from './input';
import ButtonLogin from './ButtonLogin';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const baseURL = "http://10.92.199.41:8080/usuarios/";

function FormCadastro() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const senha = watch("senha");

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(baseURL, {
                nome: data.nome,
                username: data.userName,
                email: data.email,
                senha: data.senha,
            });
            alert(`Usuário ${response.data.nome} cadastrado com sucesso!`);
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            alert("Erro ao cadastrar usuário. Tente novamente.");
        }
    };

    const onError = (errors) => {
        if (errors.nome) return alert(errors.nome.message);
        if (errors.userName) return alert(errors.userName.message);
        if (errors.email) return alert(errors.email.message);
        if (errors.senha) return alert(errors.senha.message);
        if (errors.confirmarSenha) return alert(errors.confirmarSenha.message);
    }

    return (
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
                        register={register("email", { required: "O campo Email é obrigatório" })}
                    />
                    <Input
                        type="password"
                        label="Senha: "
                        placeholder="Digite sua senha"
                        id="senha"
                        register={register("senha", { required: "O campo Senha é obrigatório" })}
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
    );
}

export default FormCadastro;