import '../styles/global.css';
import '../styles/cadastro.css';
import Input from './input';
import ButtonLogin from './ButtonLogin';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const baseURL = "http://10.92.199.41:8080/usuarios/";

function FormCadastro() {
    const { register, handleSubmit, watch } = useForm();

    // Função para enviar os dados do formulário para a API
    const onSubmit = async (data) => {

        console.log(data);

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

    const senha = watch("senha");

    return (
        <form className="form-cadastro" onSubmit={handleSubmit(onSubmit)}>
            <h1>Faça seu cadastro!</h1>
            <p>Preencha todos os campos abaixo:</p>

            <div>
                <div className="flex">
                    <Input
                        label="Nome: "
                        placeholder="Digite seu nome completo"
                        id="nome"
                        register={register("nome")} />
                    <Input
                        label="Nome de usuário: "
                        placeholder="Digite seu nome de usuário"
                        id="usuario"
                        register={register("userName")} />
                </div>
                <div className="flex">
                    <Input
                        label="Email: "
                        placeholder="Digite seu email"
                        id="email"
                        register={register("email")} />
                    <Input
                        type="password"
                        label="Senha: "
                        placeholder="Digite sua senha"
                        id="senha"
                        register={register("senha", {
                            required: "O campo é obrigatório", validate: (value) =>
                                value === senha || "As senhas não coincidem",
                        })} />
                </div>
                <Input
                    type="password"
                    label="Confirmar senha: "
                    placeholder="Digite sua senha novamente"
                    id="confirmarSenha"
                    register={register("senha", { required: "O campo é obrigatório" })} />
            </div>
            <ButtonLogin className="button" type="submit" value="Cadastrar" />
        </form>
    );
}

export default FormCadastro;