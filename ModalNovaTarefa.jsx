import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import * as Toast from "@radix-ui/react-toast"; // Adicione esta linha
import '../styles/global.css';


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

const baseUrl = "http://10.92.199.39:8080/tarefas/";

export default function ModalNovaTarefa({
  open,
  handleClose,
  adicionarTarefa,
}) {
  const [nome, setNome] = React.useState("");
  const [descricao, setDescricao] = React.useState("");
  const [dataPrazo, setDataPrazo] = React.useState("");
  const [tag, setTag] = React.useState("Selecione");
  const [prioridade, setPrioridade] = React.useState("Selecione");

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

  const handleSalvar = async () => {
    if (!nome.trim() || !descricao.trim() || !dataPrazo.trim()) {
      setToastType('error');
      showToast('error');
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
      const response = await axios.post(baseUrl, novaTarefa);
      adicionarTarefa(response.data);
      setNome("");
      setDescricao("");
      setDataPrazo("");
      setTag("Selecione");
      setPrioridade("Selecione");
      setToastType('success');
      showToast('success');
      handleClose();
    } catch (error) {
      console.error("Erro ao criar tarefa:", error.response || error.message);
      setToastType('error');
      showToast('error');
    }
  };

  return (
    <Toast.Provider swipeDirection="right">
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
            ? 'Tarefa criada com sucesso!'
            : 'Algo está errado ao criar a tarefa!'}
        </Toast.Description>
        <Toast.Close className="ToastClose">×</Toast.Close>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  );
}