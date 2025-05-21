import React from "react";
import ScrollReveal from "./ScrollReveal";
import "../styles/ScrollReveal.css";
import CardBeneficio from "./CardBeneficio";
import SpotlightCard from "../components/SpotLightCard.jsx";

function SectionBen() {
  return (
    <div className="section-ben">
      <div className="direitaSection">
        <div className="card-container">
          <SpotlightCard
            className="custom-spotlight-card"
            spotlightColor="rgba(0, 229, 255, 0.2)"
          >
            <CardBeneficio
              title="Simples de usar"
              descricao="Organize suas tarefas de forma rápida e fácil."
              image="\img\logoNotask.png" // Substitua pelo caminho da imagem, se necessário
            />
          </SpotlightCard>
          <SpotlightCard
            className="custom-spotlight-card"
            spotlightColor="rgba(0, 229, 255, 0.2)"
          >
            <CardBeneficio
              title="Acompanhe o progresso"
              descricao="Vizualize tarefas de forma clara"
              image="\img\iconTable.png" // Substitua pelo caminho da imagem, se necessário
            />
          </SpotlightCard>
        </div>
      </div>
      <div className="esquerdaSection">
        <ScrollReveal
          baseOpacity={10}
          enableBlur={true}
          baseRotation={10}
          blurStrength={10}
          classname="section-ben"
        >
          Feito para quem quer organizar as coisas de forma rápida.
          {/* Adicione mais cards conforme necessário */}
        </ScrollReveal>
      </div>
    </div>
  );
}

export default SectionBen;
