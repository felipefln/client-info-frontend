import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { Card, CardImg, CardBody, CardTitle, CardColumns, Button } from "reactstrap";

export default function ListarCliente() {
  const [cliente, setCliente] = useState([]);

  useEffect(() => {
    async function loadCliente() {
      const response = await api.get("/clientes");
      setCliente(response.data);
    }
    loadCliente();
  }, []);
  
  return (
      <div className="cardList">
        <div className="cadastrar">
            <Link to='/criar'>
                <Button className='btn'>Cadastrar</Button> 
            </Link>
        </div>
        <CardColumns>
            {
                cliente.map(c => (
                    <Card key={c.id}>
                        <CardImg
                            top
                            width="50%"
                            src={c.imagem_url}
                            alt="Card cliente"
                            bottom={true}
                        />
                        <CardBody>
                        <CardTitle style={{fontSize: "20px", fontWeight: "bold"}}> Nome: {c.nome}</CardTitle>
                        <CardTitle style={{fontSize: "15px", fontWeight: "bold"}}>Email: {c.email}</CardTitle>
                        <CardTitle style={{fontSize: "15px", fontWeight: "bold"}}>CPF: {c.cpf}</CardTitle>
                        <CardTitle style={{fontSize: "15px", fontWeight: "bold"}}>Telefone: {c.telefone}</CardTitle>
                        
                        </CardBody>
                    </Card>
                ))
            }
        
        
        </CardColumns>
        
    </div>
  );
}
