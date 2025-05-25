import '../styles/ColunaTarefa.css'
function ColunaTarefa({ ampulhetaIcon, titleColuna, tarefasAFazerQtd, circle }) {
    return (

        <div className="tarefaDizer">
            <div className='ampulhetaIcon'>
                {ampulhetaIcon}
            </div>
            <div className="cont">
                <div className="textColuna">
                    <h4>{titleColuna} </h4>
                </div>
                <div className="contadorDiv">
                    <p>{tarefasAFazerQtd}</p>
                </div>
            </div>

            <div className={circle}></div>
        </div>
    )
}

export default ColunaTarefa