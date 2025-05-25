import { FaTrash, FaCalendar } from "react-icons/fa";
import { FiAlignLeft } from "react-icons/fi";
import "../styles/cardTarefa.css";

function CardTarefa({
  idTarefa,
  nomeTarefa,
  descricaotarefa,
  prioridadeTarefa,
  dataPrazoTarefa,
  excluirTarefa,
  draggable,      // NOVO: para ativar drag
  onDragStart,    // NOVO: evento que dispara no início do drag
}) {
  // Definindo a URL da imagem de prioridade
  let imgUrlPrioridade = "";

  if (prioridadeTarefa === "ALTA") {
    imgUrlPrioridade = "../img/Ativo 4cores.png";
  } else if (prioridadeTarefa === "MEDIA") {
    imgUrlPrioridade = "../img/Ativo 5cores.png";
  } else if (prioridadeTarefa === "BAIXA") {
    imgUrlPrioridade = "../img/Ativo 3cores.png";
  }

  return (
    <div
      className="tarefaCard"
      draggable={draggable}
      onDragStart={onDragStart}
    >
      <div className="tarefaItem">
        <div className="flex2 mbC">
          <img
            className="imgTagPrioridade"
            src={imgUrlPrioridade}
            alt={`Prioridade ${prioridadeTarefa}`}
          />
          <div
            className="excluir"
            id="excluir"
            onClick={() => excluirTarefa(idTarefa)}
          >
            <FaTrash className="iconLixo" />
          </div>
        </div>
        <div className="titleCard">
          <h4>{nomeTarefa}</h4>
        </div>
        <div className="descriptionCard">
          {descricaotarefa ? (
            <div className="iconDescri">
              <FiAlignLeft />
            </div>
          ) : null}
        </div>
        <div className="flex2">
          <div className="prioridadeCard">
            <p className="prioridade">Prioridade: {prioridadeTarefa}</p>
          </div>
          <div className="dataPrazoCard">
            {dataPrazoTarefa ? (
              <p>
                <FaCalendar /> {dataPrazoTarefa}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardTarefa;
