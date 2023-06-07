import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import axios from 'axios';


import Home from './routes/Home';
import Create from './routes/Create';


const onClickCadastrar = async (nome, qtd, preco) =>{
  try {
    const result = await axios.post('http://localhost:5001/api/v1/produto/create', {nome, qtd, preco});
        console.log(result);
    } catch (err) {
        alert("Esse nome ja foi adicionado à tabela ou ocorreu um erro");
    }
    
}

const onClickEdit = async (nome, qtd, preco) => {
  try {
    const result = await axios.post('http://localhost:5001/api/v1/produto/create', {nome, qtd, preco});
        console.log(result);
    } catch (err) {
        alert("Ocorreu um erro ao atualizar o item");
    }
}


const router = createBrowserRouter([
  {
    path: "/", 
    element: <App />,
    children: [
      {path: "/", element: <Home />},
      {path: "create", element: <Create title={"Cadastro de Produtos"} button={"Cadastro"} funct={onClickCadastrar}/>},
      {path: "update", element: <Create title={"Editar Produtos"} button={"Editar"} funct={onClickEdit}  
      />},    
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);