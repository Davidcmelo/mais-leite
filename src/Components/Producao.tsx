'use client'
import Loading from "@/app/loading";
import { rajdhani } from "../app/layout"
import { Delete, Edit } from "@material-ui/icons";
import { Alert, Button, Modal, Snackbar, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import Select from 'react-select'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded';




interface CadastrosLitros {
    id: string;
    nome: string;
    responsavel: string;
    endereco: string;
    time: Date;
    litros:Number;
    fazendaId: string;
    fazenda: string;
}

interface CadastrosFazendas {
  id: string;
  nome: string;
  responsavel: string;
  endereco: string;
  time: Date;
  litros:Number;
  fazendaId: string;
  fazenda: string;
}

  
export default function Producao(){
    const [open, setOpen] = useState(false);
    const [abrirTable, setAbrirTable] = useState(false);
    const [cadastrosFazendas, setCadastrosFazendas] = useState<CadastrosFazendas[]>([])
    const [litros, setLitros] = useState('')
    const [fazendaId, setFazendaId] = useState<string | null>(null);
    const [cadastrosLitros, setCadastrosLitros]=useState<CadastrosLitros[]>([])
    const [dataColeta, setDataColeta]= useState("")

    // abrir modal
    function Open(){
        setOpen(true)
    }
    
    // Fechar modal
    function Close(){
        setOpen(false)
    }

    //Abrir tabela
    function OpenTable(){
        setAbrirTable(true)
    }

    function CloseTable(){
        setAbrirTable(false)
    }

    async function Adicionar() {
      if (fazendaId && litros !== '') {
        const index = cadastrosFazendas.findIndex((cadastro) => cadastro.id === fazendaId);
    
        if (index !== -1) {
          const updatedCadastros = [...cadastrosFazendas];
          updatedCadastros[index] = {
            ...updatedCadastros[index],
            litros: parseInt(litros),
          };
          
          setCadastrosFazendas(updatedCadastros);
          
          const data = {
            litros: parseInt(litros),
            fazendaId,
            dataColeta: new Date().toISOString()
          };
          try {
            const response = await fetch('/api/producao/create', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
            console.log('DATA', dataColeta)
            if (response.ok) {
              console.log('Dados salvos com sucesso');
              // Atualize o estado de 'cadastros' com os novos dados
              setCadastrosFazendas(updatedCadastros);
              await fetchLitrosData();
              setDataColeta(data.dataColeta)
              
            } else {
              console.error('Erro ao salvar os dados:', response.status);
            }
          } catch (error) {
            console.error('Erro na requisição:', error);
          }
          
        }
        setFazendaId(null);
        setLitros('');
        setOpen(false);
      }
    }
      
    async function fetchLitrosData() {
      try {
        const response = await fetch('/api/producao/read/read');
        if (response.ok) {
          const data = await response.json();
          const litrosData = data.map((item: any) => ({
            id: item.id,
            fazendaId:item.fazenda.id,
            nome: item.fazenda.fazenda,
            litros: item.litros,            
            time:new Date(item.dataColeta)
          }));
          setCadastrosLitros(litrosData);
       
          console.log("AAAAAAAAAA", litrosData)

        } else {
          console.error('Erro ao obter dados de litros:', response.status);
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    }
    useEffect(() => {
      fetchLitrosData();
    }, []); 

    
      // buscar dados do banco
      async function fetchData() {
        try {
          const response = await fetch("/api/fazendas/read/read");
      
          if (response.ok) {
            const result = await response.json();
      
            const cadastrosData = result.map((item: any) => ({
              id: item.id,
              litros: item.litros,
              fazendaId: item.fazenda.id,
              nome: item.fazenda,
              time: item.dataColeta
            }));

            setCadastrosFazendas(cadastrosData);
            
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
   

    async function handleDelete(id: string) {
      
      try {
        const response = await fetch(`/api/producao/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        if (response.ok) {
          const result = await response.json();
          console.log("Registro excluído com sucesso:", result);
          
          const updatedCadastros = cadastrosLitros.filter((cadastro) => cadastro.id !== id);
          setCadastrosLitros(updatedCadastros);
          
        } else {
          console.error("Erro ao excluir o registro:", response.status);
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    }
    


    return(
        <div>
            <div className="flex flex-col justify-center items-center p-10 gap-10"  >
                <h1 className={`${rajdhani.className} font-semibold text-emerald-950 md:text-7xl text-2xl text-center `}>Produção</h1>
                <p className="text-center  text-lg font-semibold text-emerald-950">Produção de leite por fazenda</p>
                
                <button onClick={OpenTable} className="bg-emerald-900 hover:bg-emerald-700 text-white font-semibold text-3xl py-6 px-16 rounded transition duration-300 ease-in-out">
                    Consultar tabela <SearchIcon sx={{fontSize:'2.5rem'}} />
                </button>
                <button onClick={Open} className="bg-emerald-900 hover:bg-emerald-700 text-white font-semibold  text-3xl py-6 px-16 rounded transition duration-300 ease-in-out">
                Cadastrar produção  <AddIcon sx={{fontSize:'2.5rem'}}/>
                </button>
                
            </div>
            <Modal
            open={open}
            // onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="flex justify-center flex-col items-center h-screen">
                <div className="border-2 border-solid flex rounded justify-center items-center flex-col w-3/4 h-3/5 md:w-1/2 gap-5 bg-gradient-to-b from-teal-900 to-emerald-950 relative">
                        
                    <button className="absolute top-0 right-0 mt-2 mr-2 p-2 transition-all duration-500 hover:scale-150" onClick={Close}>
                        <CloseIcon className=" text-white "/>
                    </button>
                    <label htmlFor="input1" className="text-white md:text-3xl">Identificação da fazenda</label>

                    <Select
                      options={cadastrosFazendas.map((cadastro) => ({
                        value: cadastro.id,
                        label: cadastro.nome,
                      }))}
                      className="w-1/2"
   
                      onChange={(option) => setFazendaId(option?.value || null)} // Atualiza fazendaId com o valor selecionado
                    />

                    
                    <label htmlFor="input4" className="text-white md:text-3xl">Litros</label>
                    <TextField  id="input4" className="bg-gray-200 rounded w-1/2 " placeholder="Litros"  type="number" required value={litros} onChange={(e) => setLitros(e.target.value)}/>
                    
                    <button onClick={Adicionar} type="submit"  className="border border-white bg-emerald-900 hover:bg-emerald-700 text-white font-semibold  text-xl py-4 px-8 rounded transition duration-300 ease-in-out">Confirma <DoneOutlineRoundedIcon/></button>
                
                </div>
            </div>
        </Modal>
        {abrirTable &&(
            <>
                <div className=" flex justify-center ">
                    <table className="border-collapse rounded-md shadow-xl md:w-3/4 w-4/5 text-sm bg-gray-200">
                        <thead className="bg-emerald-900 text-white">
                            <tr>
                                <th className=" p-2">Fazenda</th>
                                <th className=" p-2">Litros</th>
                                <th className=" p-2">Data</th>
                                <th className=" p-2">Opções</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {cadastrosLitros.map((cadastro: any) => (
                                <tr key={cadastro.id}>
                                    <td className=" p-2 border border-b-neutral-100">{cadastro.nome}</td>
                                    <td className=" p-2 border border-b-neutral-100">{cadastro.litros}</td>
                                    <td className="p-2 border border-b-neutral-100"> {cadastro.time?.toLocaleDateString()}</td>
                                    <td className=" p-2 border border-b-neutral-100">
                                        <button onClick={() => handleDelete(cadastro.id)}><Delete /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center mt-10">
                    <button onClick={CloseTable} className="bg-emerald-900 hover:bg-emerald-700 text-white font-semibold  text-lg py-2 px-4 rounded transition duration-300 ease-in-out mb-10">
                        Fechar tabela   <CloseRoundedIcon />
                    </button>
                </div>
            </>
        )}
            
        </div>
    )
}













                                        {/* {
                    cadastro.time?.toLocaleDateString("pt-BR", {
                        hour: '2-digit',
                        minute: '2-digit',
                        year:'numeric' , 
                        month:'numeric',
                        day:'2-digit'
                    })
                } */}