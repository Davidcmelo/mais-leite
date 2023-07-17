'use client'
import { rajdhani } from "@/app/layout";
import {  Alert, Button,  Modal,  Snackbar, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Edit, Delete} from '@material-ui/icons';
import CloseIcon from '@mui/icons-material/Close';
import Loading from "@/app/loading";
import Producao from "./Producao";
import {Pagination , Stack} from '@mui/material'


export interface CadastrarProps{
    id:any,
    nome:string,
    responsavel:string,
    endereco:string,
    time: Date,
}

export default function Fazendas() {
    let time = new Date();
    const [open, setOpen] = useState(false);
    const [nome, setNome] = useState('');
    const [responsavel, setResponsavel] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cadastros, setCadastros] = useState<CadastrarProps[]>([])
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertError, setAlertError] = useState(false);
    const [id, setId] = useState<number | null>(null);
    const [paginaAtual, setPaginaAtual] = useState(1)

    const itemPorPage = 10; 



    const handleOpenn = () => setOpen(true);

    const handleOpen = (index: number) => {
        setEditingIndex(index);
        const cadastro = cadastros[index];
        setId(cadastro.id);
        setNome(cadastro.nome);
        setResponsavel(cadastro.responsavel);
        setEndereco(cadastro.endereco);
        setOpen(true);
      
    };
 
    const handleClose = () => setOpen(false);
    
    async function Cadastrar() {
        setCadastros([{id,nome, responsavel, endereco, time }, ...cadastros]);
        setNome('');
        setResponsavel('');
        setEndereco('');
        setOpen(false);
        setAlertSuccess(true);
        const data= {
            nome,
            fazenda:nome,
            responsavel,
            endereco,
            time
        };

        try {
            const response = await fetch("/api/fazendas/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
        
            if (response.ok) {
                const result = await response.json();
                console.log("Cadastro realizado com sucesso:", result);
                
                // Buscar os dados atualizados da API após o cadastro
                const response2 = await fetch("/api/fazendas/read/read");
                if (response2.ok) {
                    const result2 = await response2.json();
                    setCadastros(result2);
                    await fetchData();
                } else {
                    console.error("Erro ao obter dados:", response2.status);
                }
            } else {
                console.error("Erro ao cadastrar:", response.status);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            }
        
    };
    
    async function Editar() {
        const newCadastros = [...cadastros];
        newCadastros[editingIndex!] = {id,nome, responsavel, endereco, time: cadastros[editingIndex!].time };
        setCadastros(newCadastros);
        setNome('');
        setResponsavel('');
        setEndereco('');
        setEditingIndex(null);
        setOpen(false);
        console.log("ID ", id)
        const data= {
            nome,
            fazenda:nome,
            responsavel,
            endereco,
        };
        // console.log("TIMEEEEEEEEE  3",time)
        try {
            const response = await fetch(`/api/fazendas/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
      
            if (response.ok) {
                const result = await response.json();
                console.log("Atualizado com sucesso:", result);
            } else {
                console.error("Erro ao atualizar:", response.status);
            }
          } catch (error) {
                console.error("Erro na requisição:", error);
            }
    }
   
    async function handleDelete(index:number) {
        const cadastro = cadastros[index];
        const id = cadastro.id;
        const newCadastros = [...cadastros];
        newCadastros.splice(index, 1);
        setCadastros(newCadastros);
        setNome('');
        setResponsavel('');
        setEndereco('');
        setEditingIndex(null);
        setOpen(false);
        setAlertError(true);
        // console.log("TIMEEEEEEEEE 4",time)        
        try {
            const response = await fetch(`/api/fazendas/delete/${id}`, {
                method: "DELETE",
                headers: {
                "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                const result = await response.json();
                console.log("Apagado com sucesso:", result);
            } else {
                console.error("Erro ao apagar:", response.status);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
  }
      


    async function fetchData() {
        try {
          const response = await fetch("/api/fazendas/read/read");
      
          if (response.ok) {
            const result = await response.json();
            
            const cadastrosData = result.map((item: any) => {
              return {
                id:item.id,
                nome: item.fazenda, 
                responsavel: item.responsavel,
                endereco: item.endereco,
                time: new Date(item.data)
                
              };
            });
            // console.log("TIMEEEEEEEEE  5",time)
            setCadastros(cadastrosData);
          } else {
            console.error("Erro ao obter dados:", response.status);
          }
        } catch (error) {
            console.error("Erro na requisição:", error);
          }
    }            

    useEffect(() => {
       
        fetchData();
    }, []);
      

    function handleNomeChange(event:any) {
        setNome(event.target.value);
    }
    
    function handleResponsavelChange(event:any) {
        setResponsavel(event.target.value);
    }

    function handleEnderecoChange(event:any) {
        setEndereco(event.target.value);
    }


    const getPaginacao = () =>{
        const pageLast = paginaAtual * itemPorPage;
        const pageFirst = pageLast - itemPorPage;
        return cadastros.slice(pageFirst, pageLast) 
    }

    const MudarPagina=(event:any, page:any)=>{
        setPaginaAtual(page)
    }


    return (
        <div>
 
            <div className="flex flex-col justify-center items-center p-10 gap-10">
                    <h1 className={`${rajdhani.className} font-semibold  md:text-5xl text-2xl text-emerald-950`} >Fazendas</h1>
                <button onClick={handleOpenn}  className="border border-white bg-emerald-900 hover:bg-emerald-700 text-white font-semibold  text-xl py-4 px-8 rounded transition duration-300 ease-in-out">Cadastrar nova fazenda</button>
                <Snackbar open={alertSuccess} autoHideDuration={5000} onClose={() => setAlertSuccess(false)}>
                    <Alert severity="success" className="bg-green-500 text-white"  >
                        Fazenda cadastrada com sucesso!
                    </Alert>
                </Snackbar>
                <Snackbar open={alertError} autoHideDuration={5000} onClose={() => setAlertError(false)}>
                    <Alert severity="error" className="bg-red-800 text-white">
                        Fazenda excluida com sucesso!
                    </Alert>
                </Snackbar>
            </div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="flex justify-center flex-col items-center h-screen">
                <div className="border-2 border-solid flex rounded justify-center items-center flex-col w-3/4 h-4/5 md:w-1/2 gap-5 bg-gradient-to-b from-teal-900 to-emerald-950 relative">
                        
                    <button className="absolute top-0 right-0 mt-2 mr-2 p-2 transition-all duration-500 hover:scale-150" onClick={handleClose}>
                        <CloseIcon className=" text-white "/>
                    </button>
                    <label htmlFor="input1" className="text-white md:text-3xl">Nome da Fazenda</label>
                    <TextField id="input1" className="bg-gray-200 rounded w-1/2" placeholder="Nome da Fazenda" value={nome} onChange={handleNomeChange}  required/>
                    
                    <label htmlFor="input4" className="text-white md:text-3xl">Responsável</label>
                    <TextField  id="input4" className="bg-gray-200 rounded w-1/2 " placeholder="Responsável" value={responsavel} onChange={handleResponsavelChange}  required/>
                    
                    <label htmlFor="input2" className="text-white md:text-3xl">Endereço</label>
                    <TextField id="input2" className="bg-gray-200 rounded w-1/2" placeholder="Endereço" value={endereco} onChange={handleEnderecoChange}  required/>
                    
                    <button type="submit" onClick={editingIndex !== null ? Editar : Cadastrar}  className="border border-white bg-emerald-900 hover:bg-emerald-700 text-white font-semibold  text-xl py-4 px-8 rounded transition duration-300 ease-in-out">{editingIndex !== null ? 'Salvar' : 'Cadastrar'}</button>
                
                </div>
            </div>
        </Modal>
      
        <div className=" flex justify-center ">
            <table className="border-collapse rounded-md shadow-xl md:w-3/4 w-3 text-sm bg-gray-200   ">
                <thead className="bg-emerald-900 text-white">
                    <tr>
                        <th className=" p-0.5 py-3">Fazenda</th>
                        <th className=" p-0.5 py-3">Endereço</th>
                        <th className=" p-0.5 py-3">Responsável</th>
                        <th className=" p-0.5 py-3">Data de inserção</th>
                        <th className=" p-0.5 py-3">Opções</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {getPaginacao().map((cadastro, index) => (
                        <tr key={index}>
                            <td className=" border border-b-neutral-100">{cadastro.nome}</td>
                            <td className=" border border-b-neutral-100">{cadastro.endereco}</td>
                            <td className=" border border-b-neutral-100">{cadastro.responsavel}</td>
                            <td className="border border-b-neutral-100">                              
                                {
                                   cadastro.time?.toLocaleDateString("pt-BR", { 
                                        hour: '2-digit', 
                                        minute: '2-digit', 
                                        year:'numeric' , 
                                        month:'2-digit', 
                                        day:'2-digit' 
                                    })
                                }
                            </td>
                            <td className=" p-2 border border-b-neutral-100">
                                {/* <button ><Edit/></button> */}
                                <button onClick={() => handleOpen(index)} ><Edit /></button>
                                <button onClick={() => handleDelete(index)}><Delete/></button>
                            </td>
                        </tr>
                    ))}
                    
                    {cadastros.length === 0 && (
                        <tr>
                          <Loading/>
                            <td colSpan={4} className="text-center p-2">
                                Nenhum cadastro encontrado
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
        <div className="mt-4">
            <Stack spacing={2} justifyContent="center" alignItems="center" mt="4">
                            <Pagination
                            count={Math.ceil(cadastros.length/ itemPorPage)}
                            page={paginaAtual}
                            onChange={MudarPagina}
                            variant="outlined"
                            color="primary"
                            />
                        </Stack>
        </div>
    </div>
    );
  }