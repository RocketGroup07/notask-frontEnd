import React, { useState, useEffect } from "react";
import axios from "axios";
import HeaderLateral from "../components/HeaderLateral";
import { BsPencilSquare } from "react-icons/bs";
import * as Toast from "@radix-ui/react-toast";
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
  const [tarefas, setTarefas] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);

  const tarefasAFazer = tarefas.filter((tarefa) => tarefa.tag === "NAO_INICIADO").length;
  const tarefasEmAndamento = tarefas.filter((tarefa) => tarefa.tag === "EM_ANDAMENTO").length;
  const tarefasConcluidas = tarefas.filter((tarefa) => tarefa.tag === "CONCLUIDO").length;

  const [toastOpen, setToastOpen] = useState(false);
  const [toastType, setToastType] = useState('success');
  const [toastMessage, setToastMessage] = useState('');
  const timerRef = React.useRef(0);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const showToast = (type = 'success', message = '') => {
    setToastType(type);
    setToastMessage(message);
    setToastOpen(false);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setToastOpen(true);
    }, 100);
  };

  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        const response = await api.get("tarefas/");
        setTarefas(response.data !== "" ? response.data : []);
        console.log("tarefas da API:", response.data);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
        showToast('error', 'Erro ao buscar tarefas!');
      }
    };
    fetchTarefas();
  }, []);

  const excluirTarefa = async (id) => {
    try {
      await api.delete(`tarefas/${id}`);
      setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
      showToast('success', 'Tarefa apagada com sucesso!');
    } catch (error) {
      console.error("Erro ao excluir a tarefa:", error);
      showToast('error', 'Erro ao apagar tarefa!');
    }
  };

  const adicionarTarefa = (novaTarefa) => {
    setTarefas([...tarefas, novaTarefa]);
  };

  async function atualizarTagTarefa(tarefaId, novaTag) {
    try {
      const tarefa = tarefas.find((t) => t.id === Number(tarefaId));
      if (!tarefa) throw new Error("Tarefa não encontrada");

      const dadosAtualizados = {
        nome: tarefa.nome,
        descricao: tarefa.descricao,
        prioridade: tarefa.prioridade,
        dataPrazo: tarefa.dataPrazo,
        tag: novaTag,
      };

      await api.put(`tarefas/${tarefaId}`, dadosAtualizados);
      showToast('success', 'Tag da tarefa atualizada!');
    } catch (error) {
      console.error("Erro ao atualizar a tag da tarefa:", error);
      showToast('error', 'Erro ao atualizar a tarefa!');
    }
  }

  const [draggedTarefaId, setDraggedTarefaId] = useState(null);

  function handleDragStart(e, tarefaId) {
    setDraggedTarefaId(tarefaId);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", tarefaId);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  async function handleDrop(e, novaTag) {
    e.preventDefault();
    const tarefaId = e.dataTransfer.getData("text/plain") || draggedTarefaId;
    if (!tarefaId) return;

    setTarefas((oldTarefas) =>
      oldTarefas.map((tarefa) =>
        tarefa.id.toString() === tarefaId.toString()
          ? { ...tarefa, tag: novaTag }
          : tarefa
      )
    );

    setDraggedTarefaId(null);
    await atualizarTagTarefa(tarefaId, novaTag);
  }

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

          <div className="contTarefas" style={{ display: "flex", gap: "1rem" }}>
            <div
              className="cont-tarefaPen"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, "NAO_INICIADO")}
            >
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
                      draggable={true}
                      onDragStart={(e) => handleDragStart(e, tarefa.id)}
                    />
                  ))}
              </div>
            </div>

            <div
              className="con-tarefaProgress"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, "EM_ANDAMENTO")}
            >
              <ColunaTarefa
                ampulhetaIcon={<FaHourglassHalf />}
                titleColuna={"Em andamento"}
                tarefasAFazerQtd={tarefasEmAndamento}
                circle={"circle2"}
              />
              <div className="cont-tarefaCard">
                {tarefas
                  .filter((tarefa) => tarefa.tag === "EM_ANDAMENTO")
                  .map((tarefa) => (
                    <CardTarefa
                      key={tarefa.id}
                      idTarefa={tarefa.id}
                      nomeTarefa={tarefa.nome}
                      descricaotarefa={tarefa.descricao}
                      prioridadeTarefa={tarefa.prioridade}
                      dataPrazoTarefa={tarefa.dataPrazo}
                      excluirTarefa={excluirTarefa}
                      draggable={true}
                      onDragStart={(e) => handleDragStart(e, tarefa.id)}
                    />
                  ))}
              </div>
            </div>

            <div
              className="cont-tarefaConcluida"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, "CONCLUIDO")}
            >
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
                      draggable={true}
                      onDragStart={(e) => handleDragStart(e, tarefa.id)}
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
            {toastMessage}
          </Toast.Description>
          <Toast.Close className="ToastClose" />
        </Toast.Root>
        <Toast.Viewport className="ToastViewport" />
      </Toast.Provider>
    </div>
  );
}

export default HomeTarefas;
