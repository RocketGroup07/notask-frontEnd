import React, { useState } from 'react';
import { GoArrowRight } from 'react-icons/go';
import SplitText from './SplitText'; // Certifique-se de importar o SplitText
import '../styles/hero.css';
import '../styles/aurora.css';
import Aurora from '../components/Aurora.jsx';
import FadeContent from './FadeContent';
import { useNavigate } from 'react-router-dom';

function Hero() {
    const navigate = useNavigate(); // Use useNavigate para obter a função de navegação
    const [isFading, setIsFading] = useState(false);

    const handleLoginClick = () => {
        setIsFading(true);
        setTimeout(() => {
            navigate('/login');
        }, 1000); // Adicione um atraso de 1 segundo (1000 milissegundos)
    };

    const handleAnimationComplete = () => {
        // Função vazia ou adicione lógica conforme necessário
    };

    return (
        <section className={`hero ${isFading ? 'fade-out' : ''}`}>
            <Aurora
                colorStops={["#006837", "#FBB03B", "#C1272D"]}
                blend={0.5}
                amplitude={1.0}
                speed={0.5}
            />
            <div className="container-hero">
                <div className="direita">
                    <div className="texto">
                        <SplitText
                            text="O jeito simples para tarefas complexas"
                            className="split-text-custom text-2xl font-semibold text-center"
                            delay={50}
                            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                            easing="easeOutCubic"
                            threshold={0.2}
                            rootMargin="-50px"
                            onLetterAnimationComplete={handleAnimationComplete}
                        />
                    </div>
                    <div className="hero-btn">
                        <button onClick={handleLoginClick}>Começar <GoArrowRight className='icon' /></button>
                    </div>
                </div>
                <div className="esquerda">
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
                        <img className='img-small' src="./img/telaTask-hero-12.png" alt="logoImg" />
                    </FadeContent>
                </div>
            </div>
        </section>
    );
}

export default Hero;