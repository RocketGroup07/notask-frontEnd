import { FaTrash } from "react-icons/fa";
import { FiAlignLeft } from "react-icons/fi";
import "../styles/cardTarefa.css";
function CardTarefa({
  idTarefa,
  nomeTarefa,
  descricaotarefa,
  prioridadeTarefa,
  dataPrazoTarefa,
  excluirTarefa,
}) {
  // block : none
  return (
    <div className="tarefaCard">
      <div key={idTarefa} className="tarefaItem">
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
        <div className="prioridadeCard">
          <p className="prioridade">Prioridade: {prioridadeTarefa}
          </p>
        </div>
        <div className="flex2">
          <p>
            <strong>Prazo:</strong> {dataPrazoTarefa}
          </p>
          <div
            className="excluir"
            id="excluir"
            onClick={() => excluirTarefa(idTarefa)}
          >
            <FaTrash className="iconLixo" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardTarefa;
