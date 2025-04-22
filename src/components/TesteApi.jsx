import React, { useState, useEffect } from 'react';
import '../styles/cardsApi.css';
import axios from 'axios';
import nProgress from 'nprogress';
import Input from '../components/Input'
import { useForm } from 'react-hook-form';

const baseUrl = 'http://10.92.199.41:8080/tarefas/'
const baseUrlUsuario = 'http://10.92.199.41:8080/usuarios/'
nProgress.configure({ showSpinner: false, speed: 700 });
function TesteApi() {
    const [post, setPost] = useState([]);
    const [user, setUser] = useState([]);
    const {register, handleSubmit, watch} = useForm("");

    useEffect(() => {
        axios.get(`${baseUrl}`).then((response) => {
            setPost(response.data);
            console.log(response.data)
        })
        .catch((error) => {
            console.error("Erro ao buscar tarefas:", error);
            alert("Erro ao buscar tarefas");

        });

        axios.get(`${baseUrlUsuario}`).then((response) => {
            setUser(response.data);
            console.log(response.data)
        })
        .catch((error) => {
            console.error("Erro ao buscar usuarios:", error)
            alert(`Erro ao buscar usuários: ${error.message}`);
        });


    }, []);

    function criarTarefa(data) {
        nProgress.start();
        console.log(data)
        axios
        .post(baseUrl,{
            nome: data.nome,
            descricao: data.descricao,
            tag: "NAO_INICIADO",
            prioridade: "BAIXA",
            dataPrazo: "2024-01-01",
            usuario: {
                id: 1
            },

        })
        .then((response)=> {
            setPost(...post, response.data);
            console.log("Tarefa criada com sucesso!");
            alert(`Tarefa ${response.data.nome} criada com sucesso!`);
            nProgress.done();
        })
        .catch((error) =>{
            console.error("Erro ao criar tarefa:", error);
            alert("Erro ao criar tarefa");
            nProgress.done();
        })
         
    }
    function criarUsuario() {
        
    }
    //axios.post(baseUrlUsuario,{
      //  nome
        //username 
        //email 
        //senha
    //})
    


  return (
    <form className="containerTeste" onSubmit={handleSubmit(criarTarefa) } >
        <button onClick={criarTarefa}>Cria tarefa</button>
        <Input 
        label="nome"
        placeholder="Digite seu nome"
        id="nome"
        register={register("nome")}
        />
        <Input
        label="descricao"
        placeholder="Descricao da tarefa"
        register={register("descricao")}
        ></Input>
        <input type="options"/>
        <button type='submit'>Exibe</button>
        <h1>{watch("nome")}</h1>
        
    
    </form>
  );
}

export default TesteApi;