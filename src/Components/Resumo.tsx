'use client'
import { useEffect, useState } from "react";
import { rajdhani } from "../app/layout"
import Select from 'react-select'
import DateRangePicker, { registerLocale } from 'react-datepicker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface FazendasCadastradas {
    id: string;
    nome: string;
    responsavel: string;
    endereco: string;
    fazendaId: string;
    fazenda: string;
  
  }

  interface CadastrosLitros {
    id: string;
    nome: string;
    responsavel: string;
    endereco: string;
    time: any;
    litros:any;
    fazendaId: string;
    fazenda: string;
}

export default function Resumo() {
    const [fazendasCadastradas, setFazendasCadastradas] = useState<FazendasCadastradas[]>([]);
    const [periodoDatas, setPeriodoDatas] = useState<[Date | null, Date | null]>([null, null]);
    const [fazendaSelecionadaId, setFazendaSelecionadaId] = useState<string>("");
    const [cadastrosLitros, setCadastrosLitros] = useState<CadastrosLitros[]>([]);
    const [producoesFiltradas, setProducoesFiltradas] = useState<CadastrosLitros[]>([]);
    const [valorLeite, setValorLeite] = useState<number>(0);
    const [fazendaSelecionada, setFazendaSelecionada] = useState<FazendasCadastradas | null>();
    const [valorProducao, setValorProducao] = useState<number>(0);
    const [dataPagamento, setDataPagamento] = useState<Date | null>(new Date())

    registerLocale('pt-BR', ptBR);
    useEffect(() => {
      fetchData();
      fetchLitrosData();
    }, []);
  
    async function fetchData() {
      try {
        const response = await fetch("/api/fazendas/read/read");
  
        if (response.ok) {
          const result = await response.json();
  
          const cadastrosData = result.map((item: any) => {
            return {
              id: item.id,
              nome: item.fazenda,
              responsavel: item.responsavel,
              endereco: item.endereco,
            };
          });
          setFazendasCadastradas(cadastrosData);
        } else {
          console.error("Erro ao obter dados:", response.status);
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    }
  
    async function fetchLitrosData() {
      try {
        const response = await fetch("/api/producao/read/read");
        if (response.ok) {
          const data = await response.json();
          const litrosData = data.map((item: any) => ({
            id: item.id,
            fazendaId: item.fazenda.id,
            nome: item.fazenda.fazenda,
            litros: item.litros,
            time: new Date(item.dataColeta),
          }));
          setCadastrosLitros(litrosData);
        } else {
          console.error("Erro ao obter dados de litros:", response.status);
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    }

 
    function filtrarProducoes() {
      if (fazendaSelecionadaId && periodoDatas[0]) {
        const producoesFiltradas = cadastrosLitros.filter(
          (producao) =>
            producao.fazendaId === fazendaSelecionadaId &&
            periodoDatas[0] !== null &&
            producao.time.getMonth() === periodoDatas[0].getMonth() &&
            producao.time.getFullYear() === periodoDatas[0].getFullYear()
        );
        const fazendaSelecionada = fazendasCadastradas.find(
            (cadastro) => cadastro.id === fazendaSelecionadaId
          );
        setProducoesFiltradas(producoesFiltradas);
        setFazendaSelecionada(fazendaSelecionada);
      } else {
        setProducoesFiltradas([]);
        setFazendaSelecionada(null)
      }
    }
  
    console.log("FAZENDA CADAS", fazendasCadastradas)

    function calcularTotalProducao(producoes: CadastrosLitros[]): number {
        let total = 0;
        for (const producao of producoes) {
          total += producao.litros;
        }
        return total;
      }


      function calcularValor() {
        const producaoTotal = calcularTotalProducao(producoesFiltradas);
        const valorProducao = valorLeite * producaoTotal;
        const fazendaNome = fazendaSelecionada?.nome || '';
        setValorProducao(valorProducao)
        pagamentoFinal()
      }

      async function pagamentoFinal() {
        try {
          const valorContaFinal = calcularTotalProducao(producoesFiltradas) * valorLeite;
      
          const response = await fetch("/api/resumo/create/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fazenda: fazendaSelecionada?.nome,
              litros: calcularTotalProducao(producoesFiltradas),
              valor: valorLeite,
              contaFinal: valorContaFinal,
              dataPagamento
            }),
          });
      
          if (response.ok) {
            console.log("Dados do resumo enviados com sucesso!");
          } else {
            console.error("Erro ao enviar os dados do resumo:", response.status);
          }
        } catch (error) {
          console.error("Erro ao enviar os dados do resumo:", error);
        }
      }


      const handleMonthChange = (date:any) => {
        setPeriodoDatas([date, null]); // o dia 1 como a data inicial e null como a data final
      };
  
    return (
        <div className="items-center text-center">
            <h1 className={`${rajdhani.className} font-semibold text-emerald-950 md:text-5xl text-2xl text-center`}>
            Resumo
            </h1>
        <div className="flex flex-col items-center justify-center mt-10">
            <Select
                options={fazendasCadastradas.map((cadastro) => ({
                value: cadastro.id,
                label: cadastro.nome,
                }))}
                className="w-1/4 text-xl border-2 border-emerald-900 rounded"
                placeholder="Selecione a fazenda"
                onChange={(selectedOption) => setFazendaSelecionadaId(selectedOption?.value || "")}
            />
        </div>
        <div className="flex p-4  flex-col items-center justify-center">


            <DatePicker
            selected={periodoDatas[0]}
            // endDate={periodoDatas[1]}
            onChange={handleMonthChange}
            // selectsRange
            placeholderText="Selecione o mês de coleta"
            className="border-2 border-emerald-900 rounded text-center"
            
            dateFormat="MM/yyyy"
            showMonthYearPicker
            locale="pt-BR"
            
          />
          <button
            className="bg-emerald-900 hover:bg-emerald-700 text-white font-medium p-1 rounded transition duration-300 ease-in-out mt-4"
            onClick={filtrarProducoes}
          >
            Buscar
          </button>
        </div>
  
        <div className="flex items-center justify-center">
            <table className="border-collapse rounded-md shadow-xl md:w-2/4 w-4/5 text-sm bg-gray-200">
                <thead className="bg-emerald-900 text-white">
                <tr>
                    <th className=" p-2">Data</th>
                    <th className=" p-2">Litros</th>
                </tr>
                </thead>
                <tbody>
                {producoesFiltradas.map((producao) => (
                    <tr key={producao.id}>     
                    <td className="text-center border border-b-neutral-100">{producao.time.toLocaleDateString()}</td>
                    <td className="text-center border border-b-neutral-100">{producao.litros}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        <div className="mt-10 flex justify-center gap-2">
            <input 
                type="number" 
                placeholder="Valor do leite"
                className="border-2 border-emerald-900 rounded w-32 text-center"
                value={valorLeite}
                onChange={(event) => setValorLeite(parseFloat(event.target.value))}
            />
            <button onClick={calcularValor} className="bg-emerald-900 hover:bg-emerald-700 text-white font-medium rounded transition duration-300 ease-in-out p-1">Calcular produção da fazenda</button>
        </div>
            <div className="flex justify-center">
                <div className=" border-2 border-emerald-900 rounded mt-3 inline-block p-2 ">
                    <p className="font-bold"> Fazenda {fazendaSelecionada?.nome}</p>
                    <p>Litros: {calcularTotalProducao(producoesFiltradas).toLocaleString()}</p>
                    <p>Valor:  {valorProducao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                </div>
            </div>
      
      </div>
    );
  }

















