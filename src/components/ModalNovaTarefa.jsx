import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import '../styles/global.css';
import { api } from "../lib/axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 500,
  bgcolor: "#1A1A1A",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  color: "white",
};


export default function ModalNovaTarefa({
  open,
  handleClose,
  adicionarTarefa,
}) {
  const [nome, setNome] = React.useState("");
  const [descricao, setDescricao] = React.useState("");
  const [dataPrazo, setDataPrazo] = React.useState(""); // Campo para a data de prazo
  const [tag, setTag] = React.useState("Selecione")
  const [prioridade, setPrioridade] = React.useState("Selecione")
 

  const handleSalvar = async () => {
    if (!nome.trim() || !descricao.trim() || !dataPrazo.trim()) {
      alert("Todos os campos são obrigatórios.");
      return;
    }

    const novaTarefa = {
      nome,
      descricao,
      dataPrazo,
      tag,
      prioridade,
      usuario: {
        id: 1,
      },
    };

    try {
      const response = await api.post("tarefas/", novaTarefa); // Envia os dados para a API
      console.log("Tarefa criada com sucesso:", response.data);
      adicionarTarefa(response.data); // Atualiza a lista de tarefas no componente pai
      setNome("");
      setDescricao("");
      setDataPrazo("");
      setTag("")
      handleClose(); // Fecha o modal
    } catch (error) {
      console.error("Erro ao criar tarefa:", error.response || error.message);
      alert("Erro ao criar tarefa. Verifique os dados e tente novamente.");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <h2>Criar Nova Tarefa</h2>
        <TextField
          fullWidth
          label="Nome da Tarefa"
          variant="outlined"
          margin="normal"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          InputLabelProps={{ style: { color: "#ccc" } }}
          InputProps={{ style: { color: "white" } }}
        />
        <TextField
          fullWidth
          label="Descrição"
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          InputLabelProps={{ style: { color: "#ccc" } }}
          InputProps={{ style: { color: "white" } }}
        />
        <TextField
          fullWidth
          label="Data de Prazo"
          variant="outlined"
          margin="normal"
          type="date"
          value={dataPrazo}
          onChange={(e) => setDataPrazo(e.target.value)}
          InputLabelProps={{ shrink: true, style: { color: "#ccc" } }}
          InputProps={{ style: { color: "white" } }}
        />
        <label htmlFor="tags">Tag</label>
        <select id="tag"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        
        >
          <option value="Selecione">Selecione</option>
          <option value="NAO_INICIADO">Não iniciada</option>
          <option value="EM_ANDAMENTO">Em progresso</option>
          <option value="CONCLUIDO">Concluida</option>
        </select>
        <label htmlFor="Prioridade">Prioridade</label>
        <select id="Prioridade"
        value={prioridade}
        onChange={(e) => setPrioridade(e.target.value)}
        
        >
          <option value="Selecione">Selecione</option>
          <option value="ALTA">Alta</option>
          <option value="MEDIA">Media</option>
          <option value="BAIXA">Baixa</option>
          
        </select>
       

        <Button onClick={handleSalvar} variant="contained" sx={{ mt: 2 }}>
          Salvar
        </Button>
      </Box>
    </Modal>
  );
}
