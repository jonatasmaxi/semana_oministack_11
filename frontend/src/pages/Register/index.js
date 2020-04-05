import React, {useState} from 'react' 
import logoImg from '../../assets/logo.svg'
import './style.css'
import {Link, useHistory} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import api from '../../services/api'

export default function Register(){
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [whatsapp,setWhatsapp] = useState("");
    const [city,setCity] = useState("");
    const [uf,setUf] = useState("");

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault(); 
        const data = ({
            name,
            email,
            whatsapp, 
            city, 
            uf
        });
        try{
            const response = await api.post('ongs', data);
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/')
        } catch (exception){
            alert('Erro no cadastro, tente novamente')
        }
    }
    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Logo"/>
                    <h1>Cadastro</h1>
                    <p> Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"> </FiArrowLeft>
                            Voltar para o login
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da Ong" 
                        value={name}
                        onChange={e=> setName(e.target.value)}
                    />
                    <input 
                        type="Email" 
                        placeholder="Email"
                        value={email}
                        onChange={e=> setEmail(e.target.value)}

                    />
                    <input 
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e=> setWhatsapp(e.target.value)}
                    />
                    <div className="input-group">
                        <input 
                            placeholder="Cidade"
                            value={city}
                            onChange={e=> setCity(e.target.value)}
                        />
                        <input 
                            placeholder="UF" 
                            style={{width: 80}}
                            value={uf}
                            onChange={e=> setUf(e.target.value)}
                        />
                    </div>
                    <button className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}