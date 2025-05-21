import React from 'react'
import '../styles/HeaderLateral.css'
import { BsFillHouseFill, BsFillPersonFill, BsGearWide } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import nProgress from 'nprogress';
import { useNavigate } from 'react-router-dom';

nProgress.configure({ showSpinner: false, speed: 500 });
function HeaderLateral({children}) {
    const navigate = useNavigate(); 

    const handleHomeClick = () => {
        nProgress.start();
        setTimeout(() => {
          navigate('/');
          nProgress.done();
        }, 1000); // atraso em milissegundos
      };
      const handleTarefasClick = () => {
        nProgress.start();
        setTimeout(() => {
            navigate("/home");
            nProgress.done();
        }, 1000);
      }
      const handleUserClick = () => {
        nProgress.start();
        setTimeout(() => {
            navigate("/usuario");
            nProgress.done();
        }, 1000);
      }
      const handleConfigClick = () => {
        nProgress.start();
        setTimeout(() => {
            navigate("/configuracao");
            nProgress.done();
        }, 1000);
      }

    return (
        <div className="ContHeader">
            <div className='lateral'>
                <div className="iconHome">
                    <img src="./img/notask - logosvg.svg" alt="" />
                </div>
                <div className="contIcons">
                    <div className="icons">
                        <div className="iconCasa"  onClick={handleHomeClick} > 
                            <BsFillHouseFill className="largeIcon" />
                        </div>
                        <div >
                        <BiEdit  className='largeIcon' onClick={handleTarefasClick}/>
                        </div>
                        <div className="iconConfig">
                            <BsGearWide className="largeIcon" onClick={handleConfigClick} />
                        </div>
                    </div>

                    <div className="iconUser">
                        <BsFillPersonFill className="largeIcon" onClick={handleUserClick} />
                    </div>
                </div>

            </div>
            <div className="content">
                {children}
            </div>
        </div>

    )
}

export default HeaderLateral