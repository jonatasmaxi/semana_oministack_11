import React, {useState, useEffect} from 'react'; 
import './style.css'
import {Link, useHistory} from 'react-router-dom'
import {FiPower, FiTrash2} from 'react-icons/fi'
import logoImg from '../../assets/logo.svg'; 
import api from '../../services/api'


export default function Profile(){
    const history = useHistory();
    const [incidents, setIncidents] = useState([])
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    useEffect(() => {
        api.get('profile',{
            headers: {
                authorization: ongId
            }
        }).then(response =>{
            setIncidents(response.data);
        })
    }, [ongId]); 

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`,{
                headers: {
                    authorization: ongId
                }
            }); 

            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch(exception){
            alert('Erro ao deletar o incidente')
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/'); 

    }
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Logo"/>
                <span> Bem Vinda, {ongName}</span>
                <Link to="/incidents/new" className="button"> Cadastrar novo caso </Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>
            <h1> Casos cadastrados </h1>
            <ul>
               {incidents.map(incident => (
                    <li key={incident.id}>
                    <strong className="title"> CASO:</strong>
                    <p> {incident.title} </p>

                    <strong> Descrição </strong>
                    <p>  {incident.description}</p>

                    <strong> Valor: </strong>
                    <p> {Intl.NumberFormat('pt-BR',{ style: 'currency', currency: 'BRL'}).format(incident.value)} </p>

                    <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                        <FiTrash2 size={20} color="a8a8b3"/>
                    </button>
                </li>
               ))}
            </ul>            
        </div>    
    )
}
