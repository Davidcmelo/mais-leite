
'use client'
import { rajdhani } from "@/app/layout";
import {  Alert, Button,  Modal,  Snackbar, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Edit, Delete} from '@material-ui/icons';
import CloseIcon from '@mui/icons-material/Close';
import Loading from "@/app/loading";


interface CadastrarProps{
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
 console.log('TESTEEEEEEEE',nome)
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
        console.log("Valor de time:", new Date());

        console.log("TIMEEEEEEEEE",time)
        try {
            const response = await fetch("/api/posts", {
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
                const response2 = await fetch("/api/posts");
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
          const response = await fetch("/api/posts");
      
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


    // console.log('TEMPOOO  6', time)

    return (
        <div>
            <div className="flex flex-col justify-center items-center p-10 gap-10">
                    <h1 className={`${rajdhani.className} font-semibold  md:text-5xl text-2xl text-emerald-950`} >Fazendas</h1>
                <Button onClick={handleOpenn}  className="text-white text-bold bg-emerald-900 hover:bg-emerald-700 w-50 h-16 px-4 p-6 md:text-3xl text-2xl ">Cadastrar nova fazenda</Button>
                <Snackbar open={alertSuccess} autoHideDuration={5000} onClose={() => setAlertSuccess(false)}>
                    <Alert severity="success" className="bg-green-500 text-white"  >
                        Fazenda cadastrada com sucesso!
                    </Alert>
                </Snackbar>
                <Snackbar open={alertError} autoHideDuration={5000} onClose={() => setAlertError(false)}>
                    <Alert severity="error" className="bg-red-500 text-white">
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
                    
                    <Button type="submit" onClick={editingIndex !== null ? Editar : Cadastrar} variant="outlined" className="text-white md:text-xl text-bold bg-emerald-600 hover:bg-emerald-700 border-white w-1/3 h-16">{editingIndex !== null ? 'Salvar' : 'Cadastrar'}</Button>
                
                </div>
            </div>
        </Modal>
      
        <div className=" flex justify-center ">
            <table className="border-collapse rounded-md shadow-xl md:w-3/4 w-1/5 text-sm bg-gray-200   ">
                <thead className="bg-emerald-900 text-white">
                    <tr>
                        <th className=" p-2">Fazenda</th>
                        <th className=" p-2">Endereço</th>
                        <th className=" p-2">Responsável</th>
                        <th className=" p-2">Data de inserção</th>
                        <th className=" p-2">Opções</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {cadastros.map((cadastro, index) => (
                        <tr key={index}>
                            <td className=" p-2 border border-b-neutral-100">{cadastro.nome}</td>
                            <td className=" p-2 border border-b-neutral-100">{cadastro.endereco}</td>
                            <td className=" p-2 border border-b-neutral-100">{cadastro.responsavel}</td>
                            <td className="p-2 border border-b-neutral-100">                              
                                {
                                   cadastro.time?.toLocaleDateString("pt-BR", { 
                                        hour: '2-digit', 
                                        minute: '2-digit', 
                                        year:'numeric' , 
                                        month:'numeric', 
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
    </div>
    );
  }