import React, {useState, useMemo } from 'react';
import api from '../services/api'
import camera from '../assets/camera.svg'
import { Button } from 'reactstrap'
import Webcam from 'react-webcam'


export default function CriarCliente({ history }) {
    const [imagem, setImagem] = useState(null)
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('')
    const [cpf, setCpf] = useState('')
    const [telefone, setTelefone] = useState('')
    
    // preview da imagem escolhido via input
    const preview = useMemo(() =>
    imagem
      ? URL.createObjectURL(imagem)
      : null
    , [imagem])

    // capturando imagem da camera
    function webCameraCapture () {
        const setRef = webcam => {
            this.webcam = webcam;
          };

        const videoConstraints = {
            width: 1280,
            height: 720,
            facingMode: "user"
        };
        
        const capture = () => {
            const imageSrc = this.webcam.getScreenshot();
            console.log(imageSrc)
        };

        console.log('falta retornar agora pai ')

        return (
            <div>
              <Webcam
                audio={false}
                height={350}
                ref={setRef}
                screenshotFormat="image/jpeg"
                width={350}
                videoConstraints={videoConstraints}
              />
              <Button onClick={capture}>Capture photo</Button>
            </div>
            );
          }
        
    // funçao async do form, montando o data pra enviar pra API
    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData();
        
        data.append('imagem', imagem)
        data.append('nome', nome)
        data.append('email', email)
        data.append('cpf', cpf)
        data.append('telefone', telefone)
        

        console.log(data)

        await api.post('/criar', data)
        
        
        history.push('/')

    }
    return (
        <div className='containerForm'>
            <form onSubmit={handleSubmit}>
                <label id='imagem' style={{backgroundImage: `url(${preview})`}}>
                    <input type="file"  onChange={event => setImagem(event.target.files[0])}/>
                    
                    
                    
                </label>
                <Button outline color="success" onClick={webCameraCapture}>
                    
                        Capture sua imagem pela webcam
                        <img src={camera} alt="img-thun"/>
                    
                </Button>
                <div className="labels">
                        <label htmlFor="nome">Nome *</label>
                        <input 
                            id='nome'
                            required
                            placeholder='Nome do novo cliente'
                            value={nome}
                            onChange={event => setNome(event.target.value)}
                        />
                        <label htmlFor="email">E-mail *</label>
                        <input 
                            id='email'
                            required
                            type="email"
                            value={email}
                            placeholder='E-mail do cliente'
                            onChange={event => setEmail(event.target.value)}
                        />
                        <label htmlFor="cpf">CPF *</label>
                        <input 
                            id='cpf'
                            required
                            type="number"
                            value={cpf}
                            placeholder='CPF do cliente'
                            onChange={event => setCpf(event.target.value)}
                        />
                        <label htmlFor="telefone">Telefone</label>
                        <input 
                            id='telefone'
                            type="number"
                            value={telefone}
                            placeholder='Telefone do cliente'
                            onChange={event => setTelefone(event.target.value)}
                        />
                </div>

                <Button className='btn'>Cadastrar Cliente</Button>
            </form>
        </div>
    )
}