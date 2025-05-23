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
import "../styles/HomeTarefas.css";
import ModalNovaTarefa from "../components/ModalNovaTarefa";
import { api } from "../lib/axios";

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
        console.log(response)
        console.log(tarefas)

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
            <div className="tarefaDizer">
              <div>
                <FaRegHourglass />
              </div>
              <h4>A fazer ({tarefasAFazer}) </h4>
              <div className="circle1"></div>
            </div>
            <div className="cont-tarefaCard">
              {tarefas
                .filter((tarefa) => tarefa.tag === "NAO_INICIADO")
                .map((tarefa) => (
                  <div className="tarefaCard">
                    {tarefas.length <= 0 && <p>sem tarefas</p>}

                    <div key={tarefa.id} className="tarefaItem">
                      <h4>{tarefa.nome}</h4>
                      <p>{tarefa.descricao}</p>
                      <p>Prioridade: {tarefa.prioridade}</p>
                      <div>
                        <p>
                          <strong>Prazo:</strong> {tarefa.dataPrazo}
                        </p>
                        <div
                          id="excluir"
                          onClick={() => excluirTarefa(tarefa.id)}
                        >
                          <FaTrash />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Tarefas em progresso */}
          <div className="con-tarefaProgress">
            <div className="tarefaDizer">
              <div>
                <FaHourglassHalf />
              </div>
              <h4>Em progresso ({tarefasEmAndamento}) </h4>
              <div className="circle2"></div>
            </div>
            <div className="cont-tarefaCard">
              {tarefas
                ?.filter((tarefa) => tarefa.tag === "EM_ANDAMENTO")
                .map((tarefa) => (
                  <div className="tarefaCard" key={tarefa.id}>
                    {tarefas.length <= 0 && <p>sem tarefas</p>}
                    <h4>{tarefa.nome}</h4>
                    <p>{tarefa.descricao}</p>
                    <p>{tarefa.prioridade}</p>
                    <div>
                      <p>
                        <strong>Prazo:</strong> {tarefa.dataPrazo}
                      </p>
                      <div
                        id="excluir"
                        onClick={() => excluirTarefa(tarefa.id)}
                      >
                        <FaTrash />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Tarefas concluídas */}
          <div className="cont-tarefaConcluida">
            <div className="tarefaDizer">
              <div>
                <FaHourglass />{" "}
              </div>
              <h4>Concluído ({tarefasConcluidas}) </h4>
              <div className="circle1"></div>
            </div>
            <div className="cont-tarefaCard">
              {tarefas
                .filter((tarefa) => tarefa.tag === "CONCLUIDO")
                .map((tarefa) => (
                  <div className="tarefaCard">
                    {tarefas.length <= 0 && <p>sem tarefas</p>}

                    <div key={tarefa.id} className="tarefaItem">
                      <h4>{tarefa.nome}</h4>
                      <p>{tarefa.descricao}</p>
                      <p>{tarefa.prioridade}</p>
                      <div>
                        <p>
                          <strong>Prazo:</strong> {tarefa.dataPrazo}
                        </p>
                        <div
                          id="excluir"
                          onClick={() => excluirTarefa(tarefa.id)}
                        >
                          <FaTrash />
                        </div>
                      </div>
                    </div>
                  </div>
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
