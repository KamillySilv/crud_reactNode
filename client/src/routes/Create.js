import React from "react";
import { useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";


const Create = ({ title, button, funct }) => {

    const { state } = useLocation();
    const [item, setItens] = useState([]);
    //const [nome, setNome] = useState(state? state.NOME_PROD:'');
    const [nome, setNome] = useState(state?.NOME_PROD || '');
    const [qtd, setQtd] = useState(state?.QUANTIDADE || '');
    const [preco, setPreco] = useState(state?.PRECO || '');

    const navigate = useNavigate();

    const onClickCadastrar = (evt) => {
        funct(nome, qtd, preco)
        const itemAtualizado = [...item, {nome, qtd, preco}]
        setItens(itemAtualizado); 
    }

    const onClickEditar = (evt) =>{
        funct(nome, qtd, preco)
        const itemAtualizado = [...item, {nome, qtd, preco}]
        setItens(itemAtualizado); 
    }
    
    const onChangeNome = (evt) => {
        console.log(evt.target.value);
        setNome(evt.target.value);
    }
    const onChangeQtd = (evt) => {
        console.log(evt.target.value);
        setQtd(evt.target.value);
    }
    const onChangePreco = (evt) => {
        console.log(evt.target.value.replace('.',','));
        setPreco(evt.target.value.replace('.',','));
    }

    return (
        <section className="min-h-full w-full flex justify-center items-center">
            <div className="relative w-96 bg-transparent border-solid m-2 border-4 border-lime-300  rounded-2xl flex justify-center items-center mt-12">
                <div className="form-value text-slate-100 font-medium text-3xl p-10">
                    <h2>{title}</h2>
                    <div className="relative my-8 border-b-2 border-lime-300 ">
                        <input className="w-full h-12 text-base bg-transparent border-none outline-none" type="text" id="nome" placeholder="Nome do produto:" onChange={onChangeNome} defaultValue={nome} autoComplete="off"></input>
                    </div>
                    <div className="relative my-5 border-b-2 border-lime-300">
                        <input className="w-full h-12 bg-transparent text-base border-none outline-none" type="text" id="qtd" placeholder="Quantidade:" onChange={onChangeQtd} defaultValue={qtd} autoComplete="off"></input>
                    </div>
                    <div className="relative my-5 border-b-2 border-lime-300">
                        <input className="w-full h-12 bg-transparent text-base border-none outline-none" type="number" id="preco" placeholder="Preço:" onChange={onChangePreco} defaultValue={preco} autoComplete="off"></input>
                    </div>
                    <div className="flex gap-2 mb-3 text-gray-950 text-base">
                        <button className="w-4/5 h-4/5 p-2 rounded-2xl border-none cursor-pointer bg-slate-200 hover:bg-slate-500 hover:text-white" onClick={() => {
                            button === 'Cadastro' ? onClickCadastrar(): onClickEditar()
                            navigate("/", {state:{item: {key: state.ID, nome, qtd, preco}}})
                            }}>{button}</button>
                        <button className="w-4/5 h-4/5 p-2 rounded-2xl border-none cursor-pointer bg-slate-200 hover:bg-slate-500 hover:text-white" onClick={() => {navigate("/")}}>Cancelar</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Create;