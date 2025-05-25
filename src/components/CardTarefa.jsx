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
}) {
  // block : none
  let imgUrlPrioridade = ""

  if (prioridadeTarefa == "ALTA") {
    imgUrlPrioridade = "../img/Ativo 4cores.png"
  } else if (prioridadeTarefa == "MEDIA") {
    imgUrlPrioridade = "../img/Ativo 5cores.png"
  } else if (prioridadeTarefa == "BAIXA") {
    imgUrlPrioridade = "../img/Ativo 3cores.png"
  }
  return (
    <div className="tarefaCard">
      <div className="tarefaItem">
        <div className="flex2 mbC">
          <img className="imgTagPrioridade" src={imgUrlPrioridade} alt="url prioridade" />
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
          <p className="prioridade">Prioridade: {prioridadeTarefa}
          </p>
        </div>
        <div className="dataPrazoCard">
          <p>
            {dataPrazoTarefa ? (<p><FaCalendar /> {dataPrazoTarefa}</p>) : null}
          </p>
        </div>
          
        </div>
      </div>
    </div>
  );
}

export default CardTarefa;
