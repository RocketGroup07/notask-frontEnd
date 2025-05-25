import React, { useState, useEffect } from "react";
import axios from "axios";
import HeaderLateral from "../components/HeaderLateral";
import { BsPencilSquare } from "react-icons/bs";
import * as Toast from "@radix-ui/react-toast"; // Adicione esta linha
import {
  FaPlus,
  FaRegHourglass,
  FaHourglass,
  FaHourglassHalf,
  FaTrash,
} from "react-icons/fa";
import "../styles/homeTarefas.css";
import ModalNovaTarefa from "../components/ModalNovaTarefa";
import { api } from "../lib/axios";
import CardTarefa from "../components/CardTarefa";
import ColunaTarefa from "../components/ColunaTarefa";

function HomeTarefas() {
  const [tarefas, setTarefas] = React.useState([]); // Estado para armazenar as tarefas
  const [modalAberto, setModalAberto] = React.useState(false);
  const tarefasAFazer = tarefas.filter((tarefa) => tarefa.tag === "NAO_INICIADO").length; //
  const tarefasEmAndamento = tarefas.filter((tarefa) => tarefa.tag === "EM_ANDAMENTO").length;
  const tarefasConcluidas = tarefas.filter((tarefa) => tarefa.tag === "CONCLUIDO").length;

  // Toast states
  const [toastOpen, setToastOpen] = React.useState(false);
  const [toastType, setToastType] = React.useState('success');
  const timerRef = React.useRef(0);

  React.useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const showToast = (type = 'success') => {
    setToastType(type);
    setToastOpen(false);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setToastOpen(true);
    }, 100);
  };




  // Função para buscar as tarefas da API
  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        //const response = await api.get("tarefas/");

        const response = await api.get("tarefas/", {
        })

        // Faz a requisição GET para a API
        console.log("Resposta", response.data)
        console.log("Tarefas", tarefas)

        setTarefas(response.data != "" ? response.data : []); // Atualiza o estado com as tarefas retornadas
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
        setToastType('error');
        showToast('error');
        return 0;
      }
    };

    fetchTarefas();
  }, []); // Executa apenas uma vez ao carregar o componente

  const excluirTarefa = async (id) => {
    try {
      await api.delete(`${"tarefas/"}${id}`);
      setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
      setToastType('success');
      showToast('success');
    } catch (error) {
      setToastType('error');
      showToast('error');
      console.error("Erro ao excluir a tarefa:", error);
    }
  };
  // Função para adicionar uma nova tarefa
  const adicionarTarefa = (novaTarefa) => {
    setTarefas([...tarefas, novaTarefa]); // Adiciona a nova tarefa ao estado
  };

  return (
    <div>
      <Toast.Provider swipeDirection="right">
        <HeaderLateral>
          <div className="contTextButton">
            <div className="textContainer">
              <div className="iconText">
                <BsPencilSquare />
              </div>
              <div className="textTitulo">
                <h3>Minhas tarefas</h3>
                <p>{tarefas[0]?.usuario?.username || ""}</p>
              </div>
            </div>
            <div className="buttonText">
              <button onClick={() => setModalAberto(true)}>
                <FaPlus /> Nova Tarefa
              </button>
            </div>
          </div>
          <hr className="custom-hr" />

          <div className="contTarefas">
            {/* Tarefas a fazer */}
            <div className="cont-tarefaPen">
              <ColunaTarefa
                ampulhetaIcon={<FaRegHourglass />}
                titleColuna={"A fazer"}
                tarefasAFazerQtd={tarefasAFazer}
                circle={"circle1"}
              />
              <div className="cont-tarefaCard">
                {tarefas
                  .filter((tarefa) => tarefa.tag === "NAO_INICIADO")
                  .map((tarefa) => (
                    <CardTarefa
                      key={tarefa.id}
                      idTarefa={tarefa.id}
                      nomeTarefa={tarefa.nome}
                      descricaotarefa={tarefa.descricao}
                      prioridadeTarefa={tarefa.prioridade}
                      dataPrazoTarefa={tarefa.dataPrazo}
                      excluirTarefa={excluirTarefa}
                    />
                  ))}
              </div>
            </div>

            {/* Tarefas em progresso */}
            <div className="con-tarefaProgress">
              <ColunaTarefa
                ampulhetaIcon={<FaHourglassHalf />}
                titleColuna={"Em andamento"}
                tarefasAFazerQtd={tarefasEmAndamento}
                circle={"circle2"}
              />
              <div className="cont-tarefaCard">
                {tarefas
                  ?.filter((tarefa) => tarefa.tag === "EM_ANDAMENTO")
                  .map((tarefa) => (
                    <CardTarefa
                      key={tarefa.id}
                      idTarefa={tarefa.id}
                      nomeTarefa={tarefa.nome}
                      descricaotarefa={tarefa.descricao}
                      prioridadeTarefa={tarefa.prioridade}
                      dataPrazoTarefa={tarefa.dataPrazo}
                      excluirTarefa={excluirTarefa}
                    />
                  ))}
              </div>
            </div>

            {/* Tarefas concluídas */}
            <div className="cont-tarefaConcluida">
              <ColunaTarefa
                ampulhetaIcon={<FaHourglass />}
                titleColuna={"Concluida"}
                tarefasAFazerQtd={tarefasConcluidas}
                circle={"circle3"}
              />
              <div className="cont-tarefaCard">
                {tarefas
                  .filter((tarefa) => tarefa.tag === "CONCLUIDO")
                  .map((tarefa) => (
                    <CardTarefa
                      key={tarefa.id}
                      idTarefa={tarefa.id}
                      nomeTarefa={tarefa.nome}
                      descricaotarefa={tarefa.descricao}
                      prioridadeTarefa={tarefa.prioridade}
                      dataPrazoTarefa={tarefa.dataPrazo}
                      excluirTarefa={excluirTarefa}
                    />
                  ))}
              </div>
            </div>
          </div>

          <ModalNovaTarefa
            open={modalAberto}
            handleClose={() => setModalAberto(false)}
            adicionarTarefa={adicionarTarefa}
          />
        </HeaderLateral>
        <Toast.Root
          className={`ToastRoot ${toastType}`}
          open={toastOpen}
          onOpenChange={setToastOpen}
        >
          <Toast.Title className="ToastTitle">
            {toastType === 'success' ? 'Sucesso!' : 'Erro!'}
          </Toast.Title>
          <Toast.Description className="ToastDescription">
            {toastType === 'success'
              ? 'Tarefa apagada com sucesso!'
              : 'Erro ao apagar tarefa!'}
          </Toast.Description>
          <Toast.Close className="ToastClose">×</Toast.Close>
        </Toast.Root>
        <Toast.Viewport className="ToastViewport" />
      </Toast.Provider>
    </div>
  );
}

export default HomeTarefas;
