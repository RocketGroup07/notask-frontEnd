import React from 'react'
import '../styles/global.css'


function CardBeneficio({ title, descricao, image }) {
    return (
        <div className="cardBen">
            <div className="cardImgContainer">
              {image && <img src={image} alt={title} className="cardImage" />}  
            </div>
            <div className="contCard">
                <div className="cardTitulo">
                {title}
            </div>
            <div className="cardDescricao">
                {descricao}
            </div>
            </div>
            
        </div>
    )
}

export default CardBeneficio