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
    const [web, setWeb] = useState(false)
    const [numero, setNumero ] = useState(3)
    const webcamRef = React.useRef(null)

    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }
    // preview da imagem escolhido via input
    const preview = useMemo(() =>
    
    imagem
      ? URL.createObjectURL(imagem)
      : null
    , [imagem])

    // capturando imagem da camera
    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setNumero(Math.floor(Math.random() * 2000));
            const fileName  = `capture${numero}.png`
            const fileUrl = dataURLtoFile(imageSrc, fileName)
            setImagem(fileUrl)
          },
          [numero]
    );
                
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
                {
                    web ?
                    <label id='imagem' style={{backgroundImage: `url(${preview})`}}>
                         <Webcam
                            audio={false}
                            height={400}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            width={425}
                            />
                            <Button onClick={capture}>
                    
                                
                                <img src={camera} alt="img-thun"/>
                            
                            </Button>
                    
                    
                    
                    </label> 
                    :
                    <label id='imagem' style={{backgroundImage: `url(${preview})` }}>
               
                    <input type="file"  onChange={event => setImagem(event.target.files[0])}/>
                </label>
                
                }
                {
                    web ? 
                    false
                     :
                     <Button outline color="success" onClick={() => setWeb(true)}>
                
                     Capture sua imagem pela webcam
                     <img src={camera} alt="img-thun"/>
                 
                     </Button>
                }
                 
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