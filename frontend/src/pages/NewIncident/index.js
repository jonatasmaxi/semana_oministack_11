import React, { useState} from 'react'; 
import logoImg from '../../assets/logo.svg'
import './style.css'
import {Link, useHistory} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import api from '../../services/api'


export default function NewIncident(){
    const [title,setTitle] = useState(""); 
    const [description,setDescription] = useState(""); 
    const [value,setValue] = useState(""); 
    const history = useHistory();
    async function handleNewIncident(e){
        e.preventDefault();
        const data = {
            title,
            description,
            value
        }
        try {
            await api.post('incidents',data, {
                headers:{
                    authorization: localStorage.getItem('ongId')
                },
            })
            alert(`Incidente cadastrado com sucesso`)
            history.push('/profile')
        }catch (exception) {
            alert('Erro ao cadastrar incidente, tente novamente')
        }
    }

    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Logo"/>
                    <h1>Cadastrar novo caso</h1>
                    <p> Descreva o caso detalhadamente para encontrar um heroi para resolver isso</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"> </FiArrowLeft>
                            Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Título do Caso"
                        value={title}
                        onChange={e=> setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={e=> setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em Reais "
                        value={value}
                        onChange={e=> setValue(e.target.value)}
                    />
                    <button className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}