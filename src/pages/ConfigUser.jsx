import React, { useEffect, useState } from 'react'
import HeaderLateral from '../components/HeaderLateral'
import { BsGearWide } from "react-icons/bs";
import '../styles/configUser.css'
import axios from 'axios';



function ConfigUser() {
    const baseUrl = "http://10.92.199.41:8080/tarefas/";
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(baseUrl);
                setNome(response.data[0].usuario.nome);
                setEmail(response.data[0].usuario.email)
                setSenha(response.data[0].usuario.senha)
                console.log(response)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData();

    }, [])
    return (
        <div>
            <HeaderLateral>
                <div className="contText">
                    <div className="icon"><BsGearWide className='iconLarge' /></div>
                    <div className="titulo"><h1>Configurações</h1></div>
                </div>
                <div className="contInputs">
                    <label htmlFor="">Nome</label>
                    <input type="text" placeholder='Nome' value={nome} />
                    <input type="text" placeholder='Nome' value={email} />
                    <input type="password"value={senha} />
                </div>
            </HeaderLateral>
        </div>
    )
}

export default ConfigUser