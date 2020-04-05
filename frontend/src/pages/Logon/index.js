import React, {useState} from  'react'
import {FiLogIn} from 'react-icons/fi'
import './styles.css'
import {Link, useHistory} from 'react-router-dom'
import heroresImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'
import api from '../../services/api'


export default function Logon(){

    const [id,setId] = useState("")
    const history = useHistory(); 

    async function handleLogin(e){
        e.preventDefault(); 
        try{
            const response = await api.post('sessions', {id});
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.ong.name)
            history.push('/profile')
        } catch (exception){
            alert('Erro no login, tente novamente')
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Logo"></img>
                <h1>Faça seu logon </h1>
                <form onSubmit={handleLogin}>
                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e=> setId(e.target.value)}
                    />
                    <button className="button"type="submit">Entrar </button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"> </FiLogIn>
                            Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroresImg} alt="Heroes" />
        </div>
    )
} 
