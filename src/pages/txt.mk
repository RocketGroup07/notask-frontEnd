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