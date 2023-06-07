import React from "react";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import '../styles/home.css';
import { useNavigate, useLocation } from "react-router-dom";

const Home = () => {
    const { state } = useLocation();
    //const [item, setItens] = useState(state? {...state.item} : []);
    //const [item, setItens] = useState(state?.item || []);
    const [item, setItens] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getItens = async () => {
            try {
            let results = [];
            const response = await axios.get('http://localhost:5001/api/v1/produto/list', {
                signal: controller.signal
            });
            response.data.forEach((item) => {
                results.push({
                key: item.ID,
                nome: item.NOME_PROD,
                qtd: item.QUANTIDADE,
                preco: item.PRECO
                });
            });
            isMounted && setItens([...results])
            } catch (err) {
            if (err.code !== 'ERR_CANCELED') {// evitar log do abort do request
                console.error(err);
            }
        }}
        getItens();

    return () => {
        isMounted = false;
        controller.abort();
    }
    }, [item, state]);

    useCallback(() => {
        let novoItens = item.filter(i => i.nome !== state.item.nome);
            console.log('xyz', novoItens);
            let novoItem = { key: state.item.key , nome: state.item.nome, qtd: state.item.qtd, preco: state.item.preco };
            console.log('abc', [...novoItens, novoItem]);
            setItens([...novoItens, novoItem]);
        }, [item, state]);
    

    const onDelete = (id) => {
        const itemAtualizado = item.filter((coisa) => coisa.key !== id)
        setItens(itemAtualizado)
        axios.delete(`http://localhost:5001/api/v1/produto/${id}`);
    
    }
    
    const onEdit = async (id) => {
        console.log(id);
        try {
            const response = await axios.get(`http://localhost:5001/api/v1/produto/${id}`);
            navigate("update", {state: {...response.data[0]}})

            } catch (err) {
            if (err.code !== 'ERR_CANCELED') {
                console.error(err);
            }}
    }

    return (
        <section className="container-table">
            <div><button className="btn-cad" onClick={() => {navigate("create")}}>Cadastrar</button></div>
            <table className="table" >
                <thead >
                <tr>
                    <th>Nome</th>
                    <th>Quantidade</th>
                    <th>Preço</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                { item.map((itens) => {
                    return <tr key={itens.key}>
                    <td>{itens.nome}</td>
                    <td>{itens.qtd}</td>
                    <td>{itens.preco}</td>
                    <td>
                        <button className="btn-edit"
                                onClick={() => onEdit(itens.key)}>Editar</button>
                        <button className="btn-del"
                                onClick={() => onDelete(itens.key)}>Excluir</button>
                    </td>
                    </tr>
                })}
                </tbody>
            </table>
        </section>
    )
}

export default Home